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
  const contactMessages: Array<{ id: string; name: string; email: string; phone: string; message: string; date: string }> = [];
  const subscriptions: string[] = [];

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Doctor Baba Mukisa Spiritual Website" });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill in required fields." });
    }
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "Not provided",
      message,
      date: new Date().toISOString()
    };
    contactMessages.push(newMessage);
    console.log("New contact query received:", newMessage);
    return res.json({ success: true, message: "Your query has been submitted successfully. Doctor Baba Mukisa will contact you soon!" });
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
