import { type NextRequest, NextResponse } from "next/server";
import { getYouTubeVideoTranscript, YouTubeError } from "@/lib/youtube";
import { checkTranscriptFetchLimit, recordTranscriptFetch, getClientIp } from "@/lib/rate-limiter";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const limit = checkTranscriptFetchLimit(clientIp);
    if (!limit.allowed) {
      return NextResponse.json({ error: limit.reason }, { status: 429 });
    }

    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a YouTube video URL." },
        { status: 400 }
      );
    }

    recordTranscriptFetch(clientIp);
    const result = await getYouTubeVideoTranscript(url);
    return NextResponse.json(result);
  } catch (error: any) {
    if (error instanceof YouTubeError) {
      const statusMap: Record<string, number> = {
        INVALID_URL: 400,
        PRIVATE_OR_UNAVAILABLE: 404,
        NO_CAPTIONS: 422,
        TOO_LONG: 413,
        FETCH_ERROR: 502,
      };
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: statusMap[error.code] || 400 }
      );
    }

    console.error("YouTube transcript error:", error);
    return NextResponse.json(
      { error: "Failed to extract video transcript. Please check the URL and try again." },
      { status: 500 }
    );
  }
}
