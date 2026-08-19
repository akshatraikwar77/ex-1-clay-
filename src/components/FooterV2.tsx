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

export default function FooterV2() {
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
    <footer className="relative bg-ink pt-24">
      {/* ---------- CTA ---------- */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink2 px-6 py-16 text-center md:py-24">
            <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" />
            {/* rotating beam */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-30">
              <div className="beam h-full w-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(79,70,229,0.5)_40deg,transparent_90deg,rgba(6,182,212,0.5)_160deg,transparent_220deg,rgba(245,158,11,0.35)_300deg,transparent_360deg)]" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#10162e_78%)]" />

            <div className="relative">
              <p className="font-mono2 text-[10px] tracking-[0.5em] text-cyan-300">// READY WHEN YOU ARE</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-900 leading-tight tracking-tight text-white md:text-6xl">
                YOUR SERVER IS
                <br />
                <span className="grad-text">60 SECONDS AWAY</span>
              </h2>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#plans"
                  className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-7 py-4 text-sm font-700 text-white shadow-[0_20px_60px_rgba(79,70,229,0.45)] transition-all hover:shadow-[0_20px_70px_rgba(79,70,229,0.65)] hover:brightness-110"
                >
                  BROWSE 19 PLANS
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button
                  onClick={copy}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-7 py-4 font-mono2 text-sm tracking-wider text-slate-200 transition-all hover:border-cyan-300/40 hover:text-cyan-200"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copied ? "IP COPIED — SEE YOU IN GAME" : "COPY IP · PLAY.FLUXSMP.FUN"}
                </button>
              </div>

              <a
                href="https://discord.gg/4jM9mqvtnZ"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-mono2 text-[11px] tracking-[0.25em] text-slate-400 transition-colors hover:text-cyan-300"
              >
                <MessagesSquare className="h-4 w-4" /> discord.gg/4jM9mqvtnZ
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- footer body ---------- */}
      <div className="mt-20 border-t border-white/8">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
                <Zap className="h-4 w-4 text-white" fill="currentColor" />
              </span>
              <span className="font-display text-lg font-800 tracking-tight text-white">
                FLUX<span className="text-cyan-300">HOST</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              India's premier Minecraft server hosting. Real AMD silicon, real humans, and an
              AI agent that actually does the work.
            </p>
            <button
              onClick={copy}
              className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono2 text-[11px] tracking-widest text-slate-300 transition-all hover:border-cyan-300/40 hover:text-cyan-200"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "COPIED!" : "PLAY.FLUXSMP.FUN"}
            </button>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">EXPLORE</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {[
                ["Deploy Timeline", "#steps"],
                ["Plan Builder", "#plans"],
                ["AI Agent · MCP", "#agent"],
                ["Network", "#network"],
                ["FAQ", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-cyan-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">SUPPORT</p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="https://discord.gg/4jM9mqvtnZ" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-cyan-300">
                  <MessagesSquare className="h-3.5 w-3.5" /> Discord — 24/7
                </a>
              </li>
              <li className="flex items-center gap-2"><Smartphone className="h-3.5 w-3.5" /> +91 90000 00000</li>
              <li>
                <a href="mailto:support@fluxsmp.fun" className="transition-colors hover:text-cyan-300">support@fluxsmp.fun</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono2 text-[10px] tracking-[0.35em] text-slate-500">WE ACCEPT</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span key={p.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-600 text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-200">
                  <p.icon className="h-3.5 w-3.5" /> {p.label}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono2 text-[10px] leading-relaxed tracking-wider text-slate-600">
              UPI · GPAY · PAYTM · PHONEPE · BTC/ETH/USDT
            </p>
          </div>
        </div>

        <div className="border-t border-white/8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 font-mono2 text-[10px] tracking-wider text-slate-600 md:flex-row md:px-8">
            <span>
              © 2025 FLUX HOST · CREATED BY <span className="credit-name font-700">AKSHAT</span> · DIRECTED BY{" "}
              <span className="credit-name font-700">HUZAIFA</span>
            </span>
            <span>NOT AFFILIATED WITH MOJANG AB OR MICROSOFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
