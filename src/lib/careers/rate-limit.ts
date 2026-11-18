import crypto from "crypto";

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS = 4; // Max 4 submissions per window per IP

// Periodically clean up old entries
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.firstAttempt > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
}, 15 * 60 * 1000).unref?.();

export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || "flowfoundry-careers-salt";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}

export function checkRateLimit(ipHash: string): { allowed: boolean; retryAfterMinutes?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ipHash);

  if (!entry) {
    rateLimitMap.set(ipHash, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (now - entry.firstAttempt > WINDOW_MS) {
    // Window expired, reset
    rateLimitMap.set(ipHash, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const remainingMs = WINDOW_MS - (now - entry.firstAttempt);
    const retryAfterMinutes = Math.ceil(remainingMs / (60 * 1000));
    return { allowed: false, retryAfterMinutes };
  }

  entry.count += 1;
  return { allowed: true };
}
