import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — AI Engineer & Software Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 260,
            height: 260,
            background: "linear-gradient(90deg, #4A080A 0%, #E00000 30%, #7A090C 75%, #4A080A 100%)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 80, color: "#E00000", fontSize: 150, letterSpacing: 26, fontWeight: 400 }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, color: "#fff", fontSize: 92, fontWeight: 700, letterSpacing: 4 }}>
          {profile.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 90, color: "#B8B8B8", fontSize: 30, letterSpacing: 8 }}>
          AI ENGINEER / SOFTWARE DEVELOPER / AI·ML BUILDER
        </div>
      </div>
    ),
    size,
  );
}
