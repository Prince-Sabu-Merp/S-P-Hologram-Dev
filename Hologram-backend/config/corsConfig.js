const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

export default {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman/curl allowed
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
