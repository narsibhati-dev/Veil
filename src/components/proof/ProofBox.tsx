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
        className="text-xs text-[#5e8a83] uppercase tracking-widest mb-1.5"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        proof.{label}
      </p>
      <div className="rounded-xl bg-[#f7fbf9]  p-3 overflow-x-auto">
        <code
          className="text-xs leading-relaxed block"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {json.split("\n").map((line, i) => {
            // Numbers → indigo, structural tokens → dimmed
            const hasNum = /^\s*"?-?\d/.test(line);
            return (
              <span
                key={i}
                className={hasNum ? "text-[#5e8a83]" : "text-[#8db5ae]"}
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
      <div className="rounded-2xl  bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#f7fbf9]  flex items-center justify-center mx-auto mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#8db5ae]"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-sm text-[#8db5ae] font-medium mb-1">
          No proof generated yet
        </p>
        <p className="text-xs text-white/[0.18]">
          Complete a withdrawal to see the zero-knowledge proof
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold text-[#8db5ae]"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Groth16 Proof
        </h3>
        <span className="px-2.5 py-1 text-xs bg-[#3ab96b]/10 border border-[#3ab96b]/25 text-[#3ab96b] rounded-full font-medium">
          Verified on-chain ✓
        </span>
      </div>
      {(["a", "b", "c"] as ProofKey[]).map((key) => (
        <ProofArray key={key} label={key} value={proof.proof[key]} />
      ))}
    </div>
  );
}
