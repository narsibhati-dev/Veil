import Link from "next/link";
import LogoIcon from "@/components/ui/LogoIcon";

export default function LandingFooter() {
  return (
    <footer className="bg-[#f7fbf9] border-t border-[#e6f0ed]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <LogoIcon size={32} />
            <div>
              <span
                className="block text-base font-extrabold text-[#0f1a16] tracking-tight"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Veil
              </span>
              <span className="block text-[10px] text-[#8db5ae] mt-0.5 uppercase tracking-widest">
                Devnet alpha
              </span>
            </div>
          </div>

          <p className="text-xs text-[#8db5ae] text-center leading-relaxed">
            ZK privacy on Solana &middot; All funds are testnet SOL with no real value
          </p>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#599F8A] text-white text-xs font-bold hover:bg-[#4d8f7a] transition-colors shadow-sm"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Launch App →
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-[#e6f0ed] flex items-center justify-center">
          <p className="text-[10px] text-[#8db5ae]/60 uppercase tracking-widest">
            © {new Date().getFullYear()} Veil &mdash; for educational &amp; devnet use only
          </p>
        </div>
      </div>
    </footer>
  );
}
