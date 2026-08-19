import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Cpu, Gauge, HardDrive } from "lucide-react";
import { CopyIpButton } from "./Navbar";

/* ------------------------------------------------------------------ */
/*  FLUX HOST — ICE edition 3D reveal                                  */
/*  A: turntable spin + rotate to 90° (die faces the sky)              */
/*  B: dies lift into an exploded floating cluster                     */
/*  C: cluster spreads into the four series cards                      */
/* ------------------------------------------------------------------ */

type ModuleDef = {
  id: string;
  tag: string;
  name: string;
  dieTag: string;
  accent: string;
  price: number;
  blurb: string;
  specs: string[];
  xFrac: number;
  zFrac: number;
  clusterX: number;
  clusterZ: number;
  slot: { x: number; y: number };
  stagger: number;
};

const MODULES: ModuleDef[] = [
  {
    id: "budget", tag: "SERIES 01", name: "FLUX BUDGET", dieTag: "CCD-01",
    accent: "#0891b2", price: 200,
    blurb: "Noida DC budget nodes — testing, friends & dev.",
    specs: ["FROM 4 GB RAM", "2 vCORES · 10 GB SSD", "UPI · INSTANT SETUP"],
    xFrac: -0.36, zFrac: -0.235, clusterX: -0.15, clusterZ: 0.14,
    slot: { x: -0.25, y: -0.24 }, stagger: 0.0,
  },
  {
    id: "epyc", tag: "SERIES 02", name: "EPYC 7763", dieTag: "IOD-02",
    accent: "#7c3aed", price: 279,
    blurb: "64-core enterprise silicon · 99.9% uptime.",
    specs: ["FROM 2 GB DDR4", "EPYC 7763 · NVMe", "50% FASTER CHUNKS"],
    xFrac: -0.12, zFrac: -0.078, clusterX: 0.15, clusterZ: 0.14,
    slot: { x: 0.25, y: -0.24 }, stagger: 0.06,
  },
  {
    id: "5900x", tag: "SERIES 03", name: "RYZEN 5900X", dieTag: "CCD-03",
    accent: "#4f46e5", price: 399,
    blurb: "Max-performance VPS · 100% uptime guarantee.",
    specs: ["FROM 4 GB DDR4", "5900X · L7 DDOS SHIELD", "NO DATA LOSS"],
    xFrac: 0.12, zFrac: 0.078, clusterX: -0.15, clusterZ: -0.14,
    slot: { x: -0.25, y: 0.24 }, stagger: 0.12,
  },
  {
    id: "9950x", tag: "SERIES 04", name: "RYZEN 9 9950X", dieTag: "NPU-04",
    accent: "#d97706", price: 1299,
    blurb: "Zen 5 · 6.8 GHz turbo · DDR5 flagship.",
    specs: ["FROM 4 GB DDR5", "6.80 GHZ TURBO", "ZERO CPU STEAL"],
    xFrac: 0.36, zFrac: 0.235, clusterX: 0.15, clusterZ: -0.14,
    slot: { x: 0.25, y: 0.24 }, stagger: 0.18,
  },
];

const CAPS: Array<[number, number, number]> = [
  [50, 5, 12], [50, 95, -8], [5, 50, 4], [95, 50, -14],
  [31, 8, 20], [69, 8, -6], [31, 92, 10], [69, 92, -18],
  [8, 31, 6], [92, 31, -10], [8, 69, -4], [92, 69, 16],
  [42, 50, 8], [58, 50, -12], [50, 42, 5], [50, 58, -7],
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const smooth = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

export default function HeroV2() {
  const heroRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dieRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const stepRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const chipsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => el.classList.add("mounted"));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const view = viewRef.current;
    if (!hero || !view) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mode: "h" | "v" = "h";
    let W = 0, H = 0, chip = 320, cw = 240, ch = 360;

    const measure = () => {
      mode = window.innerWidth < 860 ? "v" : "h";
      view.dataset.mode = mode === "v" ? "vertical" : "horizontal";
      W = view.clientWidth;
      H = view.clientHeight;
      chip = chipRef.current?.offsetWidth ?? 320;
      const m0 = moduleRefs.current[0];
      cw = m0?.offsetWidth ?? 240;
      ch = m0?.offsetHeight ?? 360;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(view);

    const st = { t: 0, c: 0 };
    let lastStep = -1;

    const apply = (p: number) => {
      /* phase A — spin + rotate */
      const pA = easeInOut(clamp01(p / 0.35));
      /* phase B — explode to cluster */
      const pB = easeOut(clamp01((p - 0.33) / 0.34));
      /* phase C — spread to cards */
      const pC = easeOut(clamp01((p - 0.62) / 0.38));

      const rx = 90 * pA;
      const ry = 32 * pA;

      const rig = rigRef.current;
      if (rig)
        rig.style.transform = `translateY(${(-2.5 * pA).toFixed(3)}vh) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;

      const base = baseRef.current;
      if (base) {
        base.style.opacity = String(1 - smooth(pB, 0, 0.6));
        base.style.transform = `translate3d(0px, ${(-160 * pB).toFixed(2)}px, 0px) scale(${(1 + 0.1 * pB).toFixed(4)})`;
      }

      const dieSize = chip * 0.3;
      const sx0 = dieSize / cw;
      const sy0 = dieSize / ch;
      const sxMid = (dieSize * 1.35) / cw;
      const syMid = (dieSize * 1.35) / ch;
      const lift = 5 * pA;

      MODULES.forEach((m, i) => {
        const el = moduleRefs.current[i];
        if (!el) return;
        const stB = easeOut(clamp01((pB - m.stagger) / (1 - m.stagger)));
        const eC = easeOut(clamp01((pC - m.stagger * 0.6) / (1 - m.stagger * 0.6)));

        let x: number, y = lift, z: number, eTot: number;
        if (mode === "h") {
          const cX = m.clusterX * W;
          const sX = m.xFrac * W;
          const cZ = m.clusterZ * H;
          x = m.slot.x * chip + cX * stB + (sX - cX) * eC;
          z = 2 + cZ * stB + (0 - cZ) * eC;
          y = lift + 40 * stB + 18 * eC;
          eTot = Math.max(stB, eC);
        } else {
          eTot = Math.max(stB, eC);
          x = 0;
          z = -(m.zFrac * H + 40) * eTot + 2;
          y = lift + 30 * eTot;
        }

        const rot = -rx * eTot;
        const sx = sx0 + (sxMid - sx0) * stB + (1 - sxMid) * eC;
        const sy = sy0 + (syMid - sy0) * stB + (1 - syMid) * eC;

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rot.toFixed(3)}deg) scale3d(${sx.toFixed(4)}, ${sy.toFixed(4)}, 1)`;

        const d = dieRefs.current[i];
        if (d) d.style.opacity = String(1 - smooth(eTot, 0.55, 0.95));
        const c = cardRefs.current[i];
        if (c) {
          const co = smooth(eTot, 0.5, 0.95);
          c.style.opacity = String(co);
          c.style.transform = `translateY(${(14 * (1 - co)).toFixed(2)}px)`;
        }
      });

      if (introRef.current) introRef.current.style.opacity = String(1 - smooth(p, 0.02, 0.16));
      if (outroRef.current) outroRef.current.style.opacity = String(smooth(pC, 0.35, 0.85));
      if (hintRef.current) hintRef.current.style.opacity = String(1 - smooth(p, 0.01, 0.08));
      if (chipsRef.current) chipsRef.current.style.opacity = String((1 - smooth(pC, 0, 0.4)) * (0.4 + 0.6 * pA));
      if (groundRef.current)
        groundRef.current.style.opacity = String(clamp01(0.9 - 0.6 * pA - 0.3 * pB));

      const step = p < 0.35 ? 0 : p < 0.64 ? 1 : 2;
      if (step !== lastStep) {
        lastStep = step;
        stepRefs.current.forEach((s, i) => s?.classList.toggle("active", i === step));
      }
    };

    const onScroll = () => {
      const total = hero.offsetHeight - window.innerHeight;
      st.t = clamp01(-hero.getBoundingClientRect().top / Math.max(1, total));
    };
    onScroll();

    let raf = 0;
    const tick = () => {
      if (reduced) st.c = st.t;
      else {
        st.c += (st.t - st.c) * 0.09;
        if (Math.abs(st.t - st.c) < 0.0004) st.c = st.t;
      }
      apply(st.c);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={heroRef} id="top" className="hero-scroll relative">
      <div className="hero-sticky">
        {/* ---------- light aurora background ---------- */}
        <div className="absolute inset-0 grid-bg-light" />
        <div className="aurora absolute -left-48 top-10 h-[42rem] w-[42rem] rounded-full bg-indigo-300/45 blur-[120px]" />
        <div className="aurora absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-cyan-300/45 blur-[120px]" style={{ animationDelay: "-6s" }} />
        <div className="aurora absolute left-1/3 top-1/2 h-[26rem] w-[26rem] rounded-full bg-amber-200/50 blur-[110px]" style={{ animationDelay: "-11s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#f5f7fd_85%)]" />

        {/* ---------- intro (fades on first scroll) ---------- */}
        <div
          ref={introRef}
          className="absolute left-6 top-[19vh] z-10 max-w-xl px-4 md:left-24 md:top-[21vh]"
        >
          <p className="font-mono2 text-[10px] tracking-[0.5em] text-indigo-600 md:text-xs">
            FLUX HOST · INDIA'S PREMIER HOSTING
          </p>
          <h1 className="mt-4 font-display text-4xl font-800 leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            SILICON THAT
            <br />
            <span className="grad-text">SERVES YOUR SERVER</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
            AMD EPYC &amp; Ryzen 9 nodes, an MCP-powered AI agent, and setup in under a minute.
            Scroll — the die spins skyward and opens into four series.
          </p>
          <div className="mt-5 hidden md:block">
            <CopyIpButton />
          </div>
        </div>

        {/* ---------- outro ---------- */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-x-0 top-[9vh] z-10 flex flex-col items-center px-6 text-center opacity-0"
        >
          <p className="font-mono2 text-[10px] tracking-[0.5em] text-amber-600 md:text-xs">
            04 SERIES DETECTED
          </p>
          <h2 className="mt-2.5 font-display text-2xl font-800 tracking-tight text-slate-900 md:text-4xl">
            PICK YOUR <span className="grad-text">SILICON</span>
          </h2>
        </div>

        {/* ============================================================
            3D VIEWPORT — placeholder container.
            Drop a <video> / 3D render of the Ryzen chip inside
            #cpu-3d-container (replacing .chip-rig); the scroll rig
            (spin → explode → spread) carries it automatically.
            ============================================================ */}
        <div id="cpu-3d-container" ref={viewRef} data-mode="horizontal">
          <div ref={mountRef} className="mount-wrap">
            <div ref={rigRef} className="chip-rig">
              {/* substrate */}
              <div ref={baseRef} className="chip-base">
                <div className="chip-top">
                  <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="none">
                    <rect width="200" height="200" fill="#06180f" fillOpacity="0.45" />
                    <g stroke="#d8b96a" strokeWidth="1" fill="none" opacity="0.5">
                      <path d="M10 24 H60 V10" />
                      <path d="M190 24 H140 V10" />
                      <path d="M10 176 H60 V190" />
                      <path d="M190 176 H140 V190" />
                      <path d="M24 10 V24" />
                      <path d="M176 10 V24" />
                      <path d="M24 190 V176" />
                      <path d="M176 190 V176" />
                      <path d="M10 70 H30 V60" />
                      <path d="M190 70 H170 V60" />
                      <path d="M10 130 H30 V140" />
                      <path d="M190 130 H170 V140" />
                    </g>
                    <g fill="#caa24a">
                      {Array.from({ length: 13 }).map((_, i) => (
                        <rect key={`t${i}`} x={16 + i * 13.4} y="3" width="6" height="4" rx="1" opacity="0.85" />
                      ))}
                      {Array.from({ length: 13 }).map((_, i) => (
                        <rect key={`b${i}`} x={16 + i * 13.4} y="193" width="6" height="4" rx="1" opacity="0.85" />
                      ))}
                      {Array.from({ length: 13 }).map((_, i) => (
                        <rect key={`l${i}`} x="3" y={16 + i * 13.4} width="4" height="6" rx="1" opacity="0.85" />
                      ))}
                      {Array.from({ length: 13 }).map((_, i) => (
                        <rect key={`r${i}`} x="193" y={16 + i * 13.4} width="4" height="6" rx="1" opacity="0.85" />
                      ))}
                    </g>
                    <g fill="#e6c877">
                      <circle cx="34" cy="34" r="2.2" />
                      <circle cx="166" cy="34" r="2.2" />
                      <circle cx="34" cy="166" r="2.2" />
                      <circle cx="166" cy="166" r="2.2" />
                    </g>
                    <text x="14" y="196.5" fontSize="6.5" fill="#9ff0c8" fontFamily="JetBrains Mono, monospace" opacity="0.9">FLUX</text>
                    <text x="186" y="9" fontSize="6.5" fill="#9ff0c8" fontFamily="JetBrains Mono, monospace" textAnchor="end" opacity="0.75">RYZEN 9 9950X</text>
                  </svg>
                </div>
                <div className="chip-back" />
                <div className="chip-side n" />
                <div className="chip-side s" />
                <div className="chip-side e" />
                <div className="chip-side w" />
                {CAPS.map(([x, y, r], i) => (
                  <span
                    key={i}
                    className="capacitor"
                    style={{ left: `${x}%`, top: `${y}%`, transform: `translateZ(7px) rotateZ(${r}deg)`, transitionDelay: `${300 + i * 45}ms` }}
                  />
                ))}
              </div>

              {/* dies → series cards */}
              {MODULES.map((m, i) => (
                <div key={m.id} ref={(el) => { moduleRefs.current[i] = el; }} className="module">
                  <div ref={(el) => { dieRefs.current[i] = el; }} className="module-die">
                    <div
                      className="die-block"
                      style={{ transitionDelay: `${450 + i * 130}ms`, ["--accent" as string]: `${m.accent}66` }}
                    >
                      <div className="die-etch" />
                      <div className="die-sheen" />
                      <div className="die-glowline" />
                      <span className="die-tag">{m.dieTag} · FLUX</span>
                    </div>
                  </div>
                  <a
                    href="#plans"
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="module-card group"
                    style={{ ["--accent" as string]: m.accent }}
                    aria-label={`${m.name} series plans`}
                  >
                    <span className="card-sheen" />
                    <div className="mc-visual relative flex h-20 items-end overflow-hidden border-b border-slate-100 px-4 pb-2">
                      <div
                        className="absolute inset-0 opacity-50"
                        style={{
                          background:
                            "repeating-linear-gradient(0deg, rgba(15,23,42,0.05) 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, rgba(15,23,42,0.05) 0 1px, transparent 1px 8px)",
                        }}
                      />
                      <div className="relative flex gap-1">
                        {Array.from({ length: 8 }).map((_, k) => (
                          <span
                            key={k}
                            className="core-pulse block h-2 w-2 rounded-[2px]"
                            style={{ background: m.accent, boxShadow: `0 0 8px ${m.accent}`, animationDelay: `${k * 0.18}s` }}
                          />
                        ))}
                      </div>
                      <span className="absolute right-3 top-2.5 font-mono2 text-[9px] tracking-[0.25em] text-slate-400">
                        {m.dieTag}
                      </span>
                    </div>
                    <div className="mc-body flex flex-1 flex-col justify-between p-4 md:p-5">
                      <div>
                        <span
                          className="inline-block rounded-full border px-2 py-0.5 font-mono2 text-[9px] tracking-[0.25em]"
                          style={{ color: m.accent, borderColor: `${m.accent}40`, background: `${m.accent}0e` }}
                        >
                          {m.tag}
                        </span>
                        <h3 className="mt-2 font-display text-base font-800 leading-tight text-slate-900 md:text-lg">
                          {m.name}
                        </h3>
                        <p className="mc-blurb mt-1 hidden text-[11px] leading-snug text-slate-500 md:block">
                          {m.blurb}
                        </p>
                        <ul className="mc-specs mt-3 flex flex-col gap-1.5">
                          {m.specs.map((s) => (
                            <li key={s} className="flex items-center gap-2 font-mono2 text-[10px] tracking-wider text-slate-600">
                              <span className="h-1 w-1 rounded-full" style={{ background: m.accent }} />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mc-foot mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="from-lb font-mono2 text-[10px] tracking-widest text-slate-400">FROM</span>
                        <span className="flex items-baseline gap-1">
                          <span className="font-display text-xl font-800" style={{ color: m.accent }}>
                            ₹{m.price}
                          </span>
                          <span className="font-mono2 text-[9px] text-slate-400">/MO</span>
                        </span>
                        <span
                          className="mc-arrow grid h-7 w-7 place-items-center rounded-full border transition-transform duration-300 group-hover:translate-x-1"
                          style={{ borderColor: `${m.accent}50`, color: m.accent }}
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* soft ground shadow */}
          <div
            ref={groundRef}
            className="pointer-events-none absolute bottom-[24%] left-1/2 h-[9vmin] w-[62vmin] -translate-x-1/2 rounded-[100%] bg-slate-900/20 blur-2xl"
          />
        </div>

        {/* ---------- HUD: floating spec chips ---------- */}
        <div ref={chipsRef} className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          <span className="spec-chip glass-light left-[10%] top-[38%]">
            <Cpu className="h-3.5 w-3.5 text-indigo-500" /> 16 CORES · 32 THREADS
          </span>
          <span className="spec-chip glass-light right-[12%] top-[30%]">
            <Gauge className="h-3.5 w-3.5 text-cyan-500" /> 5.7 GHZ BOOST
          </span>
          <span className="spec-chip glass-light bottom-[26%] left-[16%]">
            <HardDrive className="h-3.5 w-3.5 text-amber-500" /> NVMe GEN5
          </span>
        </div>

        {/* ---------- HUD: phase stepper ---------- */}
        <div className="hud-stepper hidden md:flex">
          {["01 · SPIN", "02 · EXPLODE", "03 · EXPLORE"].map((label, i) => (
            <span
              key={label}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`hud-step ${i === 0 ? "active" : ""}`}
            >
              <span className="dot" />
              {label}
            </span>
          ))}
        </div>

        {/* scroll hint */}
        <div ref={hintRef} className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2">
          <span className="font-mono2 text-[10px] tracking-[0.4em] text-slate-500">
            SCROLL — SPIN THE DIE
          </span>
          <ChevronDown className="scroll-cue-line h-4 w-4 text-indigo-500" />
        </div>
      </div>
    </section>
  );
}

