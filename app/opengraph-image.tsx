import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090d 0%, #101018 60%, #1a1333 100%)",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            color: "#34d399",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#34d399",
            }}
          />
          {site.availability}
        </div>
        <div style={{ marginTop: 28, fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ marginTop: 16, fontSize: 40, color: "#a5a3f5" }}>
          {site.role} · React · TypeScript · Node.js · AWS
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#8b8b96" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
