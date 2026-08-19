import { useEffect, useRef, useState } from "react";
import { Terminal, Plug, Eye, Wrench, BadgeCheck, Lock } from "lucide-react";
import Reveal from "./Reveal";

type Line = { who: "user" | "agent" | "sys"; text: string };

const SCRIPT: Line[] = [
  { who: "sys", text: "mcp.link established — agent@flux-core" },
  { who: "agent", text: "Running nightly integrity sweep on world 'FluxSMP'…" },
  { who: "agent", text: "plugins/cracked-*.jar → signature mismatch. Quarantined ✓" },
  { who: "agent", text: "Snapshot backup #412 saved (2.3 GB, 11s) ✓" },
  { who: "user", text: "bro my server is lagging since evening" },
  { who: "agent", text: "TPS detected at 11.2 — entity pile-up at spawn chunks." },
  { who: "agent", text: "Culled 3.4k items, restarted with +2GB RAM. TPS 20.0 ✓" },
  { who: "user", text: "yooo that was fast lol" },
  { who: "agent", text: "Always. Uptime is my KPI. Anything else?" },
];

const STEPS = [
  { icon: Plug, title: "CONNECT", desc: "The agent links to your server console, files & backups through open MCP tools." },
  { icon: Eye, title: "OBSERVE", desc: "It watches TPS, RAM, threats and player reports in real time — no human polling." },
  { icon: Wrench, title: "ACT", desc: "It quarantines malware, restarts, scales RAM and answers players — instantly." },
];

export default function MCPAgent() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let li = 0;
    let ch = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (li >= SCRIPT.length) {
        timer = setTimeout(() => {
          setLines([]);
          setTyped("");
          li = 0;
          ch = 0;
          step();
        }, 5200);
        return;
      }
      const line = SCRIPT[li];
      if (ch <= line.text.length) {
        setTyped(line.text.slice(0, ch));
        ch += 1 + Math.floor(Math.random() * 2);
        timer = setTimeout(step, 18 + Math.random() * 30);
      } else {
        setLines((prev) => [...prev.slice(-7), line]);
        setTyped("");
        li += 1;
        ch = 0;
        timer = setTimeout(step, line.who === "sys" ? 500 : 780);
      }
    };
    step();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines, typed]);

  return (
    <section id="mcp" className="relative border-y border-white/6 bg-[#06080f] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* left copy */}
        <div>
          <Reveal>
            <div className="floaty relative mb-7 h-28 w-28 overflow-hidden rounded-2xl border border-violet-400/30 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
              <img src="./img/ai-orb.jpg" alt="FLUX AI agent core" className="h-full w-full object-cover" />
              <span className="absolute bottom-1.5 left-2 font-mono2 text-[8px] tracking-[0.25em] text-violet-200">
                AGENT // MCP
              </span>
              <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
            </div>
            <p className="font-mono2 text-[10px] tracking-[0.5em] text-violet-400">
              // AI AGENT · MODEL CONTEXT PROTOCOL
            </p>
            <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
              A HOSTING TEAMMATE
              <br />
              <span className="grad-text">THAT NEVER SLEEPS</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Every FLUX server ships with an autonomous agent powered by MCP — the Model
              Context Protocol. It reads your server like an engineer and acts like one:
              automatic malware checks, live performance fixes, and instant player support.
              No tickets. No waiting.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-violet-400/30">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10 text-violet-300">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono2 text-xs tracking-[0.3em] text-violet-300">{s.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["console.control", "fs.scan", "backup.exec", "player.support"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono2 text-[10px] tracking-widest text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* terminal */}
        <Reveal delay={120}>
          <div className="relative">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/40 via-transparent to-sky-500/40 blur-[2px]" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070a12]/95 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 flex items-center gap-2 font-mono2 text-[11px] text-slate-400">
                    <Terminal className="h-3.5 w-3.5" /> flux-agent — mcp
                  </span>
                </div>
                <span className="flex items-center gap-2 font-mono2 text-[10px] tracking-widest text-emerald-400">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" /> CONNECTED
                </span>
              </div>
              {/* body */}
              <div ref={boxRef} className="term-body relative h-[340px] overflow-y-auto scroll-smooth px-5 py-4 md:h-[400px]">
                <div className="scanline pointer-events-none absolute left-0 h-8 w-full bg-gradient-to-b from-transparent via-sky-400/8 to-transparent" />
                {lines.map((l, i) => (
                  <p key={i} className="whitespace-pre-wrap">
                    {l.who === "user" ? (
                      <span className="text-sky-300">[{l.who}@flux]</span>
                    ) : l.who === "sys" ? (
                      <span className="text-slate-500">[system]</span>
                    ) : (
                      <span className="text-emerald-400">[agent]</span>
                    )}
                    <span className="text-slate-300"> {l.text}</span>
                  </p>
                ))}
                {typed && (
                  <p className="whitespace-pre-wrap">
                    <span className={SCRIPT[Math.min(lines.length, SCRIPT.length - 1)]?.who === "user" ? "text-sky-300" : "text-emerald-400"}>[…]</span>
                    <span className="text-slate-300"> {typed}</span>
                    <span className="type-caret ml-0.5" />
                  </p>
                )}
                {!typed && <p className="text-slate-500">$ <span className="type-caret" /></p>}
              </div>
              {/* footer */}
              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 font-mono2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> sandboxed · read/write scoped</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="h-3 w-3 text-emerald-400" /> 0 breaches · 412 backups</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
