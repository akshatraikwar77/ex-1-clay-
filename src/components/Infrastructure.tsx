import { useEffect, useRef, useState } from "react";
import { Check, X, MapPin, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/* ---------------- animated counter ---------------- */
function useCountUp(target: number, decimals = 0, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(parseFloat((target * e).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, decimals]);
  return val;
}

const PINGS = [
  { city: "MUMBAI", ms: 9, w: 22 },
  { city: "BANGALORE", ms: 12, w: 30 },
  { city: "DELHI NCR", ms: 14, w: 35 },
  { city: "CHENNAI", ms: 18, w: 45 },
  { city: "SINGAPORE", ms: 42, w: 70 },
  { city: "FRANKFURT", ms: 88, w: 100 },
];

const COMPARE: Array<[string, string, string]> = [
  ["CPU", "AMD EPYC 9004 · Ryzen 9 9950X", "Recycled Xeons from 2016"],
  ["Setup time", "Under 60 seconds", "Hours — 'kindly wait'"],
  ["DDoS protection", "2.4 Tbps, always free", "Paid add-on"],
  ["Malware defense", "AI scanner on every upload", "Hope for the best"],
  ["Support", "MCP AI agent + humans, 24/7", "Ticket queue purgatory"],
  ["Payments", "UPI · GPay · Paytm · PhonePe · Crypto", "Card only, foreign gateway"],
  ["Entry price", "₹149/mo", "₹499+/mo"],
];

function Counter({ target, decimals = 0, suffix, run, label }: {
  target: number; decimals?: number; suffix: string; run: boolean; label: string;
}) {
  const v = useCountUp(target, decimals, run);
  const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 text-center transition-colors hover:border-sky-400/30">
      <p className="font-display text-3xl font-900 tracking-tight text-white md:text-4xl">
        {formatted}
        <span className="text-sky-400">{suffix}</span>
      </p>
      <p className="mt-1.5 font-mono2 text-[9px] tracking-[0.3em] text-slate-500">{label}</p>
    </div>
  );
}

export default function Infrastructure() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="network" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <span className="watermark right-[-2%] top-10 select-none">PING</span>

      <div className="relative grid items-center gap-14 lg:grid-cols-2">
        {/* datacenter image */}
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <img
              src="./img/datacenter.jpg"
              alt="FLUX HOST datacenter"
              className="h-[340px] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 md:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04050a] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5 md:p-7">
              <div>
                <p className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.3em] text-sky-300">
                  <MapPin className="h-3.5 w-3.5" /> NODE · BOM-01
                </p>
                <p className="mt-1.5 font-display text-xl font-800 text-white">TIER-III · MUMBAI</p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono2 text-[9px] tracking-[0.25em] text-emerald-300">
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" /> ALL SYSTEMS GO
              </span>
            </div>
          </div>
        </Reveal>

        {/* ping panel */}
        <div ref={ref}>
          <Reveal>
            <p className="font-mono2 text-[10px] tracking-[0.5em] text-sky-400">// THE NETWORK</p>
            <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
              LOW PING.
              <br />
              <span className="grad-text">LITERALLY EVERYWHERE.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Mumbai-first routing with premium upstreams. Whether your squad is in Andheri or
              Frankfurt — your world stays in sync.
            </p>
          </Reveal>

          <div className="mt-9 space-y-3.5">
            {PINGS.map((p, i) => (
              <Reveal key={p.city} delay={i * 70}>
                <div className="flex items-center gap-4">
                  <span className="w-24 font-mono2 text-[10px] tracking-[0.2em] text-slate-400">{p.city}</span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/6">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all duration-[1400ms] ease-out"
                      style={{ width: run ? `${p.w}%` : "0%", transitionDelay: `${i * 120}ms` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono2 text-[11px] font-600 text-sky-300">
                    {p.ms}ms
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Counter target={99.9} decimals={1} suffix="%" run={run} label="UPTIME SLA" />
            <Counter target={6} suffix="" run={run} label="GLOBAL NODES" />
            <Counter target={4800} suffix="+" run={run} label="SERVERS DEPLOYED" />
            <Counter target={9} suffix="ms" run={run} label="AVG INDIA PING" />
          </div>
        </div>
      </div>

      {/* ---------------- comparison table ---------------- */}
      <div className="mt-24">
        <Reveal>
          <p className="text-center font-mono2 text-[10px] tracking-[0.5em] text-slate-500">
            // FLUX HOST VS "THE OTHER GUYS"
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[1.1fr_1.4fr_1.4fr] bg-white/[0.05] px-5 py-4 font-mono2 text-[9px] tracking-[0.25em] text-slate-500 md:px-8 md:text-[10px]">
              <span>METRIC</span>
              <span className="flex items-center gap-2 text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" /> FLUX HOST
              </span>
              <span>OTHERS</span>
            </div>
            {COMPARE.map(([metric, flux, other], i) => (
              <div
                key={metric}
                className={`grid grid-cols-[1.1fr_1.4fr_1.4fr] items-center gap-x-3 px-5 py-4 text-[12px] transition-colors hover:bg-white/[0.03] md:px-8 md:text-sm ${
                  i % 2 === 0 ? "bg-white/[0.015]" : ""
                }`}
              >
                <span className="font-600 text-slate-300">{metric}</span>
                <span className="flex items-start gap-2 text-slate-200">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  {flux}
                </span>
                <span className="flex items-start gap-2 text-slate-500">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400/70" />
                  {other}
                </span>
              </div>
            ))}
            <a
              href="#plans"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400/10 via-violet-500/10 to-sky-400/10 px-8 py-5 font-mono2 text-[11px] tracking-[0.3em] text-white transition-colors hover:from-sky-400/20 hover:to-sky-400/20"
            >
              SEE THE PLANS
              <ArrowRight className="h-4 w-4 text-sky-400 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
