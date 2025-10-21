import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get all users with full details (admin only)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Access denied" });

    const users = await User.find().select(
      "name email companyName mobile companyField region state city pinCode createdAt"
    );

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get single user details (admin only)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Access denied" });

    const user = await User.findById(req.params.id).select(
      "name email companyName mobile companyField region state city pinCode createdAt"
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Update user details after signup
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { companyName, mobile, companyField, region, state, city, pinCode } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // user ID from JWT
      { companyName, mobile, companyField, region, state, city, pinCode },
      { new: true, runValidators: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


export default router;
