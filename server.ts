import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files route for images and assets
  app.use('/static', express.static(path.join(process.cwd(), 'public', 'static')));

  // In-memory contact & subscription storage
  const contactMessages: Array<any> = [
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
  const subscriptions: string[] = [];

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Doctor Baba Mukisa Spiritual Website" });
  });

  app.get("/api/inquiries", (req, res) => {
    return res.json({ success: true, messages: contactMessages });
  });

  app.post("/api/contact", (req, res) => {
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
    console.log("New contact inquiry received with client Google metadata & security audit:", newMessage);
    return res.json({ success: true, message: "Your inquiry has been submitted successfully. Doctor Baba Mukisa will contact you soon!", messageData: newMessage });
  });

  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }
    subscriptions.push(email);
    console.log("New subscriber:", email);
    return res.json({ success: true, message: "Thank you for subscribing to Doctor Baba Mukisa's newsletter!" });
  });

  // Vite middleware for development vs static production build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
