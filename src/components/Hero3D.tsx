import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ShieldCheck, ScanSearch, Activity } from "lucide-react";
import { CopyIpButton } from "./Navbar";
import ParticleField from "./ParticleField";
import type { TemplateId } from "./TemplateSwitcher";

/* ------------------------------------------------------------------ */
/*  FLUX HOST — 3D silicon reveal (multi-template)                     */
/*  Phase 1: chip rotates 0° → 90° (faces the sky)                     */
/*  Phase 2: the four dies break out and expand into hosting series    */
/* ------------------------------------------------------------------ */

type VariantCfg = {
  accents: [string, string, string, string];
  lerp: number;
  fan: [number, number, number, number];
  rzFrom: number;
};

const VARIANTS: Record<TemplateId, VariantCfg> = {
  neon: {
    accents: ["#22d3ee", "#a78bfa", "#38bdf8", "#fbbf24"],
    lerp: 0.09,
    fan: [0, 0, 0, 0],
    rzFrom: 0,
  },
  obsidian: {
    accents: ["#fde68a", "#f59e0b", "#fbbf24", "#f5e6c8"],
    lerp: 0.06,
    fan: [54, 12, 12, 54],
    rzFrom: -8,
  },
  matrix: {
    accents: ["#4ade80", "#22c55e", "#a3e635", "#86efac"],
    lerp: 0.12,
    fan: [28, 0, 0, 28],
    rzFrom: 4,
  },
};

type ModuleDef = {
  id: string;
  tag: string;
  name: string;
  dieTag: string;
  price: number;
  blurb: string;
  specs: string[];
  xFrac: number;
  zFrac: number;
  slot: { x: number; y: number };
  stagger: number;
};

const MODULES: ModuleDef[] = [
  {
    id: "budget",
    tag: "SERIES 01",
    name: "BUDGET",
    dieTag: "CCD-01",
    price: 149,
    blurb: "Starter SMPs, minigames & friends-only worlds.",
    specs: ["2 GB DDR5", "1 vCore", "10 GB NVMe"],
    xFrac: -0.36,
    zFrac: -0.235,
    slot: { x: -0.25, y: -0.24 },
    stagger: 0.0,
  },
  {
    id: "epyc",
    tag: "SERIES 02",
    name: "EPYC",
    dieTag: "IOD-02",
    price: 399,
    blurb: "Server-grade silicon. Massive parallel TPS.",
    specs: ["8 GB DDR5 ECC", "2× EPYC vCores", "40 GB NVMe"],
    xFrac: -0.12,
    zFrac: -0.078,
    slot: { x: 0.25, y: -0.24 },
    stagger: 0.07,
  },
  {
    id: "5900x",
    tag: "SERIES 03",
    name: "RYZEN 9 5900X",
    dieTag: "CCD-03",
    price: 649,
    blurb: "Big survival networks. Zero lag compromise.",
    specs: ["16 GB DDR5", "4× vCores · 4.8 GHz", "80 GB NVMe"],
    xFrac: 0.12,
    zFrac: 0.078,
    slot: { x: -0.25, y: 0.24 },
    stagger: 0.14,
  },
  {
    id: "9950x",
    tag: "SERIES 04",
    name: "RYZEN 9 9950X",
    dieTag: "NPU-04",
    price: 999,
    blurb: "Zen 5 flagship. The absolute ceiling of host.",
    specs: ["32 GB DDR5", "8× vCores · 5.7 GHz", "160 GB NVMe Gen5"],
    xFrac: 0.36,
    zFrac: 0.235,
    slot: { x: 0.25, y: 0.24 },
    stagger: 0.21,
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

export default function Hero3D({ variant = "neon" }: { variant?: TemplateId }) {
  const cfg = VARIANTS[variant];
  const heroRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dieRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const hudRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
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
    const lerpF = cfg.lerp;

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
    let phaseIdx = -1;
    const PHASES = [
      "PHASE 01 · ORIENTATION",
      "PHASE 02 · DIE SEPARATION",
      "PHASE 03 · SELECT YOUR SILICON",
    ];

    const apply = (p: number) => {
      const p1 = easeInOut(clamp01(p / 0.42));
      const p2 = clamp01((p - 0.4) / 0.6);
      const rx = 90 * p1;
      const rz = cfg.rzFrom * (1 - p1);

      const rig = rigRef.current;
      if (rig)
        rig.style.transform = `translateY(${(-3 * p1).toFixed(3)}vh) rotateX(${rx.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg)`;

      const base = baseRef.current;
      if (base) {
        base.style.opacity = String(1 - smooth(p2, 0, 0.55));
        base.style.transform = `translate3d(0px, ${(-170 * easeOut(p2)).toFixed(2)}px, 0px) scale(${(1 + 0.12 * p2).toFixed(4)})`;
      }

      const dieSize = chip * 0.3;
      const sx0 = dieSize / cw;
      const sy0 = dieSize / ch;
      const lift = 6 * p1;

      MODULES.forEach((m, i) => {
        const el = moduleRefs.current[i];
        if (!el) return;
        const e = easeOut(clamp01((p2 - m.stagger) / (1 - m.stagger)));
        let x = 0, y = lift, z = 2;
        if (mode === "h") {
          x = m.slot.x * chip + m.xFrac * W * e;
          y = lift + 30 * e;
          z = 2 + cfg.fan[i] * e;
        } else {
          z = -(m.zFrac * H + 40) * e + 2;
          y = lift + 26 * e;
        }
        const rot = -rx * e;
        const sx = sx0 + (1 - sx0) * e;
        const sy = sy0 + (1 - sy0) * e;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rot.toFixed(3)}deg) scale3d(${sx.toFixed(4)}, ${sy.toFixed(4)}, 1)`;

        const d = dieRefs.current[i];
        if (d) d.style.opacity = String(1 - smooth(e, 0.05, 0.5));
        const c = cardRefs.current[i];
        if (c) {
          const co = smooth(e, 0.45, 0.95);
          c.style.opacity = String(co);
          c.style.transform = `translateY(${(14 * (1 - co)).toFixed(2)}px)`;
        }
      });

      const hud = hudRef.current;
      if (hud) hud.style.opacity = String(1 - smooth(p2, 0.1, 0.45));
      if (rotRef.current) rotRef.current.textContent = String(Math.round(rx)).padStart(3, "0");
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (introRef.current) introRef.current.style.opacity = String(1 - smooth(p, 0.02, 0.18));
      if (outroRef.current) outroRef.current.style.opacity = String(smooth(p2, 0.5, 0.9));
      if (hintRef.current) hintRef.current.style.opacity = String(1 - smooth(p, 0.01, 0.1));
      if (groundRef.current)
        groundRef.current.style.opacity = String(clamp01(0.85 - 0.55 * p1 - 0.35 * p2));

      const ph = p < 0.4 ? 0 : p < 0.92 ? 1 : 2;
      if (ph !== phaseIdx && phaseRef.current) {
        phaseIdx = ph;
        phaseRef.current.textContent = PHASES[ph];
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
        st.c += (st.t - st.c) * lerpF;
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
  }, [cfg]);

  return (
    <section ref={heroRef} id="top" className="hero-scroll relative bg-void">
      <div className="hero-sticky">
        {/* ---------- ambient background ---------- */}
        <ParticleField variant={variant} />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="aurora absolute -left-40 top-1/4 h-[46rem] w-[46rem] rounded-full bg-sky-500/14 blur-[130px]" />
        <div className="aurora absolute -right-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-violet-600/14 blur-[130px]" style={{ animationDelay: "-7s" }} />
        <div className="hero-tint" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#04050a_82%)]" />

        {/* ---------- intro headline (fades on first scroll) ---------- */}
        <div
          ref={introRef}
          className="intro-headline absolute inset-x-0 top-[13vh] z-10 flex flex-col items-center px-6 text-center"
        >
          <p className="font-mono2 text-[10px] tracking-[0.5em] md:text-xs" style={{ color: "var(--acc1)" }}>
            FLUX HOST · SILICON SHOWCASE
          </p>
          <h1 className="mt-4 font-display text-4xl font-900 leading-[1.02] tracking-tight text-white md:text-7xl">
            THE CHIP BEHIND
            <br />
            <span className="grad-text">INDIA'S BEST SERVERS</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            AMD EPYC &amp; Ryzen 9 metal, delidded for you. Scroll — the die rotates to the sky,
            opens up, and becomes four hosting series.
          </p>
          <div className="mt-6 hidden md:block">
            <CopyIpButton />
          </div>
        </div>

        {/* ---------- outro headline (appears with the cards) ---------- */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-x-0 top-[10.5vh] z-10 flex flex-col items-center px-6 text-center opacity-0"
        >
          <p className="font-mono2 text-[10px] tracking-[0.5em] md:text-xs" style={{ color: "var(--acc3)" }}>
            04 SERIES DETECTED
          </p>
          <h2 className="mt-3 font-display text-3xl font-800 tracking-tight text-white md:text-5xl">
            EVERY DIE IS A <span className="grad-text">HOSTING LINE</span>
          </h2>
        </div>

        {/* ============================================================
            3D VIEWPORT — placeholder container.
            Drop a <video> or real 3D render of the Ryzen chip inside
            #cpu-3d-container (in place of .chip-rig) and it will ride
            the exact same scroll rig.
            ============================================================ */}
        <div id="cpu-3d-container" ref={viewRef} data-mode="horizontal">
          <div ref={mountRef} className="mount-wrap">
            <div ref={rigRef} className="chip-rig">
              {/* ---------- substrate ---------- */}
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

              {/* ---------- the four dies → series cards ---------- */}
              {MODULES.map((m, i) => (
                <div key={m.id} ref={(el) => { moduleRefs.current[i] = el; }} className="module">
                  {/* silicon die look */}
                  <div ref={(el) => { dieRefs.current[i] = el; }} className="module-die">
                    <div
                      className="die-block"
                      style={{ transitionDelay: `${450 + i * 130}ms`, ["--accent" as string]: `${cfg.accents[i]}55` }}
                    >
                      <div className="die-etch" />
                      <div className="die-sheen" />
                      <div className="die-glowline" />
                      <span className="die-tag">{m.dieTag} · FLUX</span>
                    </div>
                  </div>
                  {/* exploded series card */}
                  <a
                    href="#plans"
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="module-card group"
                    style={{ ["--accent" as string]: cfg.accents[i] }}
                    aria-label={`${m.name} series plans`}
                  >
                    <span className="card-sheen" />
                    <div className="mc-visual relative flex h-20 items-end overflow-hidden border-b border-white/8 px-4 pb-2">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background:
                            "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 8px)",
                        }}
                      />
                      <div className="relative flex gap-1">
                        {Array.from({ length: 8 }).map((_, k) => (
                          <span
                            key={k}
                            className="core-pulse block h-2 w-2 rounded-[2px]"
                            style={{
                              background: cfg.accents[i],
                              boxShadow: `0 0 8px ${cfg.accents[i]}`,
                              animationDelay: `${k * 0.18}s`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="absolute right-3 top-2.5 font-mono2 text-[9px] tracking-[0.25em] text-slate-500">
                        {m.dieTag}
                      </span>
                    </div>
                    <div className="mc-body flex flex-1 flex-col justify-between p-4 md:p-5">
                      <div>
                        <span
                          className="inline-block rounded-full border px-2 py-0.5 font-mono2 text-[9px] tracking-[0.25em]"
                          style={{ color: cfg.accents[i], borderColor: `${cfg.accents[i]}44`, background: `${cfg.accents[i]}11` }}
                        >
                          {m.tag}
                        </span>
                        <h3 className="mt-2 font-display text-base font-800 leading-tight text-white md:text-lg">
                          {m.name}
                        </h3>
                        <p className="mc-blurb mt-1 hidden text-[11px] leading-snug text-slate-400 md:block">
                          {m.blurb}
                        </p>
                        <ul className="mc-specs mt-3 flex flex-col gap-1.5">
                          {m.specs.map((s) => (
                            <li key={s} className="flex items-center gap-2 font-mono2 text-[10px] tracking-wider text-slate-300">
                              <span className="h-1 w-1 rounded-full" style={{ background: cfg.accents[i] }} />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mc-foot mt-4 flex items-center justify-between border-t border-white/8 pt-3">
                        <span className="from-lb font-mono2 text-[10px] tracking-widest text-slate-500">FROM</span>
                        <span className="flex items-baseline gap-1">
                          <span className="font-display text-xl font-800" style={{ color: cfg.accents[i] }}>
                            ₹{m.price}
                          </span>
                          <span className="font-mono2 text-[9px] text-slate-500">/MO</span>
                        </span>
                        <span className="mc-arrow grid h-7 w-7 place-items-center rounded-full border transition-transform duration-300 group-hover:translate-x-1"
                          style={{ borderColor: `${cfg.accents[i]}55`, color: cfg.accents[i] }}
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

          {/* ground glow under the chip */}
          <div
            ref={groundRef}
            className="pointer-events-none absolute bottom-[24%] left-1/2 h-[9vmin] w-[62vmin] -translate-x-1/2 rounded-[100%] bg-black/70 blur-2xl"
          />
        </div>

        {/* ---------- HUD ---------- */}
        <div ref={hudRef} className="pointer-events-none absolute inset-0 z-10">
          <span className="hud-corner left-5 top-24 border-l-2 border-t-2 md:top-28" style={{ borderColor: "rgba(var(--acc-rgb),0.5)" }} />
          <span className="hud-corner right-5 top-24 border-r-2 border-t-2 md:top-28" style={{ borderColor: "rgba(var(--acc-rgb),0.5)" }} />
          <span className="hud-corner bottom-6 left-5 border-b-2 border-l-2" style={{ borderColor: "rgba(var(--acc-rgb),0.5)" }} />
          <span className="hud-corner bottom-6 right-5 border-b-2 border-r-2" style={{ borderColor: "rgba(var(--acc-rgb),0.5)" }} />

          <div className="hud-readout hud-flicker left-9 top-[15.5vh] hidden md:block">
            <p>FLUX SILICON LAB — BOM-01</p>
            <p className="mt-1" style={{ color: "var(--acc1)" }}>ROTATION <span ref={rotRef}>000</span>°</p>
            <p>CORES 16 · THREADS 32</p>
            <p>BOOST 5.7 GHZ · TDP 170W</p>
          </div>
          <div className="hud-readout hud-flicker right-9 top-[15.5vh] hidden text-right md:block">
            <p className="flex items-center justify-end gap-1.5">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> THREAT SHIELD — ACTIVE
            </p>
            <p className="mt-1 flex items-center justify-end gap-1.5">
              <ScanSearch className="h-3 w-3" style={{ color: "var(--acc1)" }} /> MALWARE SCAN — CLEAN
            </p>
            <p className="mt-1 flex items-center justify-end gap-1.5">
              <Activity className="h-3 w-3 text-violet-300" /> MCP LINK — SYNCED
            </p>
            <p className="mt-1 text-slate-500">SCROLL <span ref={pctRef}>000</span>%</p>
          </div>

          <div className="absolute right-9 top-[13vh] hidden items-center gap-3 md:flex">
            <span className="hud-chip-line w-10" />
            <span ref={phaseRef} className="font-mono2 text-[10px] tracking-[0.3em] text-slate-300">
              PHASE 01 · ORIENTATION
            </span>
          </div>

          <div ref={hintRef} className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2">
            <span className="font-mono2 text-[10px] tracking-[0.4em] text-slate-400">
              SCROLL — ROTATE THE DIE
            </span>
            <ChevronDown className="scroll-cue-line h-4 w-4" style={{ color: "var(--acc1)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
