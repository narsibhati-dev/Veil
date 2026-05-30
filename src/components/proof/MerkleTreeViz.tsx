"use client";

export default function MerkleTreeViz({ depth = 4 }: { depth?: number }) {
  const maxLeaves = Math.pow(2, depth);
  const nodeW  = 28;
  const nodeH  = 56;
  const svgW   = maxLeaves * nodeW;
  const svgH   = (depth + 1) * nodeH + 36;

  // Active leaf: first leaf (row=depth, col=0)
  // Path from that leaf to root: always left child at each level
  const pathNodes    = new Set<string>();
  const siblingNodes = new Set<string>();
  let col = 0;
  for (let row = depth; row >= 0; row--) {
    pathNodes.add(`${row}-${col}`);
    if (row > 0) {
      const sib = col % 2 === 0 ? col + 1 : col - 1;
      siblingNodes.add(`${row}-${sib}`);
    }
    col = Math.floor(col / 2);
  }

  const getX = (row: number, c: number) =>
    (c + 0.5) * (svgW / Math.pow(2, row));
  const getY = (row: number) => row * nodeH + 24;

  return (
    <div className="space-y-4">
      <h2
        className="text-lg font-bold text-[#f1f5f9]"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Privacy Proof
      </h2>

      {/* Tree */}
      <div className="rounded-2xl border border-[#1e1e3a] bg-[#0f0f1a] p-5 overflow-hidden">
        <p
          className="text-xs text-[#475569] uppercase tracking-widest mb-4"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Merkle Tree — depth {depth}
        </p>

        <div className="overflow-x-auto">
          <svg
            width={svgW}
            height={svgH}
            className="block mx-auto"
            style={{ minWidth: Math.min(svgW, 560) }}
            aria-label="Merkle tree visualization"
          >
            {/* Edges */}
            {Array.from({ length: depth + 1 }, (_, row) =>
              Array.from({ length: Math.pow(2, row) }, (_, c) => {
                if (row === 0) return null;
                const x   = getX(row, c);
                const y   = getY(row);
                const px  = getX(row - 1, Math.floor(c / 2));
                const py  = getY(row - 1);
                const key = `e-${row}-${c}`;
                const onPath =
                  pathNodes.has(`${row}-${c}`) &&
                  pathNodes.has(`${row - 1}-${Math.floor(c / 2)}`);
                return (
                  <line
                    key={key}
                    x1={x} y1={y} x2={px} y2={py}
                    stroke={onPath ? "#6366f1" : "#1e1e3a"}
                    strokeWidth={onPath ? 1.5 : 1}
                    opacity={onPath ? 0.5 : 1}
                  />
                );
              })
            )}

            {/* Nodes */}
            {Array.from({ length: depth + 1 }, (_, row) =>
              Array.from({ length: Math.pow(2, row) }, (_, c) => {
                const x         = getX(row, c);
                const y         = getY(row);
                const isActive  = row === depth && c === 0;
                const isPath    = !isActive && pathNodes.has(`${row}-${c}`);
                const isSibling = siblingNodes.has(`${row}-${c}`);

                let fill   = "#0f0f1a";
                let stroke = "#1e1e3a";
                let r      = 6;

                if (isActive) {
                  fill = "#6366f1"; stroke = "#818cf8"; r = 8;
                } else if (isPath) {
                  fill = "#6366f1"; stroke = "#818cf8"; r = 6;
                } else if (isSibling) {
                  fill = "#2d2d5e"; stroke = "#6366f1"; r = 6;
                }

                return (
                  <g key={`n-${row}-${c}`}>
                    {/* Pulsing rings on active leaf */}
                    {isActive && (
                      <>
                        <circle cx={x} cy={y} r={r} fill="none" stroke="#6366f1" strokeWidth="1">
                          <animate attributeName="r"       values={`${r};${r + 10}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.7;0"            dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={x} cy={y} r={r} fill="none" stroke="#6366f1" strokeWidth="0.5">
                          <animate attributeName="r"       values={`${r};${r + 18}`} dur="2s" begin="0.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0"            dur="2s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                    <circle
                      cx={x} cy={y} r={r}
                      fill={fill} stroke={stroke} strokeWidth="1"
                    />
                  </g>
                );
              })
            )}

            {/* Labels */}
            <text
              x={getX(0, 0)}
              y={getY(0) - 13}
              textAnchor="middle"
              fontSize="9"
              fill="#475569"
              fontFamily="sans-serif"
            >
              Merkle Root
            </text>
            <text
              x={getX(depth, 0)}
              y={getY(depth) + 19}
              textAnchor="middle"
              fontSize="9"
              fill="#6366f1"
              fontFamily="sans-serif"
            >
              Your commitment
            </text>
          </svg>
        </div>
      </div>

      {/* Two-column explainer */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1e1e3a] bg-[#0f0f1a] p-4">
          <p
            className="text-xs font-semibold text-[#94a3b8] mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What&apos;s in the tree
          </p>
          <p className="text-xs text-[#475569] leading-relaxed">
            Every deposit creates a cryptographic commitment added as a leaf.
            The root summarises all deposits without revealing any one of them.
          </p>
        </div>
        <div className="rounded-xl border border-[#1e1e3a] bg-[#0f0f1a] p-4">
          <p
            className="text-xs font-semibold text-[#94a3b8] mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What the proof reveals
          </p>
          <p className="text-xs text-[#475569] leading-relaxed">
            Only that you know a valid leaf in this tree — not which one. A
            nullifier prevents double-spending without linking transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
