import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Service from "../models/Service.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Add new service (admin only)
router.post("/", verifyToken, upload.single("thumbnail"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description, price } = req.body;
    const thumbnail = req.file ? req.file.path : "";

    // ✅ Create and save new service properly
    const newService = new Service({
      name,
      description,
      price,
      thumbnail,
    });

    await newService.save(); // <-- save to DB

    // ✅ Send success response
    res.status(201).json({ success: true, service: newService });

  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
