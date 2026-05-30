"use client";

export default function MerkleTreeViz({ depth = 3 }: { depth?: number }) {
  const maxCols = Math.pow(2, depth);
  const svgW = maxCols * 44;
  const svgH = (depth + 1) * 52;

  const rows = Array.from({ length: depth + 1 }, (_, row) => row);

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
      <p className="text-xs text-[#475569] uppercase tracking-wider font-medium mb-4">
        Merkle Tree
      </p>
      <div className="overflow-x-auto">
        <svg
          width={svgW}
          height={svgH}
          className="mx-auto block"
          aria-label="Merkle tree visualization"
        >
          {rows.map((row) =>
            Array.from({ length: Math.pow(2, row) }, (_, col) => {
              const x = (col + 0.5) * (svgW / Math.pow(2, row));
              const y = row * 52 + 20;
              const isLeaf = row === depth;
              const isActive = isLeaf && col === 0;

              const parentX =
                row > 0
                  ? (Math.floor(col / 2) + 0.5) *
                    (svgW / Math.pow(2, row - 1))
                  : 0;
              const parentY = row > 0 ? (row - 1) * 52 + 20 : 0;

              return (
                <g key={`${row}-${col}`}>
                  {row > 0 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={parentX}
                      y2={parentY}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={10}
                    fill={isActive ? "#00d4a0" : "#1e293b"}
                    stroke={isActive ? "#00d4a0" : "#334155"}
                    strokeWidth="1"
                    className={isActive ? "animate-pulse" : ""}
                  />
                </g>
              );
            })
          )}
        </svg>
      </div>
      <p className="text-xs text-[#475569] text-center mt-2">
        Your commitment is a leaf — withdrawal proves membership without
        revealing which one
      </p>
    </div>
  );
}
