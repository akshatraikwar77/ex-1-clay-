import { useMemo, useState } from "react";
import { Users, Boxes, ArrowRight, Check, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { openOrder } from "./OrderModal";
import { findPlan } from "../data/plans";

/* comfortable player capacity per recommended plan id */
const CAPS: Record<string, number> = {
  stone: 10, iron: 20, copper: 30, redstone: 50,
  "epyc-pro": 50, ryzen8: 50,
  "epyc-elite": 100, ryzen16: 100,
  "epyc-ultimate": 150, ryzen32: 200,
  "epyc-titan": 250, ryzen64: 250, gold: 250, ghast: 250,
};

function recommend(players: number, modded: boolean): string {
  if (players <= 10) return "stone";
  if (players <= 20) return "iron";
  if (players <= 30) return "copper";
  if (players <= 50) return modded ? "ryzen8" : "epyc-pro";
  if (players <= 100) return modded ? "ryzen16" : "epyc-elite";
  if (players <= 150) return modded ? "ryzen32" : "epyc-ultimate";
  return modded ? "ryzen64" : "epyc-titan";
}

export default function PlanBuilder() {
  const [players, setPlayers] = useState(40);
  const [modded, setModded] = useState(false);

  const rec = useMemo(() => {
    const id = recommend(players, modded);
    return { id, ...findPlan(id)! };
  }, [players, modded]);

  const cap = CAPS[rec.id] ?? 50;
  const load = Math.min(100, Math.round((players / cap) * 100));

  return (
    <section id="finder" className="relative overflow-hidden bg-ink2 py-24 md:py-32">
      <div className="absolute inset-0 grid-bg-dark opacity-40" />
      <div className="aurora absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-indigo-600/18 blur-[120px]" />
      <div className="aurora absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-cyan-500/12 blur-[120px]" style={{ animationDelay: "-8s" }} />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono2 text-[10px] tracking-[0.5em] text-cyan-300">// PLAN FINDER</p>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
            TELL US YOUR SQUAD SIZE.
            <br />
            <span className="grad-text">WE PICK THE SILICON.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* controls */}
          <Reveal>
            <div className="glass-dark h-full rounded-3xl p-7 md:p-9">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 font-mono2 text-[10px] tracking-[0.3em] text-slate-400">
                  <Users className="h-4 w-4 text-indigo-400" /> EXPECTED PLAYERS
                </span>
                <span className="font-display text-4xl font-900 text-white tabular-nums">
                  {players}
                  <span className="ml-1 text-sm font-600 text-slate-500">max</span>
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={200}
                value={players}
                onChange={(e) => setPlayers(Number(e.target.value))}
                className="flux-range mt-6"
                aria-label="Expected players"
              />
              <div className="mt-2 flex justify-between font-mono2 text-[9px] tracking-[0.25em] text-slate-500">
                <span>02 · DUO WORLD</span>
                <span>200 · MEGA NETWORK</span>
              </div>

              <div className="mt-9 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="flex items-center gap-2.5 font-mono2 text-[10px] tracking-[0.3em] text-slate-400">
                  <Boxes className="h-4 w-4 text-amber-400" /> MODDED / HEAVY PLUGINS?
                </span>
                <button
                  onClick={() => setModded((v) => !v)}
                  className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${modded ? "bg-gradient-to-r from-indigo-500 to-cyan-400" : "bg-white/10"}`}
                  aria-pressed={modded}
                >
                  <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ${modded ? "left-7" : "left-1"}`} />
                </button>
              </div>

              {/* live load meter */}
              <div className="mt-9">
                <div className="flex items-center justify-between font-mono2 text-[9px] tracking-[0.3em] text-slate-500">
                  <span>PROJECTED NODE LOAD</span>
                  <span className="text-slate-300 tabular-nums">{load}%</span>
                </div>
                <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${load}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  We keep every node under 70% sustained load — headroom is what keeps TPS at 20.
                  Heavy modpacks automatically bump you to a Ryzen 5900X tier.
                </p>
              </div>
            </div>
          </Reveal>

          {/* recommendation */}
          <Reveal delay={120}>
            <div className="relative h-full">
              <div
                key={rec.id + String(modded)}
                className="pop-in flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 md:p-9"
                style={{ boxShadow: `0 30px 90px ${rec.series.accent}22` }}
              >
                <div className="h-1 w-16 rounded-full" style={{ background: rec.series.accent }} />
                <div className="mt-5 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" style={{ color: rec.series.accent }} />
                  <span className="font-mono2 text-[10px] tracking-[0.35em]" style={{ color: rec.series.accent }}>
                    RECOMMENDED FOR YOU
                  </span>
                </div>
                <p className="mt-2 font-mono2 text-[9px] tracking-[0.3em] text-slate-500">
                  {rec.series.name}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-800 tracking-tight text-white md:text-3xl">
                  {rec.plan.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-900 tracking-tight text-white">
                    ₹{rec.plan.price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-mono2 text-xs text-slate-500">/MONTH · INSTANT SETUP</span>
                </div>

                <ul className="mt-7 space-y-3.5">
                  {[rec.plan.ram, rec.plan.cpu, rec.plan.storage, `${rec.plan.slots} · DDoS included`].map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: `${rec.series.accent}22` }}>
                        <Check className="h-3 w-3" style={{ color: rec.series.accent }} />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    onClick={() => openOrder(rec.id)}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-700 text-white transition-all duration-300 hover:brightness-110"
                    style={{ background: `linear-gradient(90deg, ${rec.series.accent}, ${rec.series.accent}bb)`, boxShadow: `0 16px 40px ${rec.series.accent}44` }}
                  >
                    ORDER {rec.plan.name} — 60s
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3.5 text-center font-mono2 text-[9px] tracking-[0.3em] text-slate-600">
                    UPI · GPAY · PAYTM · PHONEPE · CRYPTO
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
