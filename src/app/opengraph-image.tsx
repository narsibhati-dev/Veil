import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Veil: Private Payments on Solana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background teal blob */}
        <div style={{
          position: "absolute", top: -160, right: -160,
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(89,159,138,0.18) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: 600,
          width: 360, height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(89,159,138,0.10) 0%, transparent 70%)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5eab94" /><stop offset="1" stopColor="#3a7363" />
              </linearGradient>
              <linearGradient id="s" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3a7363" /><stop offset="1" stopColor="#2a5549" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="11" fill="url(#g)" />
            <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M14.5 22V17.2C14.5 13.8 16.97 11 20 11C23.03 11 25.5 13.8 25.5 17.2V22" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <rect x="10.5" y="21" width="19" height="12.5" rx="4" fill="white" fillOpacity="0.95" />
            <circle cx="20" cy="26.5" r="2.8" fill="url(#s)" />
            <rect x="18.7" y="27.8" width="2.6" height="3.2" rx="1.3" fill="url(#s)" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#0f1a16", letterSpacing: "-0.5px" }}>
            Veil
          </span>
          <span style={{
            fontSize: 13, fontWeight: 500, color: "#599F8A",
            background: "rgba(89,159,138,0.1)",
            border: "1px solid rgba(89,159,138,0.25)",
            padding: "4px 12px", borderRadius: 999,
          }}>
            Devnet
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 64, fontWeight: 800, color: "#0f1a16",
          lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 24, maxWidth: 780,
        }}>
          Shield every transfer.{"\n"}Leave zero trace.
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 22, color: "#5e8a83", maxWidth: 620, lineHeight: 1.5, marginBottom: 52 }}>
          Zero-knowledge private SOL transfers on Solana. Groth16 proofs generated entirely in your browser.
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: 10 }}>
          {["Groth16 ZK", "Poseidon Hash", "BN254 Curve", "100% In-Browser"].map((t) => (
            <div key={t} style={{
              fontSize: 13, color: "#5e8a83", fontWeight: 600,
              background: "#f7fbf9",
              border: "1px solid rgba(89,159,138,0.2)",
              padding: "6px 14px", borderRadius: 8,
            }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
