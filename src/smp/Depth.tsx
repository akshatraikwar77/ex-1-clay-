import { useEffect, useRef, useState } from "react";
import { Coins, ShieldCheck, Sparkles, CalendarDays, Users, Skull } from "lucide-react";
import Reveal from "../components/Reveal";
import { FEATURES } from "./data";

const ICONS: Record<string, typeof Coins> = {
  coins: Coins, shield: ShieldCheck, sparkles: Sparkles, calendar: CalendarDays, users: Users, skull: Skull,
};
const TINTS = ["clay-mint", "clay-sky", "clay-butter", "clay-lilac", "clay-pink", "clay-coral"];
const TILTS = ["-1.2deg", "1deg", "-0.8deg", "1.2deg", "-1deg", "0.8deg"];

function useCountUp(target: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1800);
      setV(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return v;
}

export default function Depth() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const players = useCountUp(4812, run);
  const crates = useCountUp(2418, run);
  const blocks = useCountUp(18, run);

  return (
    <section id="world" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <span className="clay clay-sky inline-block rounded-full px-4 py-1.5 font-mono2 text-[10px] font-700 tracking-[0.25em] text-white">// THE WORLD</span>
            <h2 className="mt-5 font-display text-4xl font-700 text-[#4a3b2f] emboss md:text-5xl">
              Everything you need to <span className="text-[#e8654c] emboss-color">thrive</span>
            </h2>
          </div>
        </Reveal>

        {/* clay progress tube */}
        <Reveal delay={100}>
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-3">
            <span className="font-display text-sm font-700 text-[#2ea877]">LVL 30</span>
            <div className="clay-tube h-5 flex-1">
              <span style={{ width: run ? "78%" : "0%" }} />
            </div>
            <span className="font-display text-sm font-700 text-[#2ea877]">LVL 31</span>
          </div>
        </Reveal>

        {/* varied clay feature cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <Reveal key={f.title} delay={i * 80} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div className={`clay ${TINTS[i]} wobble h-full rounded-[2rem] p-6`} style={{ rotate: TILTS[i] }}>
                  <span className="clay grid h-14 w-14 place-items-center rounded-2xl">
                    <Icon className="h-6 w-6" style={{ color: "#4a3b2f" }} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-700 text-white [text-shadow:0_2px_0_rgba(255,255,255,0.35)]">{f.title}</h3>
                  <p className="mt-1.5 text-[14px] font-700 leading-snug text-white/90 [text-shadow:0_1px_0_rgba(255,255,255,0.25)]">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* clay stat blobs */}
        <div ref={ref} className="mt-14 grid grid-cols-3 gap-4">
          {[
            [players.toLocaleString("en-IN"), "crafters", "clay-coral"],
            [crates.toLocaleString("en-IN"), "crates opened", "clay-butter"],
            [`${blocks}M`, "blocks placed", "clay-sky"],
          ].map(([v, l, tint], i) => (
            <Reveal key={l} delay={i * 90}>
              <div className={`clay ${tint} rounded-[2rem] px-3 py-6 text-center`}>
                <p className="stat-num font-display text-2xl font-700 text-white [text-shadow:0_2px_0_rgba(255,255,255,0.35)] md:text-3xl">{v}</p>
                <p className="mt-1 font-mono2 text-[9px] font-700 tracking-[0.2em] text-white/85">{String(l).toUpperCase()}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
