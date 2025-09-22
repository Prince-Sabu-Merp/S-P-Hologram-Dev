import express from "express";
import { readFileSync, writeFileSync, existsSync } from "fs";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import Joi from "joi";

// ------------------- Load env ------------------- //
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = "./PromotionalData.json";
const API_KEY = process.env.API_KEY || "ubaSecnirP";
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
let screenSaverUrl =
  process.env.Fallback_Screen_Saver_URL ||
  "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg"; // fallback

// ------------------- Security/Infra ------------------- //

// ✅ Fix express-rate-limit proxy issue
// 1 = trust first proxy (works for Nginx/Heroku/Azure)
// Use "app.set('trust proxy', true)" if you want to trust all hops
app.set("trust proxy", 1);

app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Secure headers

// Strict CORS handling
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman/curl allowed
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit per IP
    standardHeaders: true, // send rate limit info in headers
    legacyHeaders: false,
    message: { error: "Too many requests, try again later." },
  })
);

// ------------------- Auth Middleware ------------------- //
function authenticate(req, res, next) {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden - Invalid API Key" });
  }
  next();
}

// ------------------- Validation Schema ------------------- //
const offerSchema = Joi.object({
  offersid: Joi.string()
    .pattern(/^PROM\d+$/)
    .required(),
  name: Joi.string().min(3).required(),
  type: Joi.string().required(),
  description: Joi.array().items(Joi.string()).required(),
  price: Joi.alternatives()
    .try(Joi.number().positive(), Joi.string().pattern(/^\d+$/))
    .required(),
});

// ------------------- Load Data ------------------- //
let data = [];
if (existsSync(FILE_PATH)) {
  data = JSON.parse(readFileSync(FILE_PATH, "utf-8"));
}

// ------------------- Routes ------------------- //

// Health check
app.get("/", (req, res) => {
  res.send("✅ Hologram Backend Secure & Ready!");
});

// Apply auth to protected routes
app.use("/PromotionalData", authenticate);
app.use("/ScreenSaver", authenticate);

// ---- GET all offers ----
app.get("/PromotionalData", (req, res) => {
  res.json(data);
});

// ---- GET offer by ID ----
app.get("/PromotionalData/:id", (req, res) => {
  const offer = data.find((o) => o.offersid === req.params.id);
  if (!offer) return res.status(404).json({ error: "Offer not found" });
  res.json(offer);
});

// ---- BULK Create/Update ----
app.post("/PromotionalData", (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: "Request body must be an array" });
  }

  let createdItems = [];
  let updatedItems = [];
  let errors = [];

  updates.forEach((incoming, idx) => {
    const { error } = offerSchema.validate(incoming);
    if (error) {
      errors.push({
        index: idx,
        offersid: incoming.offersid || null,
        error: error.details[0].message,
      });
      return;
    }

    const index = data.findIndex((o) => o.offersid === incoming.offersid);
    if (index !== -1) {
      data[index] = { ...data[index], ...incoming, offersid: incoming.offersid };
      updatedItems.push(data[index]);
    } else {
      data.push(incoming);
      createdItems.push(incoming);
    }
  });

  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

  res.json({
    message: "Bulk create/update completed",
    created: createdItems,
    updated: updatedItems,
    errors,
  });
});

// ---- DELETE single offer ----
app.delete("/PromotionalData/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((o) => o.offersid === id);
  if (index === -1) return res.status(404).json({ error: "Offer not found" });

  const deleted = data.splice(index, 1);
  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "Offer deleted", deleted });
});

// ---- DELETE all offers ----
app.delete("/PromotionalData", (req, res) => {
  if (data.length === 0) {
    return res.status(404).json({ message: "No offers to delete" });
  }
  const deleted = [...data];
  data = [];
  writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "All offers deleted", deleted });
});

// ---- GET current screen saver URL ----
app.get("/ScreenSaver", (req, res) => {
  res.json({ screenSaverUrl });
});

// ---- UPDATE screen saver URL ----
app.post("/ScreenSaver", (req, res) => {
  const { screenSaverUrl: url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL format" });
  }
  const urlPattern = /^(https?:\/\/[^\s]+)$/;
  if (!urlPattern.test(url)) {
    return res.status(400).json({ error: "Provided string is not a valid URL" });
  }
  screenSaverUrl = url;
  res.json({ message: "Screen saver URL updated successfully", screenSaverUrl });
});

// ------------------- Start Server ------------------- //
app
  .listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });
