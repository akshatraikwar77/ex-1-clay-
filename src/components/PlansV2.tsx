import { useState } from "react";
import { MemoryStick, Cpu, HardDrive, Users, ArrowRight, Sparkles, Check, AlertTriangle } from "lucide-react";
import Reveal from "./Reveal";
import { openOrder } from "./OrderModal";
import { SERIES, ALL_INCLUDES } from "../data/plans";

export default function PlansV2() {
  const [active, setActive] = useState(SERIES[1].id);
  const series = SERIES.find((s) => s.id === active)!;

  return (
    <section id="plans" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 grid-bg-dark opacity-50" />
      <div className="aurora absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="aurora absolute -right-32 bottom-10 h-[24rem] w-[24rem] rounded-full bg-cyan-500/12 blur-[120px]" style={{ animationDelay: "-9s" }} />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* header + promo */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono2 text-[10px] tracking-[0.5em] text-cyan-300">// HOSTING PLANS</p>
              <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
                FOUR SERIES.
                <br />
                <span className="grad-text">NINETEEN LOADOUTS.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4">
              <Sparkles className="h-5 w-5 shrink-0 text-amber-400" />
              <p className="text-sm leading-snug text-amber-200">
                <span className="font-800">FLUXLAUNCH</span> — 15% OFF your first month on any plan.
                Apply the code at checkout.
              </p>
            </div>
          </div>
        </Reveal>

        {/* series tabs */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {SERIES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`group relative flex items-center gap-2.5 rounded-2xl border px-5 py-3.5 transition-all duration-300 ${
                  s.id === active ? "border-white/25 bg-white/[0.08]" : "border-white/8 bg-white/[0.03] hover:border-white/15"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full transition-all"
                  style={{
                    background: s.accent,
                    boxShadow: s.id === active ? `0 0 14px ${s.accent}` : "none",
                  }}
                />
                <span className="text-left">
                  <span className="block font-mono2 text-[8px] tracking-[0.3em] text-slate-500">{s.tag}</span>
                  <span className={`block font-display text-sm font-700 ${s.id === active ? "text-white" : "text-slate-400"}`}>
                    {s.heroName}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* active series header */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <h3 className="font-display text-xl font-800 text-white">{series.name}</h3>
            <span className="font-mono2 text-[10px] tracking-[0.25em]" style={{ color: series.accent }}>
              {series.cpuLine}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{series.blurb}</p>
          {series.note && (
            <p className="mt-3 flex items-center gap-2 text-xs text-amber-300/80">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {series.note}
            </p>
          )}
        </Reveal>

        {/* plan cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {series.plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <div
                className={`group relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 ${
                  p.badge ? "border-white/20 bg-white/[0.06]" : "border-white/8 bg-white/[0.03]"
                }`}
                style={{ boxShadow: p.badge ? `0 24px 70px ${series.accent}18` : undefined }}
              >
                {p.badge && (
                  <span
                    className="absolute -top-2.5 left-5 rounded-full px-3 py-1 font-mono2 text-[8px] tracking-[0.25em] text-white"
                    style={{ background: series.accent }}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-display text-base font-800 tracking-wide text-white">{p.name}</h4>
                  <span className="h-1.5 w-8 rounded-full" style={{ background: series.accent }} />
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-900 tracking-tight text-white">₹{p.price.toLocaleString("en-IN")}</span>
                  <span className="font-mono2 text-[10px] text-slate-500">/MONTH</span>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-white/8 pt-5">
                  {[
                    { icon: MemoryStick, v: p.ram },
                    { icon: Cpu, v: p.cpu },
                    { icon: HardDrive, v: p.storage },
                    { icon: Users, v: `${p.slots} · DDoS included` },
                  ].map((row, k) => (
                    <li key={k} className="flex items-center gap-2.5 text-[13px] text-slate-300">
                      <row.icon className="h-4 w-4 shrink-0" style={{ color: series.accent }} />
                      {row.v}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openOrder(p.id)}
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-700 text-white transition-all duration-300 hover:brightness-110 ${
                    p.badge ? "" : "border border-white/12 bg-white/[0.05] hover:bg-white/[0.09]"
                  }`}
                  style={p.badge ? { background: `linear-gradient(90deg, ${series.accent}, ${series.accent}aa)` } : undefined}
                >
                  Order Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* all plans include */}
        <Reveal delay={140}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <p className="text-center font-mono2 text-[10px] tracking-[0.4em] text-slate-500">
              📌 ALL PLANS INCLUDE
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {ALL_INCLUDES.map((f) => (
                <span key={f} className="flex items-center gap-2.5 text-[13px] text-slate-300">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </span>
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-7 text-center font-mono2 text-[10px] tracking-[0.25em] text-slate-500">
              💳 UPI · GPAY · PAYTM · PHONEPE · CRYPTO &nbsp;·&nbsp; 📍 SERVERS IN INDIA (DELHI / NOIDA) 🇮🇳
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
