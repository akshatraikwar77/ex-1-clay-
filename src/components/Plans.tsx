import { useState, type MouseEvent as ReactMouseEvent } from "react";
import { Check, Zap, Crown, Sparkles, ArrowRight, Infinity as InfinityIcon } from "lucide-react";
import Reveal from "./Reveal";

type Plan = {
  id: string;
  tag: string;
  name: string;
  accent: string;
  icon: typeof Zap;
  monthly: number;
  popular?: boolean;
  specs: string[];
};

const PLANS: Plan[] = [
  {
    id: "budget",
    tag: "SERIES 01",
    name: "BUDGET",
    accent: "#22d3ee",
    icon: Zap,
    monthly: 149,
    specs: ["2 GB DDR5 RAM", "1× Ryzen vCore", "10 GB NVMe storage", "Unlimited player slots", "Full file & console access", "Instant setup · UPI ready"],
  },
  {
    id: "epyc",
    tag: "SERIES 02",
    name: "EPYC",
    accent: "#a78bfa",
    icon: Sparkles,
    monthly: 399,
    popular: true,
    specs: ["8 GB DDR5 ECC RAM", "2× EPYC 9004 vCores", "40 GB NVMe storage", "Unlimited slots · Modpacks", "Free subdomain + backups", "Priority support queue"],
  },
  {
    id: "5900x",
    tag: "SERIES 03",
    name: "RYZEN 9 5900X",
    accent: "#38bdf8",
    icon: Crown,
    monthly: 649,
    specs: ["16 GB DDR5 RAM", "4× vCores · 4.8 GHz boost", "80 GB NVMe storage", "Dedicated port + custom jar", "Automated off-site backups", "1-click modpack installer"],
  },
  {
    id: "9950x",
    tag: "SERIES 04",
    name: "RYZEN 9 9950X",
    accent: "#fbbf24",
    icon: InfinityIcon,
    monthly: 999,
    specs: ["32 GB DDR5 RAM", "8× vCores · 5.7 GHz boost", "160 GB NVMe Gen5 storage", "Full dedicated core pinning", "MCP agent tuned profiles", "VIP 24/7 human + AI support"],
  },
];

export default function Plans() {
  const [quarterly, setQuarterly] = useState(false);

  const tilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(950px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-8px)`;
  };
  const untilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section id="plans" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <span className="watermark left-[-3%] top-6 select-none">SERIES</span>
      <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-sky-500/8 blur-[120px]" />

      <Reveal>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono2 text-[10px] tracking-[0.5em] text-sky-400">// HOSTING PLANS</p>
            <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
              FOUR SERIES.
              <br />
              <span className="grad-text">ZERO COMPROMISE.</span>
            </h2>
          </div>

          {/* billing toggle */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setQuarterly(false)}
              className={`rounded-full px-5 py-2 font-mono2 text-[11px] tracking-widest transition-all ${
                !quarterly ? "bg-sky-400 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setQuarterly(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-mono2 text-[11px] tracking-widest transition-all ${
                quarterly ? "bg-sky-400 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              QUARTERLY
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${quarterly ? "bg-slate-950/20 text-slate-950" : "bg-emerald-400/15 text-emerald-300"}`}>
                −20%
              </span>
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((p, i) => {
          const price = quarterly ? Math.round(p.monthly * 0.8) : p.monthly;
          return (
            <Reveal key={p.id} delay={i * 90}>
              <div
                onMouseMove={tilt}
                onMouseLeave={untilt}
                className={`plan-card group relative flex h-full flex-col rounded-3xl border p-6 ${
                  p.popular
                    ? "border-violet-400/40 bg-gradient-to-b from-violet-500/12 to-transparent shadow-[0_30px_80px_rgba(124,58,237,0.15)]"
                    : "border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3.5 py-1 font-mono2 text-[9px] tracking-[0.25em] text-white shadow-[0_8px_24px_rgba(124,58,237,0.5)]">
                    BEST SELLER
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border" style={{ borderColor: `${p.accent}40`, background: `${p.accent}12`, color: p.accent }}>
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono2 text-[9px] tracking-[0.3em]" style={{ color: p.accent }}>
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-800 text-white">{p.name}</h3>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-900 tracking-tight text-white">
                    ₹{price}
                  </span>
                  <span className="font-mono2 text-[10px] text-slate-500">/MO</span>
                  {quarterly && (
                    <span className="ml-1 rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono2 text-[9px] text-emerald-300 line-through">
                      ₹{p.monthly}
                    </span>
                  )}
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {p.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: p.accent }} />
                      {s}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://discord.gg/4jM9mqvtnZ"
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-700 transition-all duration-300 ${
                    p.popular
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:shadow-[0_12px_36px_rgba(124,58,237,0.5)]"
                      : "border border-white/12 bg-white/[0.04] text-white hover:border-sky-400/40 hover:bg-sky-400/10"
                  }`}
                >
                  Deploy in 60s
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={150}>
        <p className="mt-10 text-center font-mono2 text-[11px] tracking-wider text-slate-500">
          ALL PLANS INCLUDE DDOS PROTECTION · NVMe STORAGE · UNLIMITED SLOTS · 99.9% UPTIME SLA
        </p>
      </Reveal>
    </section>
  );
}
