import express from "express";
import Project from "../models/Project.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Admin Email Template - Mobile Responsive
const getAdminEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project Submission</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .content { padding: 25px 20px !important; }
          .header { padding: 35px 20px !important; }
          .logo { width: 60px !important; height: 60px !important; font-size: 32px !important; }
          .title { font-size: 24px !important; }
          .project-title { font-size: 20px !important; }
          .info-card { padding: 14px 15px !important; }
          .label { font-size: 12px !important; width: 100px !important; }
          .value { font-size: 16px !important; }
          .footer { padding: 30px 20px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 20px 10px;">
        <tr>
          <td align="center">
            <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              
              <!-- Header -->
              <tr>
                <td class="header" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 40px 30px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 15px;">
                    <tr>
                      <td class="logo" width="70" height="70" align="center" valign="middle" style="background-color: rgba(255,255,255,0.2); border-radius: 35px; font-size: 36px; font-weight: bold; color: #ffffff;">S</td>
                    </tr>
                  </table>
                  <h1 class="title" style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">NEW PROJECT ALERT</h1>
                  <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 14px;">Fresh opportunity just landed!</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td class="content" style="padding: 35px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <h2 class="project-title" style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">${data.projectName}</h2>
                        <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 13px;">Project Type: ${data.websiteType}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="label" width="120" style="vertical-align: top;">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</span>
                                  </td>
                                  <td>
                                    <span class="value" style="color: #f1f5f9; font-size: 17px; font-weight: 500;">${data.name}</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="label" width="120" style="vertical-align: top;">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Company</span>
                                  </td>
                                  <td>
                                    <span class="value" style="color: #f1f5f9; font-size: 17px; font-weight: 500;">${data.companyName}</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="label" width="120" style="vertical-align: top;">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  </td>
                                  <td>
                                    <a href="mailto:${data.email}" style="color: #0ea5e9; font-size: 15px; text-decoration: none; word-break: break-all;">${data.email}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="label" width="120" style="vertical-align: top;">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</span>
                                  </td>
                                  <td>
                                    <a href="tel:${data.mobile}" style="color: #0ea5e9; font-size: 15px; text-decoration: none;">${data.mobile}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td class="label" width="120" style="vertical-align: top;">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Budget</span>
                                  </td>
                                  <td>
                                    <span style="color: #10b981; font-size: 18px; font-weight: 700;">${data.budget}</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ${data.websiteLink ? `
                    <tr>
                      <td style="padding: 0 0 10px 0;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #334155; border-radius: 8px;">
                          <tr>
                            <td class="info-card" style="padding: 16px 18px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td colspan="2">
                                    <span style="color: #0ea5e9; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Website Link</span>
                                    <a href="${data.websiteLink}" style="color: #0ea5e9; font-size: 15px; text-decoration: none; word-break: break-all;">${data.websiteLink}</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ` : ''}
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; margin-top: 25px;">
                    <tr>
                      <td style="padding: 18px; border-left: 4px solid #fbbf24;">
                        <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                          <strong style="color: #78350f;">⚡ Quick Action:</strong> Reach out within 24 hours for best response!
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer" style="background-color: #0f172a; padding: 35px 30px; text-align: center; border-top: 2px solid #334155;">
                  <h3 style="margin: 0 0 15px 0; color: #0ea5e9; font-size: 24px; font-weight: 700; letter-spacing: 1px;">SERIS</h3>
                  <p style="margin: 0 0 15px 0; color: #cbd5e1; font-size: 15px; line-height: 1.8;">
                    <strong style="color: #e2e8f0;">Sanjay Ram</strong><br>
                    <a href="tel:+917395910172" style="color: #0ea5e9; text-decoration: none;">+91 73959 10172</a><br>
                    <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none;">serisdeveloper@gmail.com</a><br>
                    <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none;">www.seris.site</a>
                  </p>
                  <p style="margin: 15px 0 0 0; color: #64748b; font-size: 12px;">
                    © ${new Date().getFullYear()} Seris. Crafting Digital Excellence.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// User Confirmation Email Template - Mobile Responsive
const getUserEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Submission Confirmation</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .content { padding: 20px 20px 40px !important; }
          .header { padding: 40px 20px 30px !important; }
          .checkmark { width: 80px !important; height: 80px !important; font-size: 50px !important; }
          .main-title { font-size: 28px !important; }
          .subtitle { font-size: 16px !important; }
          .greeting { font-size: 16px !important; }
          .body-text { font-size: 15px !important; }
          .section-title { font-size: 18px !important; }
          .timeline-circle { width: 28px !important; height: 28px !important; font-size: 14px !important; }
          .timeline-text { font-size: 14px !important; }
          .footer { padding: 35px 20px !important; }
          .footer-title { font-size: 24px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); padding: 20px 10px;">
        <tr>
          <td align="center">
            <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(14, 165, 233, 0.2);">
              
              <!-- Header -->
              <tr>
                <td class="header" style="padding: 50px 30px 35px; text-align: center; background: linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%);">
                  <table cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px;">
                    <tr>
                      <td class="checkmark" width="90" height="90" align="center" valign="middle" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); border-radius: 45px; box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3); font-size: 56px; color: #ffffff; font-weight: bold;">✓</td>
                    </tr>
                  </table>
                  <h1 class="main-title" style="margin: 0 0 10px 0; color: #0f172a; font-size: 32px; font-weight: 700; letter-spacing: -1px;">We Got Your Request!</h1>
                  <p class="subtitle" style="margin: 0; color: #64748b; font-size: 17px; font-weight: 500;">Your project is in our pipeline</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td class="content" style="padding: 20px 30px 45px;">
                  <p class="greeting" style="margin: 0 0 20px 0; color: #1e293b; font-size: 17px; line-height: 1.6;">
                    Hi <strong style="color: #0ea5e9;">${data.name}</strong>,
                  </p>
                  <p class="body-text" style="margin: 0 0 25px 0; color: #475569; font-size: 15px; line-height: 1.7;">
                    Thank you for choosing <strong style="color: #0ea5e9;">Seris</strong>! We've received your project submission for <strong>"${data.projectName}"</strong> and our team is excited to bring your vision to life.
                  </p>
                  
                  <!-- Project Info Card -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #bae6fd; border-radius: 12px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px 20px;">
                        <h3 class="section-title" style="margin: 0 0 15px 0; color: #0369a1; font-size: 18px; font-weight: 600; text-align: center;">📋 Your Project Details</h3>
                        <table width="100%" cellpadding="6" cellspacing="0">
                          <tr>
                            <td style="color: #0369a1; font-size: 13px; font-weight: 600; padding: 6px 0;">Company:</td>
                            <td style="color: #1e293b; font-size: 14px; font-weight: 500; text-align: right; padding: 6px 0;">${data.companyName}</td>
                          </tr>
                          <tr>
                            <td style="color: #0369a1; font-size: 13px; font-weight: 600; padding: 6px 0;">Website Type:</td>
                            <td style="color: #1e293b; font-size: 14px; font-weight: 500; text-align: right; padding: 6px 0;">${data.websiteType}</td>
                          </tr>
                          <tr>
                            <td style="color: #0369a1; font-size: 13px; font-weight: 600; padding: 6px 0;">Budget:</td>
                            <td style="color: #10b981; font-size: 15px; font-weight: 700; text-align: right; padding: 6px 0;">${data.budget}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Timeline -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 25px 20px; border-left: 4px solid #0ea5e9;">
                        <h3 class="section-title" style="margin: 0 0 20px 0; color: #0f172a; font-size: 18px; font-weight: 600;">🚀 What's Next?</h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 0 0 15px 0;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="42" valign="top">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td class="timeline-circle" width="30" height="30" align="center" valign="middle" style="background-color: #0ea5e9; border-radius: 15px; color: #ffffff; font-weight: bold; font-size: 14px;">1</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="timeline-text" style="color: #475569; font-size: 14px; line-height: 1.6;"><strong style="color: #1e293b;">Review:</strong> Our team analyzes your requirements (24 hours)</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 15px 0;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="42" valign="top">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td class="timeline-circle" width="30" height="30" align="center" valign="middle" style="background-color: #06b6d4; border-radius: 15px; color: #ffffff; font-weight: bold; font-size: 14px;">2</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="timeline-text" style="color: #475569; font-size: 14px; line-height: 1.6;"><strong style="color: #1e293b;">Proposal:</strong> We'll send you a detailed project proposal</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 15px 0;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="42" valign="top">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td class="timeline-circle" width="30" height="30" align="center" valign="middle" style="background-color: #0891b2; border-radius: 15px; color: #ffffff; font-weight: bold; font-size: 14px;">3</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="timeline-text" style="color: #475569; font-size: 14px; line-height: 1.6;"><strong style="color: #1e293b;">Discussion:</strong> Schedule a call to finalize details</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="42" valign="top">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td class="timeline-circle" width="30" height="30" align="center" valign="middle" style="background-color: #0e7490; border-radius: 15px; color: #ffffff; font-weight: bold; font-size: 14px;">4</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="timeline-text" style="color: #475569; font-size: 14px; line-height: 1.6;"><strong style="color: #1e293b;">Launch:</strong> Start building your amazing project!</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 20px; text-align: center;">
                        <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                          <strong style="font-size: 15px;">💡 Pro Tip:</strong> Check out our work at <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">seris.site</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <p class="body-text" style="margin: 0 0 25px 0; color: #475569; font-size: 14px; line-height: 1.7;">
                    Have questions? Feel free to reach out anytime!
                  </p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); border-radius: 40px; box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);">
                              <a href="mailto:serisdeveloper@gmail.com" style="display: block; color: #ffffff; text-decoration: none; padding: 14px 35px; font-size: 15px; font-weight: 600;">Contact Us Now</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center;">
                  <h3 class="footer-title" style="margin: 0 0 15px 0; color: #0ea5e9; font-size: 26px; font-weight: 700; letter-spacing: 2px;">SERIS</h3>
                  <p style="margin: 0 0 6px 0; color: #cbd5e1; font-size: 15px; font-weight: 600;">Sanjay Ram</p>
                  <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.9;">
                    <a href="tel:+917395910172" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📱 +91 73959 10172</a>
                    <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📧 serisdeveloper@gmail.com</a>
                    <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">🌐 seris.site</a>
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155; margin-top: 20px;">
                    <tr>
                      <td style="padding-top: 20px;">
                        <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                          © ${new Date().getFullYear()} Seris. All rights reserved.<br>
                          Visit <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none;">seris.site</a> for updates
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Create project submission
router.post("/", async (req, res) => {
  try {
    const {
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
    } = req.body;

    // Save project in DB
    const newProject = await Project.create({
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
    });

    // Prepare email data
    const emailData = {
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
    };

    // Send email to Admin with HTML template
    await transporter.sendMail({
      from: `"Seris Projects" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Project: ${projectName} - ${companyName}`,
      html: getAdminEmailTemplate(emailData),
    });

    // Send confirmation email to User with HTML template
    await transporter.sendMail({
      from: `"Seris - Sanjay Ram" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We Received Your Project Request - Seris",
      html: getUserEmailTemplate(emailData),
    });

    res.status(201).json({
      success: true,
      message: "Project submitted successfully!",
      project: newProject,
    });

  } catch (error) {
    console.error("❌ Error submitting project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all projects for logged-in user
router.get("/my-projects", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const projects = await Project.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;