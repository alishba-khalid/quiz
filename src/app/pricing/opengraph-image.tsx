import { ImageResponse } from "next/og";

export const alt = "Simple & Affordable Pricing for Teachers | QuizKraft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F0EFE5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#0A1628",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "white",
            }}
          >
            ✓
          </div>
          <span style={{ fontSize: "38px", fontWeight: 700, color: "#0A1628" }}>QuizKraft</span>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#0A1628",
            lineHeight: 1.15,
            marginBottom: "24px",
            maxWidth: "950px",
          }}
        >
          Simple, Transparent Pricing
        </div>

        <div style={{ fontSize: "26px", color: "#5F6C7B", marginBottom: "48px" }}>
          5 free generations monthly. Pro for unlimited quizzes & clean PDF exports.
        </div>

        <div
          style={{
            background: "#3DA9FC",
            color: "white",
            padding: "14px 36px",
            borderRadius: "14px",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          Free to start · quizkraft.tech/pricing
        </div>
      </div>
    ),
    { ...size }
  );
}
