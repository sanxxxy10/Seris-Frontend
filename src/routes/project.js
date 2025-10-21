import express from "express";
import Project from "../models/Project.js";
import { sendMail, getAdminEmailTemplate, getUserEmailTemplate } from "../utils/mail.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name, companyName, mobile, email,
      websiteLink, projectName, websiteType, budget
    } = req.body;

    const newProject = await Project.create({
      user: req.user.id,
      name, companyName, mobile, email, websiteLink,
      projectName, websiteType, budget,
      status: "pending"
    });

    const emailData = { name, companyName, mobile, email, websiteLink, projectName, websiteType, budget };

    // Prepare templates separately
    const adminHtml = getAdminEmailTemplate(emailData);
    const userHtml = getUserEmailTemplate(emailData);

    console.log("Admin Email Preview:", adminHtml.substring(0, 100));
    console.log("User Email Preview:", userHtml.substring(0, 100));

    // Send Admin email
    sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Project: ${projectName} - ${companyName}`,
      html: adminHtml
    }).catch(err => console.error("Admin email failed:", err));

    // Send User email
    sendMail({
      to: email,
      subject: "✅ Project Submission Confirmation",
      html: userHtml
    }).catch(err => console.error("User email failed:", err));

    res.status(201).json({
      success: true,
      message: "Project submitted successfully!",
      project: newProject
    });

  } catch (error) {
    console.error("❌ Error submitting project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
