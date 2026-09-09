export const FREE_TOPIC_LIMIT = 5;
export const FREE_SOURCE_LIMIT = 2;
export const FREE_LIMIT = 5; // Backward-compatible alias for total monthly generations
export const GUEST_DAILY_LIMIT = 2; // Max 2 generations per guest IP per 24 hours
export const GUEST_SITEWIDE_DAILY_LIMIT = 100; // Sitewide safety cap for guest generations per day
export const TRANSCRIPT_FETCH_IP_LIMIT = 10; // Max transcript-fetch calls per IP per hour (guards the paid Supadata API from unlimited-loop abuse)
export const MAX_TRANSCRIPT_CHARS = 30_000; // ~30 minutes of speech at average speaking rate
export const SUPPORT_EMAIL = "support@quizkraft.tech";
