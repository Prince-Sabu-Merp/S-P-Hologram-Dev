
import dotenv from "dotenv";

dotenv.config(); // ensure .env variables are loaded

// Load API key from environment with fallback for local/dev
const API_KEY = process.env.API_KEY || "7722ubaSecnirP";

/**
 * Middleware to authenticate requests using x-api-key header
 */
export function authenticate(req, res, next) {
  const key = req.headers["x-api-key"]; // Express lowercases all headers

  if (!key) {
    return res.status(401).json({ error: "Unauthorized - API Key missing" });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ error: "Forbidden - Invalid API Key" });
  }

  next();
}
