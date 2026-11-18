import { ApplicationRecord } from "./types";

interface D1Response<T = unknown> {
  result: Array<{
    results: T[];
    success: boolean;
    meta?: Record<string, unknown>;
  }>;
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

function getD1Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !apiToken) {
    return null;
  }

  return { accountId, databaseId, apiToken };
}

export function isD1Configured(): boolean {
  return getD1Config() !== null;
}

/**
 * Executes a parameterized SQL statement against Cloudflare D1 via the official REST API.
 */
export async function executeD1Query<T = unknown>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const config = getD1Config();
  if (!config) {
    throw new Error("Cloudflare D1 is not configured.");
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql,
      params,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("[Cloudflare D1] HTTP Error:", res.status, errorText);
    throw new Error(`Cloudflare D1 API responded with status ${res.status}`);
  }

  const data: D1Response<T> = await res.json();
  if (!data.success || !data.result?.[0]?.success) {
    const errMessages = data.errors?.map((e) => e.message).join(", ") || "Unknown D1 error";
    console.error("[Cloudflare D1] Query error:", errMessages);
    throw new Error(`D1 query failed: ${errMessages}`);
  }

  return data.result[0].results || [];
}

/**
 * Persists an application record into Cloudflare D1.
 */
export async function saveApplicationToD1(record: ApplicationRecord): Promise<boolean> {
  const sql = `
    INSERT INTO careers_applications (
      id, full_name, email, phone, city, state,
      college, degree, current_year, graduation_year,
      track_id, track_title, technical_skills,
      github_url, linkedin_url, portfolio_url,
      resume_original_name, resume_storage_filename, resume_mime_type, resume_size_bytes, resume_stored_path, resume_uploaded_at,
      preferred_start_date, weekly_availability, can_commit_three_months, motivation_statement,
      unpaid_acknowledgement, no_employment_guarantee, privacy_consent,
      status, created_at, updated_at, ip_hash, user_agent
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status,
      updated_at = excluded.updated_at;
  `;

  const params = [
    record.id,
    record.fullName,
    record.email.toLowerCase(),
    record.phone,
    record.city,
    record.state,
    record.college,
    record.degree,
    record.currentYear,
    record.graduationYear || null,
    record.trackId,
    record.trackTitle,
    record.technicalSkills,
    record.githubUrl || null,
    record.linkedinUrl || null,
    record.portfolioUrl || null,
    record.resume.originalName,
    record.resume.storageFilename,
    record.resume.mimeType,
    record.resume.sizeBytes,
    record.resume.storedPath,
    record.resume.uploadedAt,
    record.preferredStartDate,
    record.weeklyAvailability,
    record.canCommitThreeMonths ? 1 : 0,
    record.motivationStatement,
    record.unpaidAcknowledgement ? 1 : 0,
    record.noEmploymentGuaranteeAcknowledgement ? 1 : 0,
    record.privacyConsent ? 1 : 0,
    record.status,
    record.createdAt,
    record.updatedAt,
    record.ipHash || null,
    record.userAgent || null,
  ];

  await executeD1Query(sql, params);
  return true;
}

interface RawD1ApplicationRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  college: string;
  degree: string;
  current_year: string;
  graduation_year?: string;
  track_id: string;
  track_title: string;
  technical_skills: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_original_name: string;
  resume_storage_filename: string;
  resume_mime_type: string;
  resume_size_bytes: number;
  resume_stored_path: string;
  resume_uploaded_at: string;
  preferred_start_date: string;
  weekly_availability: string;
  can_commit_three_months: number;
  motivation_statement: string;
  unpaid_acknowledgement: number;
  no_employment_guarantee: number;
  privacy_consent: number;
  status: string;
  created_at: string;
  updated_at: string;
  ip_hash?: string;
  user_agent?: string;
}

function mapRowToRecord(row: RawD1ApplicationRow): ApplicationRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    state: row.state,
    college: row.college,
    degree: row.degree,
    currentYear: row.current_year,
    graduationYear: row.graduation_year || undefined,
    trackId: row.track_id,
    trackTitle: row.track_title,
    technicalSkills: row.technical_skills,
    githubUrl: row.github_url || undefined,
    linkedinUrl: row.linkedin_url || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    resume: {
      originalName: row.resume_original_name,
      storageFilename: row.resume_storage_filename,
      mimeType: row.resume_mime_type,
      sizeBytes: row.resume_size_bytes,
      storedPath: row.resume_stored_path,
      uploadedAt: row.resume_uploaded_at,
    },
    preferredStartDate: row.preferred_start_date,
    weeklyAvailability: row.weekly_availability,
    canCommitThreeMonths: Boolean(row.can_commit_three_months),
    motivationStatement: row.motivation_statement,
    unpaidAcknowledgement: Boolean(row.unpaid_acknowledgement),
    noEmploymentGuaranteeAcknowledgement: Boolean(row.no_employment_guarantee),
    privacyConsent: Boolean(row.privacy_consent),
    status: (row.status as ApplicationRecord["status"]) || "New",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ipHash: row.ip_hash || undefined,
    userAgent: row.user_agent || undefined,
  };
}

/**
 * Searches Cloudflare D1 for recent duplicate applications.
 */
export async function findRecentApplicationInD1(
  email: string,
  trackId: string,
  withinDays: number = 30
): Promise<ApplicationRecord | null> {
  const cutoffIso = new Date(Date.now() - withinDays * 24 * 60 * 60 * 1000).toISOString();
  const sql = `
    SELECT * FROM careers_applications
    WHERE LOWER(email) = LOWER(?)
      AND track_id = ?
      AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  const rows = await executeD1Query<RawD1ApplicationRow>(sql, [
    email.trim().toLowerCase(),
    trackId,
    cutoffIso,
  ]);

  if (!rows || rows.length === 0) return null;
  return mapRowToRecord(rows[0]);
}

/**
 * Fetches all applications from Cloudflare D1.
 */
export async function getAllApplicationsFromD1(): Promise<ApplicationRecord[]> {
  const sql = `SELECT * FROM careers_applications ORDER BY created_at DESC;`;
  const rows = await executeD1Query<RawD1ApplicationRow>(sql);
  return rows.map(mapRowToRecord);
}
