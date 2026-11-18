import { NextRequest, NextResponse } from "next/server";
import { CAREERS_CONFIG } from "@/lib/careers-config";
import {
  generateApplicationId,
  saveResumeFile,
  saveApplicationRecord,
  findRecentApplicationByEmail,
} from "@/lib/careers/storage";
import { ApplicationRecord } from "@/lib/careers/types";
import { checkRateLimit, hashIp } from "@/lib/careers/rate-limit";
import {
  sendApplicantConfirmation,
  sendRecruiterNotification,
} from "@/lib/careers/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const ipHash = hashIp(ip);

    const rateLimit = checkRateLimit(ipHash);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this connection. Please try again in ${rateLimit.retryAfterMinutes} minutes.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse multipart form data
    const formData = await req.formData();

    // Anti-spam honeypot
    const honeypot = formData.get("website_hp");
    if (honeypot && String(honeypot).trim().length > 0) {
      // Bot detected - reject quietly
      return NextResponse.json(
        { success: false, message: "Submission failed validation." },
        { status: 400 }
      );
    }

    // Minimum fill time check (at least 3 seconds)
    const timestamp = formData.get("_t");
    if (timestamp) {
      const elapsed = Date.now() - parseInt(String(timestamp), 10);
      if (elapsed < 3000) {
        return NextResponse.json(
          { success: false, message: "Submission completed suspiciously fast. Please take a moment to review your details." },
          { status: 400 }
        );
      }
    }

    // 3. Extract and validate fields
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const state = String(formData.get("state") || "").trim();

    const college = String(formData.get("college") || "").trim();
    const degree = String(formData.get("degree") || "").trim();
    const currentYear = String(formData.get("currentYear") || "").trim();
    const graduationYear = String(formData.get("graduationYear") || "").trim();

    const trackId = String(formData.get("trackId") || "").trim();
    const technicalSkills = String(formData.get("technicalSkills") || "").trim();
    const githubUrl = String(formData.get("githubUrl") || "").trim();
    const linkedinUrl = String(formData.get("linkedinUrl") || "").trim();
    const portfolioUrl = String(formData.get("portfolioUrl") || "").trim();

    const preferredStartDate = String(formData.get("preferredStartDate") || "").trim();
    const weeklyAvailability = String(formData.get("weeklyAvailability") || "").trim();
    const canCommitThreeMonths = String(formData.get("canCommitThreeMonths") || "").toLowerCase() === "true";
    const motivationStatement = String(formData.get("motivationStatement") || "").trim();

    const unpaidAcknowledgement = String(formData.get("unpaidAcknowledgement") || "").toLowerCase() === "true";
    const noEmploymentGuaranteeAcknowledgement = String(formData.get("noEmploymentGuaranteeAcknowledgement") || "").toLowerCase() === "true";
    const privacyConsent = String(formData.get("privacyConsent") || "").toLowerCase() === "true";

    const errors: Record<string, string> = {};

    // Personal details validation
    if (!fullName || fullName.length < 2) errors.fullName = "Please enter your full name (at least 2 characters).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (!phone || !/^[+\d][\d\s()-]{6,}$/.test(phone)) errors.phone = "Please enter a valid phone number.";
    if (!city || city.length < 2) errors.city = "Please enter your city.";
    if (!state || state.length < 2) errors.state = "Please enter your state.";

    // Education validation
    if (!college || college.length < 2) errors.college = "Please enter your college or university name.";
    if (!degree || degree.length < 2) errors.degree = "Please specify your degree or qualification.";
    if (!currentYear) errors.currentYear = "Please select your current year of study.";

    // Track validation
    const matchedTrack = CAREERS_CONFIG.tracks.find((t) => t.id === trackId);
    if (!matchedTrack) {
      errors.trackId = "Please select a valid internship track.";
    }

    if (!technicalSkills || technicalSkills.length < 2) {
      errors.technicalSkills = "Please list your technical skills (languages, frameworks, tools).";
    }

    // Availability validation
    if (!preferredStartDate) errors.preferredStartDate = "Please select your preferred start date.";
    if (!weeklyAvailability) errors.weeklyAvailability = "Please select your weekly availability.";
    if (!canCommitThreeMonths) {
      errors.canCommitThreeMonths = "You must be able to commit to the 3-month internship program.";
    }

    if (!motivationStatement || motivationStatement.length < 20) {
      errors.motivationStatement = "Please share why you want to join FlowFoundry (at least 20 characters).";
    } else if (motivationStatement.length > 1000) {
      errors.motivationStatement = "Motivation statement cannot exceed 1,000 characters.";
    }

    // Mandatory Acknowledgements
    if (!unpaidAcknowledgement) {
      errors.unpaidAcknowledgement = "You must acknowledge that this is a 3-month unpaid internship without stipend.";
    }
    if (!noEmploymentGuaranteeAcknowledgement) {
      errors.noEmploymentGuaranteeAcknowledgement = "You must acknowledge that participation or completion does not guarantee future employment.";
    }
    if (!privacyConsent) {
      errors.privacyConsent = "You must consent to FlowFoundry AI Solutions processing your application.";
    }

    // Resume file validation
    const resumeFile = formData.get("resume") as File | null;
    if (!resumeFile || typeof resumeFile === "string" || resumeFile.size === 0) {
      errors.resume = "Please upload your resume in PDF format.";
    } else {
      if (resumeFile.size > 5 * 1024 * 1024) {
        errors.resume = "Resume file exceeds the 5 MB size limit.";
      }
      if (resumeFile.type && resumeFile.type !== "application/pdf" && !resumeFile.name.toLowerCase().endsWith(".pdf")) {
        errors.resume = "Only PDF documents (.pdf) are accepted.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the errors in the form before submitting.",
          errors,
        },
        { status: 422 }
      );
    }

    // 4. Duplicate check
    const recentDuplicate = await findRecentApplicationByEmail(email, trackId, 30);
    if (recentDuplicate) {
      return NextResponse.json(
        {
          success: false,
          message: `An application with email ${email} has already been submitted for the "${matchedTrack?.title}" track within the last 30 days (Ref: ${recentDuplicate.id}). Our team is currently reviewing your profile.`,
        },
        { status: 409 }
      );
    }

    // 5. Read resume buffer and validate PDF magic header
    const fileArrayBuffer = await resumeFile!.arrayBuffer();
    const resumeBuffer = Buffer.from(fileArrayBuffer);

    let storedResume;
    try {
      storedResume = await saveResumeFile(
        resumeBuffer,
        resumeFile!.name,
        resumeFile!.type || "application/pdf"
      );
    } catch (fileErr: unknown) {
      return NextResponse.json(
        {
          success: false,
          message: (fileErr as Error).message || "Failed to process resume file.",
          errors: { resume: (fileErr as Error).message || "Invalid PDF file." },
        },
        { status: 400 }
      );
    }

    // 6. Build application record
    const applicationId = generateApplicationId();
    const nowIso = new Date().toISOString();

    const applicationRecord: ApplicationRecord = {
      id: applicationId,
      fullName,
      email,
      phone,
      city,
      state,

      college,
      degree,
      currentYear,
      graduationYear: graduationYear || undefined,

      trackId,
      trackTitle: matchedTrack?.title || trackId,
      technicalSkills,
      githubUrl: githubUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
      portfolioUrl: portfolioUrl || undefined,
      resume: storedResume,

      preferredStartDate,
      weeklyAvailability,
      canCommitThreeMonths,
      motivationStatement,

      unpaidAcknowledgement,
      noEmploymentGuaranteeAcknowledgement,
      privacyConsent,

      status: "New",
      createdAt: nowIso,
      updatedAt: nowIso,
      ipHash,
      userAgent: req.headers.get("user-agent")?.slice(0, 200) || undefined,
    };

    // 7. Persist record securely
    await saveApplicationRecord(applicationRecord);

    // 8. Trigger emails asynchronously (does not block response or fail submission)
    try {
      await Promise.allSettled([
        sendApplicantConfirmation(applicationRecord),
        sendRecruiterNotification(applicationRecord, resumeBuffer),
      ]);
    } catch (emailErr) {
      console.error("[Careers API] Non-fatal email dispatch error:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        applicationId,
        message: "Your application has been received successfully. A confirmation email has been sent to your inbox.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Careers API] Unexpected error during application submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your application. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
