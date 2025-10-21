import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import serviceRoutes from "./routes/service.js";
import reviewRoutes from "./routes/review.js";
import offerRoutes from "./routes/offer.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  "https://seris.site",      // deployed frontend
  "http://127.0.0.1:5500",   // local Live Server
  "http://localhost:5500"    // alternative local host
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: The origin ${origin} is not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


// Routes

app.use("/auth", authRoutes); // ✅ attach route
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/reviews", reviewRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Health check / test route
app.get("/", (req, res) => {
  res.send("✅ Seris Backend is running successfully!");
});

// Connect to MongoDB & start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

