import { useEffect, useState, type CSSProperties } from "react";
import { Copy, Check, MessagesSquare, Heart } from "lucide-react";
import { SERVER_IP, DISCORD_URL, EVENTS } from "./data";

/* soft clay "block" */
function ClayBlock({ variant, className = "", style }: { variant: "grass" | "gold" | "diamond" | "tnt"; className?: string; style?: CSSProperties }) {
  const bgs: Record<string, string> = {
    grass: "linear-gradient(180deg, #a4f0cf 0 34%, #8a5a34 34% 100%)",
    gold: "linear-gradient(145deg, #ffe9a8, #ffcf52)",
    diamond: "radial-gradient(circle at 30% 30%, #e6f7ff 0 9%, transparent 10%), radial-gradient(circle at 68% 62%, #bfe8ff 0 8%, transparent 9%), linear-gradient(145deg, #b7ddff, #6cb9f5)",
    tnt: "linear-gradient(180deg, #ff8d77 0 22%, #fff7ec 22% 40%, #ff8d77 40% 100%)",
  };
  const shadows: Record<string, string> = {
    grass: "inset 5px 5px 10px rgba(255,255,255,0.55), inset -5px -6px 12px rgba(60,35,15,0.3), 0 18px 30px rgba(122,90,60,0.25)",
    gold: "inset 5px 5px 10px rgba(255,255,255,0.65), inset -5px -6px 12px rgba(180,130,20,0.25), 0 18px 30px rgba(224,169,46,0.3)",
    diamond: "inset 5px 5px 10px rgba(255,255,255,0.6), inset -5px -6px 12px rgba(30,100,160,0.25), 0 18px 30px rgba(61,143,212,0.3)",
    tnt: "inset 5px 5px 10px rgba(255,255,255,0.55), inset -5px -6px 12px rgba(190,70,45,0.3), 0 18px 30px rgba(232,101,76,0.3)",
  };
  return (
    <div
      className={`absolute rounded-[26%] ${className}`}
      style={{ background: bgs[variant], boxShadow: shadows[variant], ...style }}
    />
  );
}

const SCORE: Array<[string, string, string]> = [
  ["Players", "132", "#2ea877"],
  ["TPS", "20.0", "#3d8fd4"],
  ["Dragons", "47", "#9a6fe0"],
  ["Crates", "2,418", "#e0a92e"],
];

export default function HeroSmp() {
  const [copied, setCopied] = useState(false);
  const [online, setOnline] = useState(132);

  const copy = async () => {
    try { await navigator.clipboard.writeText(SERVER_IP); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    const t = setInterval(() => setOnline((o) => Math.max(90, Math.min(190, o + Math.round((Math.random() - 0.45) * 6)))), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-40 md:pt-44">
      {/* clay sky props */}
      <div className="clay-sun absolute right-[8%] top-28 h-20 w-20 md:h-24 md:w-24" />
      <div className="clay-cloud drift-cloud h-10 w-32" style={{ top: "14%", ["--cd" as string]: "65s" } as CSSProperties} />
      <div className="clay-cloud drift-cloud h-8 w-24" style={{ top: "30%", ["--cd" as string]: "90s", animationDelay: "-40s" } as CSSProperties} />
      <div className="clay-cloud drift-cloud h-12 w-36" style={{ top: "52%", ["--cd" as string]: "110s", animationDelay: "-70s" } as CSSProperties} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left */}
        <div>
          <span className="clay clay-mint inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono2 text-[10px] font-700 tracking-[0.2em] text-white">
            <span className="pulse-dot h-2 w-2 rounded-full bg-white" /> SEASON 03 • LIVE
          </span>

          <h1 className="mt-6 font-display text-5xl font-700 leading-[1.02] text-[#4a3b2f] emboss sm:text-6xl md:text-7xl">
            A whole world
            <br />
            made of <span className="text-[#e8654c] emboss-color">soft</span>
            <br />
            <span className="text-[#2ea877] emboss-color">adventure.</span>
          </h1>

          <p className="mt-6 max-w-md text-[16px] font-600 leading-relaxed text-[#7a6a58]">
            FLUX SMP is India's friendliest survival server — player economy, land claims,
            custom enchants, weekly events and loot crates that actually deliver.
          </p>

          {/* clay sign with IP */}
          <button onClick={copy} className="group mt-8 flex flex-col items-center outline-none">
            <span className="clay clay-butter wobble flex items-center gap-3 rounded-2xl px-6 py-4">
              {copied ? <Check className="h-5 w-5 text-[#2ea877]" /> : <Copy className="h-5 w-5 text-[#8a6a20]" />}
              <span className="font-display text-lg font-700 tracking-wide text-[#6b4e12]">
                {copied ? "Copied! See you at spawn" : SERVER_IP}
              </span>
            </span>
            <span className="h-6 w-3 rounded-b-md bg-gradient-to-b from-[#a97c4f] to-[#8a5a34] shadow-[inset_2px_0_3px_rgba(255,255,255,0.3),inset_-2px_0_3px_rgba(0,0,0,0.2)]" />
          </button>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="clay-btn clay-sky flex items-center gap-2 px-6 py-3.5 font-display text-base font-700 text-white">
              <MessagesSquare className="h-5 w-5" /> Join the Discord
            </a>
            <a href="#shop" className="clay-btn clay-coral px-6 py-3.5 font-display text-base font-700 text-white">
              Visit the Store
            </a>
            <span className="flex items-center gap-1 pl-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className="h-4 w-4 text-[#ff6b8a]" fill="currentColor" />
              ))}
              <span className="ml-1.5 font-mono2 text-[10px] font-700 text-[#7a6a58]">{online} online</span>
            </span>
          </div>
        </div>

        {/* right — clay diorama + scoreboard */}
        <div className="relative mx-auto h-[340px] w-full max-w-sm">
          <ClayBlock variant="grass" className="bob h-28 w-28" style={{ left: "30%", top: "26%", ["--tilt" as string]: "-4deg" } as CSSProperties} />
          <ClayBlock variant="diamond" className="bob h-16 w-16" style={{ left: "4%", top: "8%", ["--tilt" as string]: "6deg", animationDelay: "-1.2s" } as CSSProperties} />
          <ClayBlock variant="gold" className="bob h-14 w-14" style={{ right: "6%", top: "14%", ["--tilt" as string]: "-7deg", animationDelay: "-2.4s" } as CSSProperties} />
          <ClayBlock variant="tnt" className="bob h-14 w-14" style={{ right: "12%", bottom: "8%", ["--tilt" as string]: "5deg", animationDelay: "-0.8s" } as CSSProperties} />
          <ClayBlock variant="grass" className="bob h-12 w-12" style={{ left: "10%", bottom: "12%", ["--tilt" as string]: "8deg", animationDelay: "-3s" } as CSSProperties} />

          {/* scoreboard */}
          <div className="clay absolute -right-2 top-0 w-40 rounded-3xl p-4">
            <p className="text-center font-display text-sm font-700 text-[#4a3b2f]">Today on Flux</p>
            <div className="mt-3 space-y-2">
              {SCORE.map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="h-3 w-3 rounded-full" style={{ background: c, boxShadow: `inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.2)` }} />
                  <span className="flex-1 pl-2 font-sans text-xs font-800 text-[#7a6a58]">{k}</span>
                  <span className="stat-num font-display text-sm font-700" style={{ color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* event ticker — clay pills */}
      <div className="relative border-y-4 border-white/50 bg-white/40 py-4 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#fdf3e6] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#eaf4fd] to-transparent" />
        <div className="flex w-max marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0 items-center gap-3 pr-3">
              {EVENTS.map((e, i) => (
                <span key={i} className="clay flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-800 text-[#7a6a58]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: e.color }} />
                  <span style={{ color: e.color }}>{e.who}</span> {e.what}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
