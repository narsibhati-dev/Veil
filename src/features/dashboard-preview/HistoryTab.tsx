import { Lock } from "lucide-react";

const LOGS = [
  { type: "Shield",   tx: "0x8fa3f2...6c1d", amount: "10.00 SOL",  time: "2 mins ago",  status: "Confirmed" },
  { type: "Withdraw", tx: "0x4be5b9...e5f2", amount: "5.00 SOL",   time: "18 mins ago", status: "Confirmed" },
  { type: "Shield",   tx: "0x69f2e3...f3a9", amount: "50.00 SOL",  time: "1 hour ago",  status: "Confirmed" },
  { type: "Withdraw", tx: "0xf5e2d1...b3e8", amount: "100.00 SOL", time: "1 day ago",   status: "Confirmed" },
  { type: "Shield",   tx: "0x3bc7a1...9d4f", amount: "25.00 SOL",  time: "3 days ago",  status: "Confirmed" },
] as const;

export default function HistoryTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-[#6db5a0]/50 px-2 uppercase tracking-wider font-semibold">
        <span>Action / Hash</span>
        <span>Amount</span>
        <span>Time / Status</span>
      </div>
      <div className="space-y-2.5">
        {LOGS.map((log, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.1] text-sm transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  log.type === "Shield" ? "bg-[#599F8A]/10 text-[#6db5a0]" : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
                <Lock size={14} />
              </span>
              <div>
                <p className="font-bold text-[#a8d5cc]">{log.type} SOL</p>
                <p className="font-mono text-xs text-[#599F8A]">{log.tx}</p>
              </div>
            </div>
            <span className="font-mono font-bold text-[#a8d5cc]">{log.amount}</span>
            <div className="text-right">
              <p className="text-[#6db5a0]/60 font-semibold">{log.time}</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {log.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
