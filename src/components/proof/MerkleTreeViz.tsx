"use client";

import { ShieldCheck, Eye } from "lucide-react";

const CARD    = "rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";
const CARD_SM = "rounded-xl  bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05),0_2px_8px_0px_rgba(0,0,0,0.04)]";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#8db5ae]">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

// Deterministic fake hash so the tree always looks the same
function seedHash(seed: number, len = 4): string {
  const v = Math.abs(Math.sin(seed * 9301 + 49297) * 233280);
  return Math.floor(v).toString(16).substring(0, len).padStart(len, "0");
}

export default function MerkleTreeViz({ depth = 4 }: { depth?: number }) {
  const maxLeaves = Math.pow(2, depth);

  // Place the active leaf at ~20 % from the left edge — avoids clipping and
  // mirrors how a real tree looks when only one slot is filled.
  const activeCol = Math.max(2, Math.floor(maxLeaves * 0.2)); // = 3 for depth 4

  const nodeW  = 30;  // px per leaf column
  const nodeH  = 68;  // px per tree level
  const padH   = 28;  // horizontal inset so edge nodes don't touch the border
  const padTop = 40;  // room for root label
  const padBot = 52;  // room for pill + hash hint below active leaf

  const innerW = maxLeaves * nodeW;
  const svgW   = innerW + padH * 2;
  const svgH   = (depth + 1) * nodeH + padTop + padBot;

  // Build proof path + sibling (witness) sets
  const pathNodes    = new Set<string>();
  const siblingNodes = new Set<string>();
  let c = activeCol;
  for (let row = depth; row >= 0; row--) {
    pathNodes.add(`${row}-${c}`);
    if (row > 0) {
      siblingNodes.add(`${row}-${c % 2 === 0 ? c + 1 : c - 1}`);
    }
    c = Math.floor(c / 2);
  }

  const getX = (row: number, col: number) =>
    padH + (col + 0.5) * (innerW / Math.pow(2, row));
  const getY = (row: number) => row * nodeH + padTop;

  const ACTIVE_R = 9;

  return (
    <div className="space-y-4">
      <h2
        className="text-lg font-bold text-[#0f1a16]"
        style={{ fontFamily: "var(--font-raleway)" }}
      >
        Privacy Proof
      </h2>

      {/* ── Tree card ── */}
      <div className={CARD}>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#f0f7f4]">
          <div>
            <p
              className="text-xs font-semibold text-[#5e8a83] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Merkle Tree · depth {depth}
            </p>
            <p className="text-[10px] text-[#8db5ae] mt-0.5">
              {maxLeaves} leaf slots &middot; 1 commitment tracked
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LegendDot color="#599F8A" label="Proof path" />
            <LegendDot color="#a8cfc6" label="Witnesses" />
            <LegendDot color="#daeee9" label="Other" />
          </div>
        </div>

        {/* SVG — overflow:visible lets pulsing rings bleed beyond the bounds */}
        <div className="bg-[#f7fbf9] rounded-b-2xl">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            width="100%"
            style={{ display: "block", overflow: "visible" }}
            aria-label="Merkle tree showing proof path from your commitment to the root"
          >
            <defs>
              <filter id="mt-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="mt-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── Edges ── */}
            {Array.from({ length: depth + 1 }, (_, row) =>
              Array.from({ length: Math.pow(2, row) }, (_, col) => {
                if (row === 0) return null;
                const x  = getX(row, col);
                const y  = getY(row);
                const px = getX(row - 1, Math.floor(col / 2));
                const py = getY(row - 1);
                const onPath =
                  pathNodes.has(`${row}-${col}`) &&
                  pathNodes.has(`${row - 1}-${Math.floor(col / 2)}`);
                return (
                  <line
                    key={`e-${row}-${col}`}
                    x1={x} y1={y} x2={px} y2={py}
                    stroke={onPath ? "#599F8A" : "#c8e4dc"}
                    strokeWidth={onPath ? 1.75 : 1}
                    opacity={onPath ? 0.85 : 1}
                    strokeLinecap="round"
                  />
                );
              })
            )}

            {/* ── Nodes ── */}
            {Array.from({ length: depth + 1 }, (_, row) =>
              Array.from({ length: Math.pow(2, row) }, (_, col) => {
                const x         = getX(row, col);
                const y         = getY(row);
                const isActive  = row === depth && col === activeCol;
                const isRoot    = row === 0;
                const isPath    = !isActive && !isRoot && pathNodes.has(`${row}-${col}`);
                const isSibling = siblingNodes.has(`${row}-${col}`);

                const r =
                  isActive  ? ACTIVE_R :
                  isRoot    ? 8        :
                  isPath    ? 6.5      :
                  isSibling ? 5.5      : 4.5;

                const fill =
                  isActive || isRoot || isPath ? "#599F8A" :
                  isSibling                    ? "#a8cfc6" : "#daeee9";

                const stroke =
                  isActive || isRoot || isPath ? "#7ec4b0" :
                  isSibling                    ? "#8db5ae" : "#b8d9d2";

                const filter =
                  isActive         ? "url(#mt-glow-lg)" :
                  isRoot || isPath ? "url(#mt-glow)"    : undefined;

                // Show truncated hash below witness (sibling) nodes — these are what
                // the ZK proof actually reveals to the verifier.
                const showWitnessHash = isSibling && row >= 1 && row < depth;

                return (
                  <g key={`n-${row}-${col}`}>
                    {/* Pulsing rings on active leaf */}
                    {isActive && (
                      <>
                        <circle cx={x} cy={y} r={r} fill="none" stroke="#599F8A" strokeWidth="1.5">
                          <animate attributeName="r"       values={`${r};${r + 14}`} dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.85;0"           dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={x} cy={y} r={r} fill="none" stroke="#599F8A" strokeWidth="0.75">
                          <animate attributeName="r"       values={`${r};${r + 24}`} dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0"            dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}

                    <circle
                      cx={x} cy={y} r={r}
                      fill={fill} stroke={stroke}
                      strokeWidth={isActive || isRoot || isPath ? 1.5 : 1}
                      filter={filter}
                    />

                    {/* Witness hash hint */}
                    {showWitnessHash && (
                      <text
                        x={x} y={y + r + 10}
                        textAnchor="middle"
                        fontSize="7"
                        fill="#a8cfc6"
                        fontFamily="monospace"
                        opacity="0.9"
                      >
                        {seedHash(row * 31 + col, 6)}…
                      </text>
                    )}
                  </g>
                );
              })
            )}

            {/* ── Root label + hash ── */}
            <text
              x={getX(0, 0)} y={getY(0) - 16}
              textAnchor="middle"
              fontSize="10" fontWeight="600"
              fill="#5e8a83" letterSpacing="0.3"
              fontFamily="sans-serif"
            >
              Merkle Root
            </text>
            <text
              x={getX(0, 0)} y={getY(0) - 5}
              textAnchor="middle"
              fontSize="7.5"
              fill="#8db5ae"
              fontFamily="monospace"
            >
              0x{seedHash(7, 8)}…
            </text>

            {/* ── Active leaf: connector + pill + commitment hash ── */}
            {(() => {
              const cx    = getX(depth, activeCol);
              const cy    = getY(depth);
              const connY = cy + ACTIVE_R + 2;
              const pillW = 94;
              const pillH = 18;
              const pillX = cx - pillW / 2;
              const pillY = connY + 8;
              return (
                <>
                  <line x1={cx} y1={connY} x2={cx} y2={pillY} stroke="#c5ddd7" strokeWidth="1" />
                  <rect
                    x={pillX} y={pillY} width={pillW} height={pillH} rx={9}
                    fill="#eef7f4" stroke="#c5ddd7" strokeWidth="1"
                  />
                  <text
                    x={cx} y={pillY + 12}
                    textAnchor="middle"
                    fontSize="9" fontWeight="600"
                    fill="#599F8A" fontFamily="sans-serif"
                  >
                    Your commitment
                  </text>
                  <text
                    x={cx} y={pillY + pillH + 14}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#8db5ae" fontFamily="monospace"
                  >
                    0x{seedHash(depth * 31 + activeCol, 10)}…
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* ── Explainer cards ── */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`${CARD_SM} p-4`}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-md bg-[#f0f8f5] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={12} className="text-[#599F8A]" aria-hidden="true" />
            </div>
            <p
              className="text-xs font-semibold text-[#5e8a83]"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              What&apos;s in the tree
            </p>
          </div>
          <p className="text-xs text-[#8db5ae] leading-relaxed">
            Every deposit creates a cryptographic commitment added as a leaf. The
            root summarises all deposits without revealing any one of them.
          </p>
        </div>

        <div className={`${CARD_SM} p-4`}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-6 h-6 rounded-md bg-[#f0f8f5] flex items-center justify-center flex-shrink-0">
              <Eye size={12} className="text-[#599F8A]" aria-hidden="true" />
            </div>
            <p
              className="text-xs font-semibold text-[#5e8a83]"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              What the proof reveals
            </p>
          </div>
          <p className="text-xs text-[#8db5ae] leading-relaxed">
            Only that you know a valid leaf — not which one. Witness hashes
            (shown in grey) are revealed; your commitment stays hidden.
          </p>
        </div>
      </div>
    </div>
  );
}
