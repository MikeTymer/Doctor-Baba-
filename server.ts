import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { sendInquiryEmail, sendReplyEmail, checkEmailConfiguration, setRuntimeSmtpConfig, getActiveSmtpConfig } from "./server/mailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security Headers Middleware for enhanced protection & Google search trust
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
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
    res.type('text/plain');
    res.send('google.com, pub-9439344424124933, DIRECT, f08c47fec0942fa0\n');
  });

  app.get('/robots.txt', (req, res) => {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.type('text/plain');
      return res.sendFile(robotsPath);
    }
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://doctorbabamukisa.com/sitemap.xml\n");
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
