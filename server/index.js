import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getFirestore } from "./firebaseAdmin.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
const demoInquiries = [];

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "miss-w-coffee-api" });
});

app.post("/api/inquiries", async (req, res) => {
  const { name, company, email, volume, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required."
    });
  }

  const inquiry = {
    name,
    company: company || "",
    email,
    volume: volume || "",
    message,
    source: "website",
    createdAt: new Date().toISOString()
  };

  try {
    const db = getFirestore();

    if (db) {
      const docRef = await db.collection("tradeInquiries").add(inquiry);
      return res.status(201).json({ id: docRef.id, stored: "firestore" });
    }

    demoInquiries.push({ id: `demo-${Date.now()}`, ...inquiry });
    return res.status(201).json({
      id: demoInquiries.at(-1).id,
      stored: "memory",
      note: "Firebase Admin credentials are not configured yet."
    });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return res.status(500).json({
      error: "Unable to submit inquiry right now."
    });
  }
});

app.use(express.static(distPath));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Miss. W Coffee API running on http://localhost:${port}`);
});
