import type { ProofStep } from "@/hooks/useWithdraw";

interface ProofStatusProps {
  step: ProofStep;
}

export default function ProofStatus({ step }: ProofStatusProps) {
  if (step === "idle") return null;

  const isGenerating = step === "generating";
  const isDone = step === "done";

  return (
    <div className="rounded-lg border border-[#1e293b] bg-[#0f1629] p-4">
      <p className="text-xs text-[#475569] uppercase tracking-wider font-medium mb-3">
        ZK Proof Pipeline
      </p>
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
            isDone
              ? "bg-[#00d4a0] text-[#080b14]"
              : "bg-[#00d4a0]/20 border border-[#00d4a0] animate-pulse"
          }`}
        >
          {isDone ? "✓" : "…"}
        </div>
        <span className="text-sm text-[#94a3b8]">
          {isGenerating
            ? "Generating Groth16 proof (CPU-intensive)…"
            : "Proof verified ✓"}
        </span>
      </div>
    </div>
  );
}
