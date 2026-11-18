import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { StoredResumeRef } from "./types";
import { Readable } from "stream";

function getR2Config() {
  const accountId =
    process.env.CLOUDFLARE_R2_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName =
    process.env.CLOUDFLARE_R2_BUCKET_NAME || "flowfoundry-resumes";

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
  };
}

export function isR2Configured(): boolean {
  return getR2Config() !== null;
}

let cachedClient: S3Client | null = null;

function getR2Client(): { client: S3Client; bucketName: string } | null {
  const config = getR2Config();
  if (!config) return null;

  if (!cachedClient) {
    cachedClient = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return { client: cachedClient, bucketName: config.bucketName };
}

/**
 * Uploads an applicant resume PDF to Cloudflare R2 object storage.
 * Enforces private object storage (no public URL is generated or exposed).
 */
export async function uploadResumeToR2(
  buffer: Buffer,
  storageFilename: string,
  originalName: string,
  mimeType: string = "application/pdf"
): Promise<StoredResumeRef | null> {
  const r2 = getR2Client();
  if (!r2) {
    console.warn(
      "[Cloudflare R2] R2 credentials not detected. Falling back to local private storage."
    );
    return null;
  }

  const key = `resumes/${storageFilename}`;
  const now = new Date().toISOString();

  try {
    const command = new PutObjectCommand({
      Bucket: r2.bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      Metadata: {
        "original-name": encodeURIComponent(originalName.slice(0, 100)),
        "uploaded-at": now,
      },
    });

    await r2.client.send(command);

    return {
      originalName: originalName.slice(0, 100),
      storageFilename,
      mimeType,
      sizeBytes: buffer.length,
      // Private R2 object URI - not accessible publicly over HTTP
      storedPath: `r2://${r2.bucketName}/${key}`,
      uploadedAt: now,
    };
  } catch (err) {
    console.error("[Cloudflare R2] Failed to upload resume to R2:", err);
    throw err;
  }
}

/**
 * Retrieves resume bytes from Cloudflare R2 (for email attachments or recruiter review).
 */
export async function getResumeFromR2(storageFilename: string): Promise<Buffer | null> {
  const r2 = getR2Client();
  if (!r2) return null;

  const key = `resumes/${storageFilename}`;
  try {
    const command = new GetObjectCommand({
      Bucket: r2.bucketName,
      Key: key,
    });

    const response = await r2.client.send(command);
    if (!response.Body) return null;

    if (response.Body instanceof Readable) {
      const chunks: Buffer[] = [];
      for await (const chunk of response.Body) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    } else {
      const byteArray = await response.Body.transformToByteArray();
      return Buffer.from(byteArray);
    }
  } catch (err) {
    console.error("[Cloudflare R2] Error fetching resume from R2:", err);
    return null;
  }
}
