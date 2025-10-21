import express from "express";
import Offer from "../models/Offer.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create offer (admin only)
router.post("/", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all offers
router.get("/", async (req, res) => {
  const offers = await Offer.find().populate("applicableTo");
  res.json(offers);
});

export default router;
