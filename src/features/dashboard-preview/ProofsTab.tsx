export default function ProofsTab() {
  return (
    <div className="rounded-2xl border border-white/[0.06] p-6 font-mono text-sm text-[#6db5a0]/80 overflow-hidden h-full leading-7 space-y-1 select-none">
      <p className="text-[#6db5a0]/90">{`[Groth16 WASM Engine initializing...]`}</p>
      <p className="text-[#599F8A]">{`> Loaded BN254 Elliptic Curve parameters`}</p>
      <p className="text-[#599F8A]">{`> Poseidon Hash instances: Depth 4`}</p>
      <p className="text-[#599F8A]">{`> Constraints loaded: 18,432 equations`}</p>
      <p className="text-[#599F8A]">{`> Inputs setup: secret, pathElements[4], rootNode, nullifier`}</p>
      <p className="text-[#6db5a0]">{`------------------------------------------------------------`}</p>
      <p className="text-[#8ecabb]">{`template Withdrawal(levels) {`}</p>
      <p className="text-[#6db5a0]">{`  signal private secret;                // UNKNOWN ON-CHAIN`}</p>
      <p className="text-[#6db5a0]">{`  signal private pathElements[levels];  // PATH TO MERKLE ROOT`}</p>
      <p className="text-[#6db5a0]">{`  signal commitment <== Poseidon(secret);`}</p>
      <p className="text-emerald-400 font-semibold">{`  tree.root === merkleRoot;             // Proves leaf exists! ✓`}</p>
      <p className="text-emerald-400 font-semibold">{`  n.out     === nullifier;              // Confirms valid spend! ✓`}</p>
      <p className="text-[#8ecabb]">{`}`}</p>
      <p className="text-[#6db5a0]">{`------------------------------------------------------------`}</p>
      <p className="text-emerald-400/80 animate-pulse">{`> [Ready] WASM prover fully primed. Generating proof takes ~900ms in-browser.`}</p>
    </div>
  );
}
