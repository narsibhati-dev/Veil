import type { ProofStep } from "@/hooks/useWithdraw";

interface ProofStatusProps {
  step: ProofStep;
}

const STEPS = [
  "Building witness",
  "Generating Groth16 proof",
  "Submitting transaction",
];

export default function ProofStatus({ step }: ProofStatusProps) {
  if (step === "idle") return null;

  const isDone       = step === "done";
  const isGenerating = step === "generating";

  return (
    <div className="rounded-xl border border-[#6366f1]/20 bg-[#6366f1]/5 p-4">
      <p
        className="text-xs text-[#6366f1] uppercase tracking-widest font-medium mb-4"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        ZK Proof Pipeline
      </p>

      <div className="space-y-3">
        {STEPS.map((label, i) => {
          // When done: all three complete (emerald). When generating: first two pulse (indigo). Third pending.
          const isComplete = isDone;
          const isPulsing  = isGenerating && i < 2;
          const isPending  = isGenerating && i === 2;

          return (
            <div key={i} className="flex items-center gap-3">
              {/* Step indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                  isComplete
                    ? "bg-[#10b981] border-0"
                    : isPulsing
                    ? "border-2 border-[#6366f1] bg-[#6366f1]/10 animate-pulse"
                    : "border border-[#2d2d5e] bg-[#161626] text-[#334155]"
                }`}
              >
                {isComplete ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className={isPulsing ? "text-[#6366f1]" : "text-[#334155]"}>
                    {i + 1}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm transition-colors duration-300 flex-1 ${
                  isComplete
                    ? "text-[#10b981]"
                    : isPulsing
                    ? "text-[#94a3b8]"
                    : "text-[#334155]"
                }`}
              >
                {label}
              </span>

              {isPulsing && (
                <span className="text-xs text-[#6366f1]/50 animate-pulse tracking-widest">•••</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
