"use client";

import { useId } from "react";

interface LogoIconProps {
  size?: number;
}

export default function LogoIcon({ size = 40 }: LogoIconProps) {
  const uid = useId().replace(/:/g, "");
  const gid = `lg_${uid}`;
  const sid = `ls_${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Veil logo"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eab94" />
          <stop offset="1" stopColor="#3a7363" />
        </linearGradient>
        <linearGradient id={sid} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3a7363" />
          <stop offset="1" stopColor="#2a5549" />
        </linearGradient>
      </defs>

      {/* Squircle background */}
      <rect width="40" height="40" rx="11" fill={`url(#${gid})`} />

      {/* Top-edge gloss */}
      <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="1" />

      {/* Lock shackle */}
      <path
        d="M14.5 22V17.2C14.5 13.8 16.97 11 20 11C23.03 11 25.5 13.8 25.5 17.2V22"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.95"
      />

      {/* Lock body */}
      <rect x="10.5" y="21" width="19" height="12.5" rx="4" fill="white" fillOpacity="0.95" />

      {/* Keyhole — circle */}
      <circle cx="20" cy="26.5" r="2.8" fill={`url(#${sid})`} />

      {/* Keyhole — slot */}
      <rect x="18.7" y="27.8" width="2.6" height="3.2" rx="1.3" fill={`url(#${sid})`} />
    </svg>
  );
}
