import type { MouseEvent } from "react";
import { Cpu, ShieldCheck, Bot, ScanSearch, Zap, Activity, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

function onSpot(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const card =
  "spot-card group relative rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.045] to-transparent p-6 transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_20px_60px_rgba(56,189,248,0.08)]";

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <span className="watermark right-[-3%] top-4 select-none">EPYC</span>
      <Reveal>
        <p className="font-mono2 text-[10px] tracking-[0.5em] text-sky-400">// WHY FLUX</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
          BUILT LIKE A DATACENTER.
          <br />
          <span className="grad-text">PRICED LIKE A FRIEND.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {/* flagship card */}
        <Reveal className="md:col-span-2" delay={0}>
          <div className={card + " h-full min-h-[300px]"} onMouseMove={onSpot}>
            <div className="flex h-full flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-sm">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                  <Cpu className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-800 text-white md:text-2xl">
                  AMD EPYC &amp; RYZEN 9 SILICON
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Your world runs on the same delidded metal you just rotated — EPYC 9004
                  throughput or Ryzen 9 9950X boost. NVMe Gen5, DDR5, and nodes in Mumbai for
                  sub-20ms ping across India.
                </p>
                <a href="#plans" className="mt-5 inline-flex items-center gap-1.5 font-mono2 text-[11px] tracking-[0.25em] text-sky-300 transition-colors hover:text-sky-200">
                  PICK YOUR DIE <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              {/* animated core cluster */}
              <div className="relative mx-auto grid shrink-0 grid-cols-4 gap-2 md:mx-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="core-pulse block h-8 w-8 rounded-md border border-sky-400/25 bg-sky-400/10 md:h-10 md:w-10"
                    style={{
                      animationDelay: `${(i % 4) * 0.22 + Math.floor(i / 4) * 0.31}s`,
                      boxShadow: "inset 0 0 12px rgba(56,189,248,0.15)",
                    }}
                  />
                ))}
                <span className="pointer-events-none absolute -inset-6 rounded-2xl bg-sky-400/10 blur-2xl" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className={card + " h-full"} onMouseMove={onSpot}>
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-800 text-white">DDoS PROTECTION</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              2.4 Tbps edge shielding. Attacks are absorbed before they ever reach your SMP —
              included free on every plan.
            </p>
            <div className="mt-5 flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="h-6 w-1 rounded-full bg-emerald-400/40" style={{ opacity: 0.25 + ((i * 7) % 10) / 13 }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0}>
          <div className={card + " h-full"} onMouseMove={onSpot}>
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10 text-violet-300">
              <Bot className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-800 text-white">AI AGENT · MCP</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              An autonomous agent wired to your server via Model Context Protocol. It watches,
              fixes, and answers — before you notice.
            </p>
            <a href="#mcp" className="mt-5 inline-flex items-center gap-1.5 font-mono2 text-[11px] tracking-[0.25em] text-violet-300 transition-colors hover:text-violet-200">
              SEE IT WORK <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className={card + " h-full"} onMouseMove={onSpot}>
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
              <ScanSearch className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-800 text-white">AUTO MALWARE SCANNER</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              Every plugin jar is fingerprinted on upload. Cracked or injected builds get
              quarantined automatically.
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className={card + " h-full"} onMouseMove={onSpot}>
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
              <Zap className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-800 text-white">INSTANT SETUP</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              Pay via UPI, get your server in under 60 seconds. No tickets, no waiting room,
              no "kindly wait 24 hours".
            </p>
          </div>
        </Reveal>

        <Reveal delay={0} className="md:col-span-2">
          <div className={card + " flex h-full items-center gap-6"} onMouseMove={onSpot}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-rose-400/30 bg-rose-400/10 text-rose-300">
              <Activity className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-800 text-white">99.9% UPTIME — GUARANTEED</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Redundant power, raided NVMe, live migration. If we ever dip, credits hit your
                account automatically.
              </p>
            </div>
            <div className="hidden shrink-0 items-end gap-1 md:flex">
              {[35, 55, 40, 70, 60, 85, 75, 95, 88, 100].map((h, i) => (
                <span key={i} className="block w-2.5 rounded-full bg-gradient-to-t from-sky-500/30 to-sky-400" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
