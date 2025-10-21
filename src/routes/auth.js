import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMail, getForgotPasswordTemplate } from "../utils/mail.js";


const router = express.Router();

// ========================
// ✅ SIGNUP
// ========================
router.post("/signup", async (req, res) => {
  try {
    // 1. Destructure ALL the fields from the request body sent by the frontend
    const {
      name,
      email,
      password,
      companyName,
      mobileNo,
      companyField,
      region,
      state,
      city,
      pinCode,
    } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409) // 409 Conflict is more appropriate here
        .json({ error: "User with this email already exists." });
    }

    // 2. Create a new User instance with ALL the received data
    const newUser = new User({
      name,
      email,
      password, // The hashing is handled by the .pre('save') hook in your model
      companyName,
      mobileNo,
      companyField,
      region,
      state,
      city,
      pinCode,
    });

    // 3. Save the new user to the database
    const savedUser = await newUser.save();

    // 4. Create a JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET, // Make sure you have JWT_SECRET in your .env file
      { expiresIn: "1d" }
    );

    // Don't send the password back to the client
    savedUser.password = undefined;

    res.status(201).json({
      success: true,
      token,
      user: savedUser,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.message);
    res.status(500).json({ error: "Server error during signup process." });
  }
});

// ==========================================================
// 🔹 LOGIN ROUTE (Unchanged, but included for completeness) 🔹
// ==========================================================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        user.password = undefined;

        res.status(200).json({ success: true, token, user });

    } catch (err) {
        console.error("LOGIN ERROR:", err.message);
        res.status(500).json({ error: "Server error during login." });
    }
});
// ========================
// ✅ FORGOT PASSWORD
// ========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = getForgotPasswordTemplate({
      name: user.name,
      resetLink
    });

    await sendMail({
      to: email,
      subject: "Password Reset Request",
      html
    });

    res.json({ success: true, message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ========================
// ✅ RESET PASSWORD
// ========================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = password; // hashed automatically
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password successfully reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
