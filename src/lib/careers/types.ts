export type ApplicationStatus =
  | "New"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected"
  | "Withdrawn";

export interface StoredResumeRef {
  originalName: string;
  storageFilename: string;
  mimeType: string;
  sizeBytes: number;
  storedPath: string; // Private path on disk, never a public URL
  uploadedAt: string;
}

export interface ApplicationRecord {
  id: string; // e.g. FFA-202611-A892
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;

  // Education
  college: string;
  degree: string;
  currentYear: string;
  graduationYear?: string;

  // Technical Profile
  trackId: string;
  trackTitle: string;
  technicalSkills: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resume: StoredResumeRef;

  // Availability & Motivation
  preferredStartDate: string;
  weeklyAvailability: string;
  canCommitThreeMonths: boolean;
  motivationStatement: string; // max 1,000 chars

  // Acknowledgements (must be true)
  unpaidAcknowledgement: boolean;
  noEmploymentGuaranteeAcknowledgement: boolean;
  privacyConsent: boolean;

  // System Metadata
  status: ApplicationStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  ipHash?: string;
  userAgent?: string;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  applicationId?: string;
  message: string;
  errors?: Record<string, string>;
}
