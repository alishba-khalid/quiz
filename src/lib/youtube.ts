import { MAX_TRANSCRIPT_CHARS } from "@/lib/constants";

export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  url: string;
}

export interface YouTubeTranscriptResult {
  videoInfo: YouTubeVideoInfo;
  transcript: string;
  wordCount: number;
  durationSeconds?: number;
}

export class YouTubeError extends Error {
  code: "INVALID_URL" | "PRIVATE_OR_UNAVAILABLE" | "NO_CAPTIONS" | "TOO_LONG" | "FETCH_ERROR";
  constructor(message: string, code: "INVALID_URL" | "PRIVATE_OR_UNAVAILABLE" | "NO_CAPTIONS" | "TOO_LONG" | "FETCH_ERROR") {
    super(message);
    this.name = "YouTubeError";
    this.code = code;
  }
}

/**
 * Extracts the 11-character video ID from any YouTube URL format.
 */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If directly an 11-character alphanumeric string (plus - and _)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard URL patterns:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  // https://www.youtube.com/v/VIDEO_ID
  // https://www.youtube.com/shorts/VIDEO_ID
  // https://m.youtube.com/watch?v=VIDEO_ID
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i,
    /^[a-zA-Z0-9_-]{11}$/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Fetches basic video metadata (title, author, thumbnail) via oEmbed.
 */
export async function fetchYouTubeMetadata(videoId: string): Promise<YouTubeVideoInfo> {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;

  try {
    const res = await fetch(oEmbedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (res.status === 404 || res.status === 401 || res.status === 403) {
      throw new YouTubeError(
        "This video is private, age-restricted, or unavailable. Please use a public YouTube video.",
        "PRIVATE_OR_UNAVAILABLE"
      );
    }

    if (!res.ok) {
      // Fallback metadata if oembed is transiently unavailable
      return {
        videoId,
        title: `YouTube Video (${videoId})`,
        author: "YouTube",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: videoUrl,
      };
    }

    const data = await res.json();
    return {
      videoId,
      title: data.title || `YouTube Video (${videoId})`,
      author: data.author_name || "YouTube Creator",
      thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      url: videoUrl,
    };
  } catch (err: any) {
    if (err instanceof YouTubeError) throw err;
    return {
      videoId,
      title: `YouTube Video (${videoId})`,
      author: "YouTube",
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      url: videoUrl,
    };
  }
}

/**
 * Decodes HTML entities commonly found in YouTube subtitles.
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parses XML timedtext into clean concatenated plain text.
 */
function parseXmlTranscript(xml: string): string {
  const textMatches = xml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi);
  const lines: string[] = [];
  for (const match of textMatches) {
    if (match[1]) {
      const decoded = decodeHtmlEntities(match[1]);
      if (decoded) lines.push(decoded);
    }
  }
  return lines.join(" ").replace(/\s+/g, " ").trim();
}

/**
 * Attempts to fetch captions using the YouTube Innertube ANDROID player context,
 * which avoids datacenter IP blocks on timedtext endpoints.
 */
async function fetchCaptionsViaInnertube(videoId: string): Promise<string | null> {
  try {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip",
        "X-YouTube-Client-Name": "3",
        "X-YouTube-Client-Version": "19.09.37",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "19.09.37",
            hl: "en",
            gl: "US",
          },
        },
        videoId,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();

    // Check playability status
    const status = data?.playabilityStatus?.status;
    if (status === "UNPLAYABLE" || status === "LOGIN_REQUIRED") {
      return null;
    }

    const captionTracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!captionTracks || !Array.isArray(captionTracks) || captionTracks.length === 0) {
      return null;
    }

    // Prioritize English or first available track
    const selectedTrack =
      captionTracks.find((t: any) => t.languageCode?.startsWith("en")) ||
      captionTracks.find((t: any) => t.kind !== "asr") ||
      captionTracks[0];

    if (!selectedTrack?.baseUrl) return null;

    const trackRes = await fetch(selectedTrack.baseUrl, {
      headers: {
        "User-Agent": "com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip",
      },
    });

    if (!trackRes.ok) return null;
    const xml = await trackRes.text();
    const transcript = parseXmlTranscript(xml);
    return transcript.length > 20 ? transcript : null;
  } catch {
    return null;
  }
}

/**
 * Attempts to fetch transcript from YouTube watch page player response.
 */
async function fetchCaptionsViaWatchPage(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract ytInitialPlayerResponse
    const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
    if (!playerResponseMatch) return null;

    const playerResponse = JSON.parse(playerResponseMatch[1]);
    const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!captionTracks || !Array.isArray(captionTracks) || captionTracks.length === 0) {
      return null;
    }

    const selectedTrack =
      captionTracks.find((t: any) => t.languageCode?.startsWith("en")) ||
      captionTracks[0];

    if (!selectedTrack?.baseUrl) return null;

    const trackRes = await fetch(selectedTrack.baseUrl);
    if (!trackRes.ok) return null;
    const xml = await trackRes.text();
    const transcript = parseXmlTranscript(xml);
    return transcript.length > 20 ? transcript : null;
  } catch {
    return null;
  }
}

/**
 * Third-party / open transcript proxy fallback.
 */
async function fetchCaptionsViaProxy(videoId: string): Promise<string | null> {
  try {
    const proxyUrl = `https://subtitles-for-youtube.vercel.app/api/transcript?videoId=${videoId}`;
    const res = await fetch(proxyUrl, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => item.text || "").join(" ").replace(/\s+/g, " ").trim();
    }
    if (typeof data.transcript === "string" && data.transcript.length > 20) {
      return data.transcript.trim();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Main function: Fetches video info and transcript.
 * Returns clear, categorized errors when captions are missing, video is too long, or URL is invalid.
 */
export async function getYouTubeVideoTranscript(urlOrId: string): Promise<YouTubeTranscriptResult> {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) {
    throw new YouTubeError(
      "Please enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)",
      "INVALID_URL"
    );
  }

  // 1. Fetch metadata
  const videoInfo = await fetchYouTubeMetadata(videoId);

  // 2. Fetch transcript via multi-strategy pipeline
  let transcript = await fetchCaptionsViaInnertube(videoId);

  if (!transcript) {
    transcript = await fetchCaptionsViaWatchPage(videoId);
  }

  if (!transcript) {
    transcript = await fetchCaptionsViaProxy(videoId);
  }

  // 3. Error if no captions
  if (!transcript || transcript.trim().length === 0) {
    throw new YouTubeError(
      "No captions or transcript could be found for this video. Please use a video with closed captions or subtitles enabled.",
      "NO_CAPTIONS"
    );
  }

  // 4. Length check (30,000 characters ~ 30 minutes)
  if (transcript.length > MAX_TRANSCRIPT_CHARS) {
    throw new YouTubeError(
      `This video is too long (${Math.round(transcript.length / 1000)}k characters, limit is ${Math.round(MAX_TRANSCRIPT_CHARS / 1000)}k chars / ~30 mins). Please choose a shorter video under 30 minutes or paste the relevant lecture section notes.`,
      "TOO_LONG"
    );
  }

  const words = transcript.split(/\s+/).filter(Boolean);

  return {
    videoInfo,
    transcript,
    wordCount: words.length,
  };
}
