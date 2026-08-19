import { Gauge, Timer, Package, Gamepad2 } from "lucide-react";
import Reveal from "./Reveal";

const CHIPS = [
  { icon: Gauge, label: "20 TPS — LOCKED", accent: "#4ade80" },
  { icon: Timer, label: "9MS MUMBAI PING", accent: "#38bdf8" },
  { icon: Package, label: "ONE-CLICK MODPACKS", accent: "#a78bfa" },
];

const SOFTWARE = ["Paper", "Purpur", "Fabric", "Forge", "NeoForge", "Spigot", "Vanilla", "Bedrock"];

export default function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden border-y border-white/6 bg-[#05060d] py-24 md:py-32">
      <span className="watermark left-[-2%] top-6 select-none">CRAFT</span>
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-emerald-500/8 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono2 text-[10px] tracking-[0.5em] text-emerald-400">// THE GAME COMES FIRST</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
            BUILT FOR MINECRAFT.
            <br />
            <span className="grad-text">TUNED FOR INDIA.</span>
          </h2>
        </Reveal>

        {/* cinematic image card */}
        <Reveal delay={100}>
          <div className="group relative mt-12 overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <img
              src="./img/minecraft-world.jpg"
              alt="Voxel world hosted on FLUX HOST"
              className="h-[320px] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 md:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04050a] via-transparent to-[#04050a]/40" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

            {/* floating stat chips */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-3 p-5 md:p-8">
              {CHIPS.map((c, i) => (
                <div
                  key={c.label}
                  className="glass floaty flex items-center gap-2.5 rounded-xl px-4 py-3"
                  style={{ animationDelay: `${i * 1.2}s` }}
                >
                  <c.icon className="h-4 w-4" style={{ color: c.accent }} />
                  <span className="font-mono2 text-[10px] font-600 tracking-[0.2em] text-white md:text-[11px]">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            {/* corner tag */}
            <span className="glass absolute right-5 top-5 flex items-center gap-2 rounded-lg px-3 py-2 font-mono2 text-[9px] tracking-[0.25em] text-slate-300">
              <Gamepad2 className="h-3.5 w-3.5 text-emerald-400" /> RENDER: FLUX NODE 04
            </span>
          </div>
        </Reveal>

        {/* software support */}
        <Reveal delay={180}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-xs font-mono2 text-[10px] leading-relaxed tracking-[0.25em] text-slate-500">
              EVERY LOADER. EVERY VERSION. 1.8 → 1.21+
            </p>
            <div className="flex flex-wrap gap-2">
              {SOFTWARE.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono2 text-[11px] tracking-wider text-slate-300 transition-all hover:border-emerald-400/40 hover:text-emerald-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
