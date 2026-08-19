import { useState } from "react";
import { Copy, Check, IndianRupee, Wallet, Smartphone, Phone, Bitcoin, MessagesSquare } from "lucide-react";
import { SERVER_IP, DISCORD_URL } from "./data";

const PAYMENTS = [
  { icon: IndianRupee, label: "UPI" },
  { icon: Wallet, label: "GPay" },
  { icon: Smartphone, label: "Paytm" },
  { icon: Phone, label: "PhonePe" },
  { icon: Bitcoin, label: "Crypto" },
];

export default function FooterSmp() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(SERVER_IP); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="join" className="relative pt-24">
      {/* big clay CTA */}
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="clay clay-sky relative overflow-hidden rounded-[3rem] px-6 py-16 text-center md:py-20">
          <span className="clay-cloud absolute left-[8%] top-8 h-7 w-24 opacity-80" />
          <span className="clay-cloud absolute right-[10%] bottom-10 h-6 w-20 opacity-70" />
          <div className="relative">
            <h2 className="font-display text-3xl font-700 text-white [text-shadow:0_3px_0_rgba(255,255,255,0.3)] md:text-5xl">
              Your adventure starts now
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-700 text-white/90">
              Copy the IP, hop in, and say hi at spawn. The community (and the dragon) are waiting.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={copy} className="clay-btn clay-butter flex items-center gap-2.5 px-7 py-4 font-display text-base font-700 text-[#6b4e12]">
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copied ? "Copied!" : SERVER_IP}
              </button>
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="clay-btn clay-coral flex items-center gap-2.5 px-7 py-4 font-display text-base font-700 text-white">
                <MessagesSquare className="h-5 w-5" /> Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* footer body */}
      <div className="mt-20 bg-[#f6e8d4]/70 pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 md:px-8 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-700 text-[#4a3b2f]">
              Flux<span className="text-[#2ea877]">SMP</span>
            </p>
            <p className="mt-3 max-w-xs text-sm font-700 leading-relaxed text-[#7a6a58]">
              India's premier survival SMP — three seasons of builds, battles and friendships,
              molded block by block.
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-700 text-[#e8654c]">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm font-800 text-[#7a6a58]">
              <li><a href="#world" className="transition-colors hover:text-[#2ea877]">The World</a></li>
              <li><a href="#shop" className="transition-colors hover:text-[#2ea877]">Rank Shop</a></li>
              <li><a href="#shop" className="transition-colors hover:text-[#2ea877]">Key Shop</a></li>
              <li><a href="#shop" className="transition-colors hover:text-[#2ea877]">Shards Shop</a></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-700 text-[#e8654c]">We accept</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span key={p.label} className="clay flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-800 text-[#7a6a58]">
                  <p.icon className="h-3.5 w-3.5 text-[#2ea877]" /> {p.label}
                </span>
              ))}
            </div>
            <button onClick={copy} className="mt-4 font-mono2 text-[10px] font-700 tracking-wider text-[#3d8fd4] underline-offset-4 hover:underline">
              {SERVER_IP}
            </button>
          </div>
        </div>

        <div className="border-t-2 border-white/60">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center font-mono2 text-[9px] font-700 tracking-wider text-[#a08a70] md:flex-row md:px-8 md:text-left">
            <span>
              © 2025 FLUX SMP · CRAFTED BY <span className="credit-name">AKSHAT</span> · DIRECTED BY <span className="credit-name">HUZAIFA</span>
            </span>
            <span>NOT AFFILIATED WITH MOJANG AB OR MICROSOFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
