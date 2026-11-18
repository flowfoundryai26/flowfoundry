import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ApplicationRecord, StoredResumeRef } from "./types";
import { uploadResumeToR2, isR2Configured } from "./cloudflare-r2";
import {
  saveApplicationToD1,
  findRecentApplicationInD1,
  isD1Configured,
  getAllApplicationsFromD1,
} from "./cloudflare-d1";

const STORAGE_ROOT = path.join(process.cwd(), "storage", "resumes");
const DATA_ROOT = path.join(process.cwd(), "data", "applications");
const RECORDS_ROOT = path.join(DATA_ROOT, "records");
const ALL_APPLICATIONS_FILE = path.join(DATA_ROOT, "applications.json");

// Ensure required private directories exist
async function ensureDirectories() {
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  await fs.mkdir(RECORDS_ROOT, { recursive: true });
}

export function generateApplicationId(): string {
  const d = new Date();
  const yearMonth = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `FFA-${yearMonth}-${randomSuffix}`;
}

/**
 * Validates that the provided buffer is a genuine PDF file
 * by checking both MIME type and the standard "%PDF-" header signature.
 */
export function validatePdfBytes(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 5) return false;
  // %PDF- in ASCII is [0x25, 0x50, 0x44, 0x46, 0x2D]
  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

/**
 * Stores a resume file.
 * Prioritizes Cloudflare R2 object storage (private bucket).
 * If R2 is not configured, saves to local private storage (outside public directory).
 * Enforces a strict 5 MB limit and PDF magic header validation.
 */
export async function saveResumeFile(
  buffer: Buffer,
  originalName: string,
  declaredMimeType: string
): Promise<StoredResumeRef> {
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  if (buffer.length > MAX_SIZE) {
    throw new Error("Resume exceeds maximum allowed size of 5 MB.");
  }

  if (!validatePdfBytes(buffer)) {
    throw new Error("Invalid file format. Resume must be a valid PDF document.");
  }

  // Create unique, non-guessable filename
  const safeRandom = crypto.randomUUID().replace(/-/g, "");
  const storageFilename = `resume_${Date.now()}_${safeRandom}.pdf`;

  // 1. Try Cloudflare R2 if configured
  if (isR2Configured()) {
    try {
      const r2Ref = await uploadResumeToR2(
        buffer,
        storageFilename,
        originalName,
        "application/pdf"
      );
      if (r2Ref) {
        console.log(`[Resume Storage] Successfully uploaded to Cloudflare R2: ${r2Ref.storedPath}`);
        return r2Ref;
      }
    } catch (r2Err) {
      console.error("[Resume Storage] Cloudflare R2 upload error, falling back to local storage:", r2Err);
    }
  }

  // 2. Local private storage fallback (never in public/)
  await ensureDirectories();
  const fullDiskPath = path.join(STORAGE_ROOT, storageFilename);
  await fs.writeFile(fullDiskPath, buffer, { mode: 0o600 });

  return {
    originalName: path.basename(originalName).slice(0, 100),
    storageFilename,
    mimeType: "application/pdf",
    sizeBytes: buffer.length,
    storedPath: fullDiskPath,
    uploadedAt: new Date().toISOString(),
  };
}

/**
 * Reads all existing applications from storage (Cloudflare D1 or local file).
 */
export async function getAllApplications(): Promise<ApplicationRecord[]> {
  if (isD1Configured()) {
    try {
      return await getAllApplicationsFromD1();
    } catch (d1Err) {
      console.warn("[Database] Cloudflare D1 query failed, falling back to local file:", d1Err);
    }
  }

  await ensureDirectories();
  try {
    const raw = await fs.readFile(ALL_APPLICATIONS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    console.error("Error reading applications file:", err);
    return [];
  }
}

/**
 * Checks for recent duplicate submissions with the same email and track.
 * Uses Cloudflare D1 if configured; otherwise local storage.
 */
export async function findRecentApplicationByEmail(
  email: string,
  trackId: string,
  withinDays: number = 30
): Promise<ApplicationRecord | null> {
  if (isD1Configured()) {
    try {
      return await findRecentApplicationInD1(email, trackId, withinDays);
    } catch (d1Err) {
      console.warn("[Database] Cloudflare D1 lookup failed, checking local storage:", d1Err);
    }
  }

  const apps = await getAllApplications();
  const normalizedEmail = email.trim().toLowerCase();
  const cutoffTime = Date.now() - withinDays * 24 * 60 * 60 * 1000;

  const found = apps.find((app) => {
    if (
      app.email.toLowerCase() === normalizedEmail &&
      app.trackId === trackId
    ) {
      const createdTime = new Date(app.createdAt).getTime();
      return createdTime >= cutoffTime;
    }
    return false;
  });

  return found || null;
}

/**
 * Persists an application record securely.
 * Saves to Cloudflare D1 database when configured, and mirrors to local private backup.
 */
export async function saveApplicationRecord(
  record: ApplicationRecord
): Promise<void> {
  // 1. Save to Cloudflare D1 if configured
  if (isD1Configured()) {
    try {
      await saveApplicationToD1(record);
      console.log(`[Database] Successfully saved application ${record.id} to Cloudflare D1.`);
    } catch (d1Err) {
      console.error("[Database] Cloudflare D1 persistence error:", d1Err);
    }
  }

  // 2. Always persist to local private data storage as well
  await ensureDirectories();
  const individualFilePath = path.join(RECORDS_ROOT, `${record.id}.json`);
  await fs.writeFile(
    individualFilePath,
    JSON.stringify(record, null, 2),
    "utf-8"
  );

  try {
    const currentList = await getAllApplications();
    const existingIdx = currentList.findIndex((item) => item.id === record.id);
    if (existingIdx >= 0) {
      currentList[existingIdx] = record;
    } else {
      currentList.unshift(record);
    }

    const tempFile = `${ALL_APPLICATIONS_FILE}.tmp.${Date.now()}`;
    await fs.writeFile(tempFile, JSON.stringify(currentList, null, 2), "utf-8");
    await fs.rename(tempFile, ALL_APPLICATIONS_FILE);
  } catch (syncErr) {
    console.error("[Database] Error updating local aggregate storage:", syncErr);
  }
}
