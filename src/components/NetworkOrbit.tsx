import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import Reveal from "./Reveal";

function useCountUp(target: number, decimals: number, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1800);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(parseFloat((target * e).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, decimals]);
  return val;
}

const INNER = [
  { city: "MUMBAI", ms: 9, deg: 0 },
  { city: "DELHI", ms: 14, deg: 120 },
  { city: "CHENNAI", ms: 18, deg: 240 },
];
const OUTER = [
  { city: "BANGALORE", ms: 12, deg: 40 },
  { city: "SINGAPORE", ms: 42, deg: 160 },
  { city: "FRANKFURT", ms: 88, deg: 280 },
];

/* place a dot on the edge (radius = 50%) of its orbit wrapper */
function dotStyle(deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    left: `${50 + 50 * Math.cos(rad)}%`,
    top: `${50 + 50 * Math.sin(rad)}%`,
  };
}

function Counter({ target, decimals, suffix, run, label }: { target: number; decimals: number; suffix: string; run: boolean; label: string }) {
  const v = useCountUp(target, decimals, run);
  const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
      <p className="font-display text-3xl font-900 tracking-tight text-white tabular-nums">
        {formatted}
        <span className="text-cyan-300">{suffix}</span>
      </p>
      <p className="mt-1.5 font-mono2 text-[9px] tracking-[0.3em] text-slate-500">{label}</p>
    </div>
  );
}

export default function NetworkOrbit() {
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
    <section id="network" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 grid-bg-dark opacity-50" />
      <div className="aurora absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* orbit visual */}
        <Reveal>
          <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/* rings */}
            <div className="absolute inset-[18%] rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full border border-white/8" />
            <div className="absolute inset-[32%] rounded-full border border-dashed border-white/10 spin-slow" style={{ animationDuration: "50s" }} />

            {/* spinning ring wrappers */}
            <div className="orbit absolute inset-[18%]" style={{ animationDuration: "36s" }}>
              {INNER.map((c) => (
                <span key={c.city} className="absolute" style={dotStyle(c.deg)}>
                  <span className="orbit-rev block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-cyan-300/30 bg-ink/90 px-3 py-1.5 font-mono2 text-[9px] tracking-[0.2em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.15)]" style={{ animationDuration: "36s" }}>
                    {c.city} · {c.ms}ms
                  </span>
                </span>
              ))}
            </div>
            <div className="orbit-fast absolute inset-0" style={{ animationDuration: "22s" }}>
              {OUTER.map((c) => (
                <span key={c.city} className="absolute" style={dotStyle(c.deg)}>
                  <span className="orbit-rev block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-indigo-300/30 bg-ink/90 px-3 py-1.5 font-mono2 text-[9px] tracking-[0.2em] text-indigo-200" style={{ animationDuration: "22s" }}>
                    {c.city} · {c.ms}ms
                  </span>
                </span>
              ))}
            </div>

            {/* core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="pulse-dot absolute inset-0 rounded-full" />
              <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_60px_rgba(79,70,229,0.55)] md:h-28 md:w-28">
                <span className="text-center font-mono2 text-[9px] font-700 tracking-[0.2em] text-white">
                  FLUX
                  <br />
                  CORE
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* copy + counters */}
        <div>
          <Reveal>
            <p className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.5em] text-cyan-300">
              <MapPin className="h-4 w-4" /> THE NETWORK
            </p>
            <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
              MUMBAI FIRST.
              <br />
              <span className="grad-text">EVERYONE ELSE CLOSE.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Primary nodes in Mumbai with premium Indian upstreams, mirrored to Singapore and
              Frankfurt. Your players' blocks place in real time — whether they're in Andheri
              or on a train to Pune.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <Counter target={99.9} decimals={1} suffix="%" run={run} label="UPTIME SLA" />
            <Counter target={6} decimals={0} suffix="" run={run} label="GLOBAL NODES" />
            <Counter target={4800} decimals={0} suffix="+" run={run} label="SERVERS DEPLOYED" />
            <Counter target={9} decimals={0} suffix="ms" run={run} label="AVG INDIA PING" />
          </div>
        </div>
      </div>
    </section>
  );
}
