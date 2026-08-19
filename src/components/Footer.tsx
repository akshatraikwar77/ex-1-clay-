import { Zap, MessagesSquare, IndianRupee, Wallet, Smartphone, Phone, Bitcoin, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";

const PAYMENTS = [
  { icon: IndianRupee, label: "UPI" },
  { icon: Wallet, label: "GPay" },
  { icon: Smartphone, label: "Paytm" },
  { icon: Phone, label: "PhonePe" },
  { icon: Bitcoin, label: "Crypto" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("play.fluxsmp.fun");
    } catch {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer className="relative">
      {/* ---------- CTA ---------- */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080b14] px-6 py-16 text-center md:py-24">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-sky-500/15 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-72 rounded-full bg-violet-600/15 blur-[90px]" />

            <div className="relative">
              <p className="font-mono2 text-[10px] tracking-[0.5em] text-sky-400">// READY WHEN YOU ARE</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-900 leading-tight tracking-tight text-white md:text-6xl">
                POWER UP <span className="grad-text">YOUR SMP</span> TONIGHT
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                Spin up your own server and be online before your chai gets cold — or copy
                the IP to see a FLUX node in action first.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={copy}
                  className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-7 py-3.5 font-mono2 text-sm font-700 tracking-widest text-slate-950 shadow-[0_16px_50px_rgba(56,189,248,0.35)] transition-all hover:shadow-[0_16px_60px_rgba(56,189,248,0.55)] hover:brightness-110"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "IP COPIED — SEE YOU IN GAME" : "COPY IP · PLAY.FLUXSMP.FUN"}
                </button>
                <a
                  href="https://discord.gg/4jM9mqvtnZ"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-violet-400/40 bg-violet-500/10 px-7 py-3.5 text-sm font-700 text-violet-200 transition-all hover:bg-violet-500/20 hover:shadow-[0_16px_50px_rgba(124,58,237,0.3)]"
                >
                  <MessagesSquare className="h-4 w-4" />
                  discord.gg/4jM9mqvtnZ
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- footer body ---------- */}
      <div className="mt-20 border-t border-white/6 bg-[#05060c]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500 shadow-[0_0_24px_rgba(56,189,248,0.4)]">
                <Zap className="h-4.5 w-4.5 text-white" fill="currentColor" />
              </span>
              <span className="font-display text-lg font-800 tracking-tight text-white">
                FLUX<span className="text-sky-400">HOST</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              India's premier Minecraft server hosting. Real AMD silicon, real humans, and an
              AI agent that actually does the work.
            </p>
            <button
              onClick={copy}
              className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono2 text-[11px] tracking-widest text-slate-300 transition-all hover:border-sky-400/40 hover:text-sky-300"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "COPIED!" : "PLAY.FLUXSMP.FUN"}
            </button>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">EXPLORE</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {[
                ["Features", "#features"],
                ["AI Agent · MCP", "#mcp"],
                ["Hosting Plans", "#plans"],
                ["Network", "#network"],
                ["Reviews", "#reviews"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-sky-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">SUPPORT</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="https://discord.gg/4jM9mqvtnZ" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-sky-300">
                  <MessagesSquare className="h-3.5 w-3.5" /> Discord — 24/7
                </a>
              </li>
              <li className="flex items-center gap-2"><Smartphone className="h-3.5 w-3.5" /> +91 90000 00000</li>
              <li>
                <a href="mailto:support@fluxsmp.fun" className="transition-colors hover:text-sky-300">
                  support@fluxsmp.fun
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">WE ACCEPT</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span key={p.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-600 text-slate-300 transition-colors hover:border-emerald-400/30 hover:text-emerald-200">
                  <p.icon className="h-3.5 w-3.5" /> {p.label}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono2 text-[10px] leading-relaxed tracking-wider text-slate-600">
              UPI · GPAY · PAYTM · PHONEPE · BTC/ETH/USDT
            </p>
          </div>
        </div>

        <div className="border-t border-white/6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 font-mono2 text-[10px] tracking-wider text-slate-600 md:flex-row md:px-8">
            <span>© 2025 FLUX HOST · PLAY.FLUXSMP.FUN · MADE FOR INDIAN CRAFTERS</span>
            <span>NOT AFFILIATED WITH MOJANG AB OR MICROSOFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
