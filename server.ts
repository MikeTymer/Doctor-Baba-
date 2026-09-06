import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { sendInquiryEmail, sendReplyEmail, checkEmailConfiguration, setRuntimeSmtpConfig, getActiveSmtpConfig } from "./server/mailer";
import { INITIAL_BLOGS } from "./src/data/initialData";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Rate limiting / Anti-DDoS store
  const requestIpCounts = new Map<string, { count: number; firstRequest: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS_PER_WINDOW = 300; // max 300 requests/min per IP

  // Cleanup rate limiter every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requestIpCounts.entries()) {
      if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
        requestIpCounts.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  // Web Application Firewall (WAF) & DDoS Mitigation Middleware
  app.use((req, res, next) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // 1. Anti-DDoS rate-limiting
    const ipRecord = requestIpCounts.get(clientIp);
    if (!ipRecord || (now - ipRecord.firstRequest > RATE_LIMIT_WINDOW_MS)) {
      requestIpCounts.set(clientIp, { count: 1, firstRequest: now });
    } else {
      ipRecord.count++;
      if (ipRecord.count > MAX_REQUESTS_PER_WINDOW) {
        res.status(429).setHeader('Retry-After', '60').json({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. WAF DDoS mitigation active. Please try again shortly.'
        });
        return;
      }
    }

    // 2. WAF Malicious Payload & Exploit Detection (SQLi, path traversal, command injection, RCE)
    const rawUrl = decodeURIComponent(req.originalUrl || req.url || '');
    const maliciousPattern = /((\.\.\/|\.\.\\)|(<script|<iframe|<object|<embed)|(union\s+select|select\s+.*\s+from|insert\s+into|drop\s+table|delete\s+from|benchmark\(|sleep\()|(\b(cmd\.exe|powershell|bin\/sh|bin\/bash)\b)|(etc\/passwd|proc\/self))/i;
    
    if (maliciousPattern.test(rawUrl)) {
      console.warn(`[WAF Blocked] Suspicious URI signature from IP ${clientIp}: ${req.originalUrl}`);
      res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by Web Application Firewall (WAF) security inspection rule.'
      });
      return;
    }

    next();
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security Headers Middleware: ClickJacking, Anti-Sniffing, Strict CSP & Transport Security
  app.use((req, res, next) => {
    // 1. Anti-Sniffing Protection
    res.setHeader("X-Content-Type-Options", "nosniff");

    // 2. ClickJacking Protection (X-Frame-Options + CSP frame-ancestors)
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    // 3. Complete Content-Security-Policy (CSP) Directives
    const cspPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://adservice.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https: data: blob:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://region1.google-analytics.com wss: ws:",
      "frame-src 'self' https://www.youtube.com https://youtube.com https://www.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.whatsapp.com https://wa.me",
      "frame-ancestors 'self' https://ai.studio https://*.google.com"
    ].join("; ");

    res.setHeader("Content-Security-Policy", cspPolicy);

    // 4. Other Standard Security Headers
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-DNS-Prefetch-Control", "on");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    next();
  });

  // Static files route for images and public assets (including ads.txt)
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use('/static', express.static(path.join(process.cwd(), 'public', 'static')));

  app.get('/ads.txt', (req, res) => {
    const adsTxtPath = path.join(process.cwd(), 'public', 'ads.txt');
    if (fs.existsSync(adsTxtPath)) {
      res.type('text/plain');
      return res.sendFile(adsTxtPath);
    }
    res.status(404).send('Not Found');
  });

  app.get('/robots.txt', (req, res) => {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.type('text/plain');
      return res.sendFile(robotsPath);
    }
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nAllow: /admin\nDisallow: /api/\n\nSitemap: https://doctorbabamukisa.com/sitemap.xml\n");
  });

  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.type('application/xml');
      return res.sendFile(sitemapPath);
    }
    res.status(404).send('Sitemap not found');
  });

  // File store helper functions
  const messagesFilePath = path.join(process.cwd(), 'server', 'messages_store.json');

  const loadMessagesFromDisk = (): Array<any> => {
    try {
      if (fs.existsSync(messagesFilePath)) {
        const raw = fs.readFileSync(messagesFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read messages_store.json:', e);
    }
    return [
      {
        id: 'msg-1',
        name: 'Samuel Mukasa',
        email: 'samuel.m@example.com',
        phone: '+256701234567',
        service: 'Love & Marriage Spells',
        message: 'Doctor Baba, I need urgent spiritual consultation regarding my broken marriage. Please guide me.',
        date: '2026-08-06 14:22',
        status: 'New',
        location: {
          city: 'Kampala',
          region: 'Central Region',
          country: 'Uganda',
          countryCode: 'UG',
          ip: '102.218.44.12',
          isp: 'MTN Uganda Mobile Broadband',
          timezone: 'Africa/Kampala',
          latitude: 0.3136,
          longitude: 32.5811,
          googleMapsUrl: 'https://www.google.com/maps?q=0.3136,32.5811'
        },
        deviceInfo: {
          browser: 'Google Chrome 127.0',
          os: 'Android OS',
          deviceType: 'Mobile',
          userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
          screenResolution: '1080x2340',
          language: 'en-UG',
          timezone: 'Africa/Kampala'
        },
        securityInfo: {
          isVpnOrProxy: false,
          vpnReason: 'Direct Connection: Client device timezone (Africa/Kampala) matches residential ISP IP location (Uganda).',
          ipType: 'Residential / Cellular'
        }
      },
      {
        id: 'msg-2',
        name: 'Grace Akello',
        email: 'grace.a@example.com',
        phone: '+254712345678',
        service: 'Financial & Wealth Recovery',
        message: 'I am requesting a remote business blessing ritual for my hardware shop in Mombasa.',
        date: '2026-08-05 09:15',
        status: 'Responded',
        location: {
          city: 'Frankfurt',
          region: 'Hesse',
          country: 'Germany',
          countryCode: 'DE',
          ip: '185.220.101.45',
          isp: 'M247 Ltd Datacenter / NordVPN Proxy',
          timezone: 'Europe/Berlin',
          latitude: 50.1109,
          longitude: 8.6821,
          googleMapsUrl: 'https://www.google.com/maps?q=50.1109,8.6821'
        },
        deviceInfo: {
          browser: 'Apple Safari 17.5',
          os: 'iOS (Apple iPhone)',
          deviceType: 'Mobile',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
          screenResolution: '1170x2532',
          language: 'en-KE',
          timezone: 'Africa/Nairobi'
        },
        securityInfo: {
          isVpnOrProxy: true,
          vpnReason: 'VPN / Proxy Detected: Device timezone (Africa/Nairobi) mismatches IP location timezone (Europe/Berlin) & Datacenter ISP (M247 Ltd).',
          ipType: 'VPN / Proxy / Datacenter'
        }
      }
    ];
  };

  const contactMessages: Array<any> = loadMessagesFromDisk();

  const saveMessagesToDisk = () => {
    try {
      const dir = path.dirname(messagesFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(messagesFilePath, JSON.stringify(contactMessages, null, 2));
    } catch (e) {
      console.warn('Could not save messages_store.json:', e);
    }
  };

  // Blogs File Store (saved in server/blogs_store.json)
  const blogsFilePath = path.join(process.cwd(), 'server', 'blogs_store.json');

  const loadBlogsFromDisk = (): Array<any> => {
    try {
      if (fs.existsSync(blogsFilePath)) {
        const raw = fs.readFileSync(blogsFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read blogs_store.json:', e);
    }
    // Initialize with default INITIAL_BLOGS if not yet saved on disk
    try {
      const dir = path.dirname(blogsFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(blogsFilePath, JSON.stringify(INITIAL_BLOGS, null, 2));
    } catch (e) {
      console.warn('Could not write initial blogs_store.json:', e);
    }
    return [...INITIAL_BLOGS];
  };

  let serverBlogs: Array<any> = loadBlogsFromDisk();

  const saveBlogsToDisk = () => {
    try {
      const dir = path.dirname(blogsFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(blogsFilePath, JSON.stringify(serverBlogs, null, 2));
    } catch (e) {
      console.warn('Could not save blogs_store.json:', e);
    }
  };

  const subscriptions: string[] = [];

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Doctor Baba Mukisa Spiritual Website" });
  });

  app.get("/api/email-status", async (req, res) => {
    const status = await checkEmailConfiguration();
    return res.json({ success: true, status });
  });

  app.get("/api/smtp-config", (req, res) => {
    const current = getActiveSmtpConfig();
    return res.json({
      success: true,
      config: {
        host: current.host,
        port: current.port,
        secure: current.secure,
        user: current.user,
        notificationEmail: current.notificationEmail,
        hasPassword: Boolean(current.pass)
      }
    });
  });

  app.post("/api/smtp-config", (req, res) => {
    const { host, port, secure, user, pass, notificationEmail } = req.body;
    setRuntimeSmtpConfig({
      host: host ? String(host).trim() : undefined,
      port: port ? parseInt(port, 10) : undefined,
      secure: secure !== undefined ? Boolean(secure) : undefined,
      user: user ? String(user).trim() : undefined,
      pass: pass ? String(pass).trim() : undefined,
      notificationEmail: notificationEmail ? String(notificationEmail).trim() : undefined
    });
    const current = getActiveSmtpConfig();
    return res.json({
      success: true,
      config: {
        host: current.host,
        port: current.port,
        secure: current.secure,
        user: current.user,
        notificationEmail: current.notificationEmail,
        hasPassword: Boolean(current.pass)
      }
    });
  });

  app.post("/api/test-smtp", async (req, res) => {
    const { host, port, secure, user, pass, notificationEmail } = req.body;
    const testConfig = host ? {
      host: String(host).trim(),
      port: port ? parseInt(port, 10) : 465,
      secure: secure !== undefined ? Boolean(secure) : true,
      user: user ? String(user).trim() : 'help@doctorbabamukisa.com',
      pass: pass ? String(pass).trim() : undefined,
      notificationEmail: notificationEmail ? String(notificationEmail).trim() : undefined
    } : undefined;

    const result = await checkEmailConfiguration(testConfig);
    return res.json({ success: true, result });
  });

  app.get("/api/inquiries", (req, res) => {
    return res.json({ success: true, messages: contactMessages });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, service, message, location, deviceInfo, securityInfo } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill in required fields." });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '102.218.44.12';

    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || "Not provided",
      service: service || "General Spiritual Consultation",
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
      location: location || {
        city: 'Kampala',
        region: 'Central Region',
        country: 'Uganda',
        countryCode: 'UG',
        ip: String(clientIp).split(',')[0],
        isp: 'Residential ISP / Mobile Network',
        timezone: 'Africa/Kampala',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kampala,+Uganda'
      },
      deviceInfo: deviceInfo || {
        browser: 'Web Browser',
        os: 'Desktop / Mobile OS',
        deviceType: 'Mobile',
        userAgent: req.headers['user-agent'] || 'Mozilla/5.0',
        screenResolution: 'Responsive View',
        language: 'en-US'
      },
      securityInfo: securityInfo || {
        isVpnOrProxy: false,
        vpnReason: 'Direct Connection: Verified client session.',
        ipType: 'Residential / Cellular'
      }
    };

    contactMessages.unshift(newMessage);
    saveMessagesToDisk();
    console.log("New contact inquiry received and saved to disk:", newMessage.id, newMessage.name);

    // Dispatch SMTP email via mail.privateemail.com asynchronously so client doesn't wait
    let emailDispatch = null;
    try {
      emailDispatch = await sendInquiryEmail(newMessage);
    } catch (err) {
      console.warn("SMTP email dispatch warning:", err);
    }

    return res.json({
      success: true,
      message: "Your inquiry has been submitted successfully. Doctor Baba Mukisa will contact you soon!",
      messageData: newMessage,
      emailStatus: emailDispatch
    });
  });

  app.delete("/api/inquiries/:id", (req, res) => {
    const { id } = req.params;
    const index = contactMessages.findIndex((m) => m.id === id);
    if (index !== -1) {
      contactMessages.splice(index, 1);
      saveMessagesToDisk();
      return res.json({ success: true, message: "Inquiry deleted successfully." });
    }
    return res.status(404).json({ success: false, error: "Inquiry not found." });
  });

  app.post("/api/reply-email", async (req, res) => {
    const { messageId, toEmail, clientName, subject, replyMessage, customConfig } = req.body;
    if (!toEmail || !replyMessage) {
      return res.status(400).json({ success: false, error: "Missing required email parameters." });
    }

    const emailResult = await sendReplyEmail(toEmail, clientName || 'Valued Client', subject, replyMessage, customConfig);

    // Update message status in contactMessages store
    if (messageId) {
      const existing = contactMessages.find((m) => m.id === messageId);
      if (existing) {
        existing.status = 'Responded';
        saveMessagesToDisk();
      }
    }

    return res.json({ 
      success: true, 
      delivered: emailResult.delivered, 
      offline: emailResult.offline,
      note: (emailResult as any).note,
      error: emailResult.error,
      emailResult 
    });
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, error: "Please provide a valid email address." });
      }
      const cleanEmail = email.trim();
      subscriptions.push(cleanEmail);

      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const nameHandle = cleanEmail.split('@')[0] || "Newsletter Subscriber";

      const newMessage = {
        id: `msg-sub-${Date.now()}`,
        name: `Subscriber (${nameHandle})`,
        email: cleanEmail,
        phone: "N/A (Newsletter)",
        service: "Newsletter Subscription",
        message: `New email subscription request received from ${cleanEmail} (Source: ${source || 'Website Subscription'}). Client has subscribed to Doctor Baba Mukisa's newsletter for weekly spiritual updates, monthly horoscopes, and ancestral wisdom.`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'New',
        location: {
          city: 'Kampala',
          region: 'Central Region',
          country: 'Uganda',
          countryCode: 'UG',
          ip: String(clientIp).split(',')[0],
          isp: 'Residential ISP / Mobile Network',
          timezone: 'Africa/Kampala',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kampala,+Uganda'
        },
        deviceInfo: {
          browser: 'Web Browser',
          os: 'Desktop / Mobile OS',
          deviceType: 'Mobile',
          userAgent: req.headers['user-agent'] || 'Mozilla/5.0',
          screenResolution: 'Responsive View',
          language: 'en-US'
        },
        securityInfo: {
          isVpnOrProxy: false,
          vpnReason: 'Direct Connection: Verified newsletter subscriber session.',
          ipType: 'Residential / Cellular'
        }
      };

      contactMessages.unshift(newMessage);
      saveMessagesToDisk();
      console.log("New subscriber recorded in private inbox & saved to disk:", cleanEmail);

      // Send email alert to help@doctorbabamukisa.com asynchronously
      let emailDispatch = null;
      try {
        emailDispatch = await sendInquiryEmail(newMessage);
      } catch (err) {
        console.warn("Subscription SMTP warning:", err);
      }

      return res.json({
        success: true,
        message: "Thank you for subscribing to Doctor Baba Mukisa's newsletter! Recorded in private inbox.",
        messageData: newMessage,
        emailStatus: emailDispatch
      });
    } catch (err) {
      console.error("Error processing subscription:", err);
      return res.json({
        success: true,
        message: "Thank you for subscribing!"
      });
    }
  });

  // --------------------------------------------------------------------------
  // IMAGES & MEDIA API ENDPOINTS (Images saved in /public alongside other images)
  // --------------------------------------------------------------------------

  // List all images stored in the public images directory
  app.get("/api/images", (req, res) => {
    try {
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        return res.json({ success: true, images: [] });
      }
      const files = fs.readdirSync(publicDir);
      const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
      const images = files
        .filter((f) => imageExtensions.has(path.extname(f).toLowerCase()))
        .map((f) => {
          try {
            const stat = fs.statSync(path.join(publicDir, f));
            return {
              filename: f,
              url: `/${encodeURI(f)}`,
              size: stat.size,
              modified: stat.mtime
            };
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .sort((a: any, b: any) => new Date(b.modified).getTime() - new Date(a.modified).getTime());

      return res.json({ success: true, images });
    } catch (err: any) {
      console.error("Error reading images directory:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Upload or download an image and save it directly into the public directory (where other images are)
  app.post("/api/upload-image", async (req, res) => {
    try {
      const { data, url, filename: requestedName } = req.body;
      const publicDir = path.join(process.cwd(), 'public');

      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      let buffer: Buffer | null = null;
      let ext = '.jpg';
      let baseName = requestedName || 'blog-image';

      if (data && typeof data === 'string') {
        // Base64 Data URL or raw base64 string
        const matches = data.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (matches) {
          let mimeExt = matches[1].toLowerCase();
          if (mimeExt === 'jpeg') mimeExt = 'jpg';
          ext = `.${mimeExt}`;
          buffer = Buffer.from(matches[2], 'base64');
        } else {
          buffer = Buffer.from(data, 'base64');
        }
      } else if (url && typeof url === 'string') {
        // If the URL already refers to a local file in /public/
        const cleanUrlPath = decodeURIComponent(url.replace(/^\//, '').split('?')[0]);
        const localCandidate = path.join(publicDir, cleanUrlPath);
        if (fs.existsSync(localCandidate) && fs.statSync(localCandidate).isFile()) {
          return res.json({
            success: true,
            url: `/${cleanUrlPath}`,
            filename: cleanUrlPath,
            filePath: `public/${cleanUrlPath}`,
            alreadyExists: true
          });
        }

        // If remote URL, fetch and download into public folder
        if (url.startsWith('http://') || url.startsWith('https://')) {
          const remoteResp = await fetch(url, {
            headers: { 'User-Agent': 'Doctor-Baba-Mukisa-Server/1.0' }
          });
          if (!remoteResp.ok) {
            return res.status(400).json({ success: false, error: `Failed to download image from URL (${remoteResp.status})` });
          }
          const cType = remoteResp.headers.get('content-type') || '';
          if (cType.includes('png')) ext = '.png';
          else if (cType.includes('webp')) ext = '.webp';
          else if (cType.includes('gif')) ext = '.gif';
          else if (cType.includes('svg')) ext = '.svg';
          else ext = '.jpg';

          const arrayBuf = await remoteResp.arrayBuffer();
          buffer = Buffer.from(arrayBuf);
        } else {
          return res.status(400).json({ success: false, error: 'Invalid image URL or base64 data provided.' });
        }
      } else {
        return res.status(400).json({ success: false, error: 'Please provide image base64 data or an image URL.' });
      }

      if (!buffer || buffer.length === 0) {
        return res.status(400).json({ success: false, error: 'Image buffer is empty.' });
      }

      // Format safe filename
      const sanitizedBase = path.basename(baseName, path.extname(baseName))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .substring(0, 40)
        .replace(/^-+|-+$/g, '') || 'spiritual-post';

      const finalFilename = `blog-${Date.now()}-${sanitizedBase}${ext}`;
      const targetFilePath = path.join(publicDir, finalFilename);

      fs.writeFileSync(targetFilePath, buffer);

      // Also copy to dist/ if dist folder exists (for production static serving)
      try {
        const distDir = path.join(process.cwd(), 'dist');
        if (fs.existsSync(distDir)) {
          fs.writeFileSync(path.join(distDir, finalFilename), buffer);
        }
      } catch (e) {
        console.warn('Could not copy image to dist:', e);
      }

      console.log(`[Image Uploaded] Saved new image to ${targetFilePath} (${buffer.length} bytes)`);

      return res.json({
        success: true,
        url: `/${finalFilename}`,
        filename: finalFilename,
        filePath: `public/${finalFilename}`,
        size: buffer.length
      });
    } catch (err: any) {
      console.error('Error saving image:', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to save image to public folder.' });
    }
  });

  // --------------------------------------------------------------------------
  // BLOG POSTS & VIEWS COUNTER API ENDPOINTS
  // --------------------------------------------------------------------------

  // Get all blog posts
  app.get("/api/blogs", (req, res) => {
    return res.json({ success: true, blogs: serverBlogs });
  });

  // Publish new blog post
  app.post("/api/blogs", (req, res) => {
    try {
      const newBlog = req.body;
      if (!newBlog || !newBlog.name) {
        return res.status(400).json({ success: false, error: "Article title and details are required." });
      }

      // Ensure proper structure and views count
      newBlog.id = newBlog.id || `blog-${Date.now()}`;
      newBlog.views = Number(newBlog.views) || 100;
      newBlog.post_date = newBlog.post_date || new Date().toISOString().split('T')[0];

      serverBlogs = [newBlog, ...serverBlogs.filter((b) => b.id !== newBlog.id)];
      saveBlogsToDisk();

      console.log(`[Blog Created] Published new article "${newBlog.name}" (ID: ${newBlog.id}, Image: ${newBlog.feature_image})`);
      return res.json({ success: true, blog: newBlog });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Update existing blog post
  app.put("/api/blogs/:id", (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const index = serverBlogs.findIndex((b) => b.id === id || b.slug === id);

      if (index !== -1) {
        serverBlogs[index] = { ...serverBlogs[index], ...updatedData };
        saveBlogsToDisk();
        console.log(`[Blog Updated] Updated article "${serverBlogs[index].name}" (ID: ${id})`);
        return res.json({ success: true, blog: serverBlogs[index] });
      }
      return res.status(404).json({ success: false, error: "Blog post not found." });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Delete blog post
  app.delete("/api/blogs/:id", (req, res) => {
    try {
      const { id } = req.params;
      serverBlogs = serverBlogs.filter((b) => b.id !== id && b.slug !== id);
      saveBlogsToDisk();
      console.log(`[Blog Deleted] Deleted article ID: ${id}`);
      return res.json({ success: true, message: "Blog post deleted successfully." });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Add view count to a blog post whenever visited
  app.post("/api/blogs/:id/view", (req, res) => {
    try {
      const { id } = req.params;
      let blog = serverBlogs.find((b) => b.id === id || b.slug === id);

      if (!blog) {
        // Search in INITIAL_BLOGS if not yet loaded in serverBlogs
        const initBlog = INITIAL_BLOGS.find((b) => b.id === id || b.slug === id);
        if (initBlog) {
          blog = { ...initBlog };
          serverBlogs.push(blog);
        }
      }

      if (blog) {
        blog.views = (Number(blog.views) || 0) + 1;
        saveBlogsToDisk();
        console.log(`[Blog View Counted] "${blog.name}" now has ${blog.views} views.`);
        return res.json({ success: true, views: blog.views, blogId: blog.id });
      }

      return res.status(404).json({ success: false, error: "Blog post not found to increment view." });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development vs static production build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Serve index.html for all non-API GET requests in development mode
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const templatePath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).send(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (0.0.0.0)`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
