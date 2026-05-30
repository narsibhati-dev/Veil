"use client";

import type { ProofData } from "@/types";

interface ProofBoxProps {
  proof: ProofData | null;
}

type ProofKey = "a" | "b" | "c";

function ProofArray({
  label,
  value,
}: {
  label: ProofKey;
  value: string[] | string[][];
}) {
  const json = JSON.stringify(value, null, 2);

  return (
    <div>
      <p
        className="text-xs text-[#475569] uppercase tracking-widest mb-1.5"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        proof.{label}
      </p>
      <div className="rounded-xl bg-[#161626] border border-[#1e1e3a] p-3 overflow-x-auto">
        <code
          className="text-xs leading-relaxed block"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {json.split("\n").map((line, i) => {
            // Numbers → indigo, structural tokens → dimmed
            const hasNum = /^\s*"?-?\d/.test(line);
            return (
              <span
                key={i}
                className={hasNum ? "text-[#818cf8]" : "text-[#334155]"}
              >
                {line}
                {"\n"}
              </span>
            );
          })}
        </code>
      </div>
    </div>
  );
}

export default function ProofBox({ proof }: ProofBoxProps) {
  if (!proof) {
    return (
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#161626] border border-[#1e1e3a] flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#2d2d5e]"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-sm text-[#334155] font-medium mb-1">
          No proof generated yet
        </p>
        <p className="text-xs text-[#1e1e3a]">
          Complete a withdrawal to see the zero-knowledge proof
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold text-[#94a3b8]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Groth16 Proof
        </h3>
        <span className="px-2.5 py-1 text-xs bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] rounded-full font-medium">
          Verified on-chain ✓
        </span>
      </div>
      {(["a", "b", "c"] as ProofKey[]).map((key) => (
        <ProofArray key={key} label={key} value={proof.proof[key]} />
      ))}
    </div>
  );
}
