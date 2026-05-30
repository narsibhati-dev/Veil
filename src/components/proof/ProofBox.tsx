"use client";

import type { ProofData } from "@/types";

interface ProofBoxProps {
  proof: ProofData | null;
}

export default function ProofBox({ proof }: ProofBoxProps) {
  if (!proof) {
    return (
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-6 text-center">
        <p className="text-[#475569] text-sm">No proof generated yet</p>
        <p className="text-[#334155] text-xs mt-1">
          Complete a withdrawal to see the Groth16 proof
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#475569] uppercase tracking-wider font-medium">
          Groth16 Proof
        </span>
        <span className="px-2 py-0.5 text-xs bg-[#00d4a0]/10 border border-[#00d4a0]/30 text-[#00d4a0] rounded-full">
          Verified
        </span>
      </div>
      {(["a", "b", "c"] as const).map((key) => (
        <div key={key}>
          <p className="text-xs text-[#475569] mb-1 uppercase font-mono">
            {key}
          </p>
          <pre className="text-xs text-[#94a3b8] font-mono bg-[#0f1629] rounded-lg p-3 overflow-x-auto border border-[#1e293b] whitespace-pre-wrap break-all">
            {JSON.stringify(proof.proof[key], null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
