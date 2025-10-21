import express from "express";
import Service from "../models/Service.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js"; // Cloudinary uploader

const router = express.Router();

// ✅ Add new service (admin only)
router.post("/", verifyToken, upload.single("thumbnail"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description, price } = req.body;

    // Cloudinary automatically returns the full URL in req.file.path
    const thumbnail = req.file ? req.file.path : "";

    // ✅ Create and save new service
    const newService = new Service({
      name,
      description,
      price,
      thumbnail,
    });

    await newService.save();

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
