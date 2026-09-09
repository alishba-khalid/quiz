import type { NextRequest } from "next/server";
import {
  GUEST_DAILY_LIMIT,
  GUEST_SITEWIDE_DAILY_LIMIT,
  TRANSCRIPT_FETCH_IP_LIMIT,
} from "@/lib/constants";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

// In-memory rate limiting store (works across requests in a serverless instance)
const ipStore = new Map<string, RateLimitRecord>();
let sitewideCount = 0;
let sitewideResetAt = Date.now() + 24 * 60 * 60 * 1000;

function cleanup() {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    if (record.resetAt <= now) {
      ipStore.delete(ip);
    }
  }
  if (sitewideResetAt <= now) {
    sitewideCount = 0;
    sitewideResetAt = now + 24 * 60 * 60 * 1000;
  }
}

export function checkGuestRateLimit(ip: string): { allowed: boolean; reason?: string } {
  cleanup();
  const now = Date.now();

  // Check sitewide capacity
  if (sitewideCount >= GUEST_SITEWIDE_DAILY_LIMIT) {
    return {
      allowed: false,
      reason: "Daily guest generation capacity reached. Please create a free account to continue generating quizzes.",
    };
  }

  // Check per-IP limit
  const record = ipStore.get(ip);
  if (record && record.resetAt > now) {
    if (record.count >= GUEST_DAILY_LIMIT) {
      return {
        allowed: false,
        reason: `You have reached the guest limit (${GUEST_DAILY_LIMIT} free generations per day). Create a free account for 5 monthly generations!`,
      };
    }
  }

  return { allowed: true };
}

export function recordGuestUsage(ip: string) {
  cleanup();
  const now = Date.now();
  sitewideCount += 1;

  const record = ipStore.get(ip);
  if (record && record.resetAt > now) {
    record.count += 1;
  } else {
    ipStore.set(ip, {
      count: 1,
      resetAt: now + 24 * 60 * 60 * 1000,
    });
  }
}

// Separate per-IP limiter for the transcript-fetch endpoint itself, applied to
// every caller (guest or logged in) since each call costs a paid Supadata request
// regardless of account status. Prevents the endpoint from being hit in an
// unlimited loop independent of the guest/generation limits above.
const transcriptStore = new Map<string, RateLimitRecord>();

export function checkTranscriptFetchLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  for (const [key, record] of transcriptStore.entries()) {
    if (record.resetAt <= now) transcriptStore.delete(key);
  }

  const record = transcriptStore.get(ip);
  if (record && record.resetAt > now && record.count >= TRANSCRIPT_FETCH_IP_LIMIT) {
    return {
      allowed: false,
      reason: "Too many video lookups from this connection. Please wait a bit before trying another video.",
    };
  }

  return { allowed: true };
}

export function recordTranscriptFetch(ip: string) {
  const now = Date.now();
  const record = transcriptStore.get(ip);
  if (record && record.resetAt > now) {
    record.count += 1;
  } else {
    transcriptStore.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }
}
