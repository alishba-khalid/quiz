import type { NextRequest } from "next/server";
import { TRANSCRIPT_FETCH_IP_LIMIT } from "@/lib/constants";

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

// Per-IP limiter for the transcript-fetch endpoint, since each call costs a paid
// Supadata request. Prevents the endpoint from being hit in an unlimited loop
// independent of the monthly generation limits.
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

// Per-IP limiter for account creation, so one connection can't mass-create accounts.
// In-memory and per-instance: a speed bump, not a hard guarantee.
const SIGNUPS_PER_IP_PER_HOUR = 5;
const signupStore = new Map<string, RateLimitRecord>();

export function checkSignupLimit(ip: string): boolean {
  const now = Date.now();
  for (const [key, record] of signupStore.entries()) {
    if (record.resetAt <= now) signupStore.delete(key);
  }
  const record = signupStore.get(ip);
  return !(record && record.count >= SIGNUPS_PER_IP_PER_HOUR);
}

export function recordSignup(ip: string) {
  const now = Date.now();
  const record = signupStore.get(ip);
  if (record && record.resetAt > now) {
    record.count += 1;
  } else {
    signupStore.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }
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
