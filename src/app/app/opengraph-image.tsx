import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Veil App: Private SOL Transfers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#111111",
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
        {/* Glow */}
        <div style={{
          position: "absolute", top: -80, right: 80,
          width: 480, height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(89,159,138,0.22) 0%, transparent 65%)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5eab94" /><stop offset="1" stopColor="#3a7363" />
              </linearGradient>
              <linearGradient id="s2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3a7363" /><stop offset="1" stopColor="#2a5549" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="11" fill="url(#g2)" />
            <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M14.5 22V17.2C14.5 13.8 16.97 11 20 11C23.03 11 25.5 13.8 25.5 17.2V22" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <rect x="10.5" y="21" width="19" height="12.5" rx="4" fill="white" fillOpacity="0.95" />
            <circle cx="20" cy="26.5" r="2.8" fill="url(#s2)" />
            <rect x="18.7" y="27.8" width="2.6" height="3.2" rx="1.3" fill="url(#s2)" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#e8f5f2", letterSpacing: "-0.5px" }}>
            Veil
          </span>
          <span style={{
            fontSize: 13, fontWeight: 500, color: "#599F8A",
            background: "rgba(89,159,138,0.1)",
            border: "1px solid rgba(89,159,138,0.3)",
            padding: "4px 12px", borderRadius: 999,
          }}>
            Privacy App
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 60, fontWeight: 800, color: "#e8f5f2",
          lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 24, maxWidth: 720,
        }}>
          Your private SOL wallet on Solana.
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 22, color: "#8db5ae", maxWidth: 580, lineHeight: 1.5, marginBottom: 52 }}>
          Deposit, shield, and withdraw SOL with zero on-chain links. ZK proofs generated 100% in-browser.
        </div>

        {/* Steps */}
        <div style={{ display: "flex", gap: 12 }}>
          {[["01", "Shield SOL"], ["02", "Generate Proof"], ["03", "Withdraw Privately"]].map(([n, l]) => (
            <div key={n} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 14, color: "#8db5ae",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 18px", borderRadius: 10,
            }}>
              <span style={{ color: "#599F8A", fontWeight: 700 }}>{n}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
