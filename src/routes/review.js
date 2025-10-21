import express from "express";
import Review from "../models/Review.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /reviews
 * @desc    Create a new review (authenticated users only)
 * @access  Private
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { service, rating, comment } = req.body;

    if (!service || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const review = await Review.create({
      user: req.user.id,
      service,
      rating,
      comment,
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/**
 * @route   GET /reviews
 * @desc    Get all reviews (public)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find() 
      .populate("user", "name email")       // Include user name and email
      .populate("service", "name description price") // Include service details
      .sort({ createdAt: -1 });             // Latest reviews first

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

/**
 * @route   GET /reviews/service/:serviceId
 * @desc    Get all reviews for a specific service (public)
 * @access  Public
 */
router.get("/service/:serviceId", async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name")  // Only show user name
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
