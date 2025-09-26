import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import promotionalRoutes from "./routes/promotionalRoutes.js";
import screenSaverRoutes from "./routes/screenSaverRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { authenticate } from "./middlewares/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

// Trust proxy for rate limiter
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests" },
  })
);

// Routes
app.get("/", (req, res) => res.send("✅ Backend Secure & Ready!"));
app.use("/PromotionalData", authenticate, promotionalRoutes);
app.use("/ScreenSaver", authenticate, screenSaverRoutes);
app.use("/messages", authenticate, messageRoutes);

// Start
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
