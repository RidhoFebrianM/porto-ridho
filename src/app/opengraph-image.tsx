import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.roles[0]}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
          backgroundImage: "radial-gradient(#262626 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700 }}>{`${profile.nickname}.`}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 36, color: "#a3a3a3", marginTop: 12 }}>{profile.roles.join(" / ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
