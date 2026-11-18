import nodemailer from "nodemailer";
import { ApplicationRecord } from "./types";
import { CAREERS_CONFIG } from "@/lib/careers-config";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a transactional confirmation email to the applicant.
 */
export async function sendApplicantConfirmation(
  app: ApplicationRecord
): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Careers Email] SMTP not configured. Applicant confirmation email skipped.");
    return false;
  }

  const senderEmail = process.env.SMTP_USER || "info@flowfoundryai.in";
  const fromName = "FlowFoundry AI Solutions Careers";

  const mailOptions = {
    from: `"${fromName}" <${senderEmail}>`,
    to: app.email,
    replyTo: CAREERS_CONFIG.company.defaultNotificationEmail,
    subject: `Application Received: FlowFoundry Internship (${app.trackTitle}) [${app.id}]`,
    text: `Hi ${app.fullName},

Thank you for applying for the ${app.trackTitle} at FlowFoundry AI Solutions.

We have successfully received your application. Your reference ID is: ${app.id}

--- Summary of Program Parameters ---
Program: FlowFoundry Software & AI Engineering Internship
Track: ${app.trackTitle}
Duration: 3 Months
Mode: Remote
Structure: Supervised, learning-focused unpaid internship with technical mentorship

--- What Happens Next? ---
1. Application Review: Our engineering team will review your application, GitHub/projects, and technical foundations.
2. Technical Discussion: If there is a mutual fit, we will reach out within 7-10 business days to schedule a 30-minute discussion.
3. Selection & Onboarding: Selected applicants receive written program details and orientation materials.

If you have any questions regarding your application, feel free to contact us at ${CAREERS_CONFIG.company.defaultNotificationEmail}.

Warm regards,
FlowFoundry AI Solutions
Vijayawada, Andhra Pradesh, India
https://www.flowfoundryai.in
`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Application Received - FlowFoundry AI Solutions</title>
</head>
<body style="margin: 0; padding: 0; background-color: #131210; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #efe9de;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #131210; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #1a1816; border: 1px solid rgba(239, 233, 222, 0.1); border-radius: 12px; overflow: hidden; text-align: left;">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; border-bottom: 1px solid rgba(239, 233, 222, 0.08); background-color: #201e1b;">
              <span style="font-size: 18px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">FlowFoundry</span>
              <span style="font-size: 13px; color: #aaa398; margin-left: 6px;">AI Solutions</span>
              <div style="font-size: 12px; color: #e8873c; margin-top: 4px; font-weight: 500;">CAREERS & INTERNSHIPS</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="font-size: 20px; font-weight: 600; color: #ffffff; margin-top: 0; margin-bottom: 16px;">
                Application Received
              </h1>
              <p style="font-size: 15px; line-height: 1.6; color: #aaa398; margin-bottom: 24px;">
                Hi <strong>${escapeHtml(app.fullName)}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: #aaa398; margin-bottom: 24px;">
                Thank you for applying to the <strong>FlowFoundry Software & AI Engineering Internship</strong>. We have received your technical profile and PDF resume.
              </p>

              <!-- Reference Card -->
              <div style="background-color: #201e1b; border: 1px solid rgba(239, 233, 222, 0.12); border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
                <div style="font-size: 12px; color: #8a847a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Application ID</div>
                <div style="font-size: 18px; font-weight: 600; font-family: monospace; color: #ffffff; margin-bottom: 14px;">${app.id}</div>

                <div style="font-size: 13px; color: #aaa398; margin-bottom: 6px;">
                  <strong style="color: #efe9de;">Track:</strong> ${escapeHtml(app.trackTitle)}
                </div>
                <div style="font-size: 13px; color: #aaa398; margin-bottom: 6px;">
                  <strong style="color: #efe9de;">Duration:</strong> 3 Months (Remote)
                </div>
                <div style="font-size: 13px; color: #aaa398;">
                  <strong style="color: #efe9de;">Compensation:</strong> Unpaid (Supervised learning & practical mentorship)
                </div>
              </div>

              <!-- Next Steps -->
              <h2 style="font-size: 16px; font-weight: 600; color: #ffffff; margin-top: 28px; margin-bottom: 12px;">
                What Happens Next?
              </h2>
              <ol style="font-size: 14px; line-height: 1.6; color: #aaa398; padding-left: 20px; margin-bottom: 24px;">
                <li style="margin-bottom: 8px;"><strong>Application Review:</strong> Our team reviews your foundational knowledge, code projects, and track match.</li>
                <li style="margin-bottom: 8px;"><strong>Technical Discussion:</strong> Qualified candidates are invited to a short 30-minute technical chat.</li>
                <li><strong>Selection & Onboarding:</strong> Finalized interns receive program milestones and mentor setup.</li>
              </ol>

              <p style="font-size: 14px; line-height: 1.6; color: #8a847a; margin-bottom: 0;">
                Have questions in the meantime? Reply to this email or write to <a href="mailto:${CAREERS_CONFIG.company.defaultNotificationEmail}" style="color: #e8873c; text-decoration: none;">${CAREERS_CONFIG.company.defaultNotificationEmail}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #131210; border-top: 1px solid rgba(239, 233, 222, 0.08); font-size: 12px; color: #8a847a; line-height: 1.5;">
              FlowFoundry AI Solutions · Vijayawada, Andhra Pradesh, India<br>
              <a href="https://www.flowfoundryai.in" style="color: #8a847a; text-decoration: underline;">www.flowfoundryai.in</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("[Careers Email] Failed to send applicant confirmation email:", err);
    return false;
  }
}

/**
 * Sends internal notification email to the recruitment mailbox.
 */
export async function sendRecruiterNotification(
  app: ApplicationRecord,
  resumeBuffer?: Buffer
): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Careers Email] SMTP not configured. Recruiter notification skipped.");
    return false;
  }

  const senderEmail = process.env.SMTP_USER || "info@flowfoundryai.in";
  const recipient =
    process.env.RECRUITMENT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "info@flowfoundryai.in";

  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
  if (resumeBuffer && resumeBuffer.length > 0) {
    attachments.push({
      filename: app.resume.originalName || `${app.id}_resume.pdf`,
      content: resumeBuffer,
      contentType: "application/pdf",
    });
  }

  const mailOptions = {
    from: `"FlowFoundry Careers Portal" <${senderEmail}>`,
    to: recipient,
    replyTo: app.email,
    subject: `[New Application] ${app.fullName} - ${app.trackTitle} (${app.id})`,
    text: `New Internship Application Received:

Application ID: ${app.id}
Track: ${app.trackTitle}
Name: ${app.fullName}
Email: ${app.email}
Phone: ${app.phone}
Location: ${app.city}, ${app.state}

Education:
- Institution: ${app.college}
- Degree: ${app.degree}
- Current Year: ${app.currentYear}
- Graduation Year: ${app.graduationYear || "N/A"}

Technical Profile:
- Skills: ${app.technicalSkills}
- GitHub: ${app.githubUrl || "None"}
- LinkedIn: ${app.linkedinUrl || "None"}
- Portfolio: ${app.portfolioUrl || "None"}
- Resume Storage: ${app.resume.storageFilename} (${(app.resume.sizeBytes / 1024).toFixed(1)} KB)

Availability:
- Preferred Start Date: ${app.preferredStartDate}
- Weekly Availability: ${app.weeklyAvailability}
- 3-Month Commitment: ${app.canCommitThreeMonths ? "Yes" : "No"}

Motivation Statement:
"${app.motivationStatement}"

Acknowledgements:
- Unpaid Internship: Confirmed
- No Employment Guarantee: Confirmed
- Privacy Consent: Confirmed
Submitted At: ${app.createdAt}
`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #f7f7f7; padding: 24px; color: #222;">
  <div style="max-width: 650px; margin: auto; background: #fff; padding: 28px; border-radius: 8px; border: 1px solid #e0e0e0;">
    <h2 style="color: #1a1816; margin-top: 0;">New Internship Application</h2>
    <div style="background: #f0f0f0; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
      <strong>ID:</strong> ${app.id} | <strong>Track:</strong> ${escapeHtml(app.trackTitle)} | <strong>Submitted:</strong> ${new Date(app.createdAt).toLocaleString()}
    </div>

    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 6px;">Applicant Information</h3>
    <ul style="line-height: 1.6;">
      <li><strong>Name:</strong> ${escapeHtml(app.fullName)}</li>
      <li><strong>Email:</strong> <a href="mailto:${app.email}">${escapeHtml(app.email)}</a></li>
      <li><strong>Phone:</strong> <a href="tel:${app.phone}">${escapeHtml(app.phone)}</a></li>
      <li><strong>Location:</strong> ${escapeHtml(app.city)}, ${escapeHtml(app.state)}</li>
    </ul>

    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 6px;">Education</h3>
    <ul style="line-height: 1.6;">
      <li><strong>College/University:</strong> ${escapeHtml(app.college)}</li>
      <li><strong>Degree:</strong> ${escapeHtml(app.degree)}</li>
      <li><strong>Current Year:</strong> ${escapeHtml(app.currentYear)}</li>
      <li><strong>Graduation Year:</strong> ${escapeHtml(app.graduationYear || "Not specified")}</li>
    </ul>

    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 6px;">Technical Profile</h3>
    <p><strong>Skills:</strong> ${escapeHtml(app.technicalSkills)}</p>
    <ul style="line-height: 1.6;">
      <li><strong>GitHub:</strong> ${app.githubUrl ? `<a href="${app.githubUrl}" target="_blank">${app.githubUrl}</a>` : "Not provided"}</li>
      <li><strong>LinkedIn:</strong> ${app.linkedinUrl ? `<a href="${app.linkedinUrl}" target="_blank">${app.linkedinUrl}</a>` : "Not provided"}</li>
      <li><strong>Portfolio:</strong> ${app.portfolioUrl ? `<a href="${app.portfolioUrl}" target="_blank">${app.portfolioUrl}</a>` : "Not provided"}</li>
      <li><strong>Resume File:</strong> ${escapeHtml(app.resume.originalName)} (${(app.resume.sizeBytes / 1024).toFixed(1)} KB) - <em>Attached to this email</em></li>
    </ul>

    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 6px;">Availability</h3>
    <ul style="line-height: 1.6;">
      <li><strong>Preferred Start Date:</strong> ${escapeHtml(app.preferredStartDate)}</li>
      <li><strong>Weekly Hours:</strong> ${escapeHtml(app.weeklyAvailability)}</li>
      <li><strong>3-Month Commitment:</strong> ${app.canCommitThreeMonths ? "Yes" : "No"}</li>
    </ul>

    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 6px;">Why Join FlowFoundry?</h3>
    <blockquote style="background: #f9f9f9; padding: 12px 16px; border-left: 4px solid #e8873c; margin: 0; white-space: pre-wrap;">${escapeHtml(app.motivationStatement)}</blockquote>
  </div>
</body>
</html>
`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("[Careers Email] Failed to send recruiter notification email:", err);
    return false;
  }
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
