import { useEffect, useRef, useState } from "react";
import { Bot, User, Wrench, ShieldCheck, Database, MessageSquareText, Zap } from "lucide-react";
import Reveal from "./Reveal";

type Msg = { from: "user" | "agent"; text: string; action?: string };

const SCRIPT: Msg[] = [
  { from: "user", text: "hey can someone check my server? feels laggy" },
  { from: "agent", text: "On it. Scanning node flux-04 for your world…", action: "TPS detected: 11.4" },
  { from: "agent", text: "Found it — 3.2k dropped items piled in spawn chunks. Clearing and restarting with +2 GB RAM.", action: "TPS restored: 20.0 ✓" },
  { from: "user", text: "wait that was fast. what about the weird plugin someone added?" },
  { from: "agent", text: "Already quarantined it — signature mismatch with the malware scanner. Full report is in your Discord.", action: "cracked-*.jar → quarantined ✓" },
  { from: "agent", text: "Nightly snapshot backup finished too. You're covered. Anything else?", action: "Backup #418 · 2.1 GB · 9s ✓" },
];

const CAPS = [
  { icon: ShieldCheck, title: "AUTO MALWARE SCAN", desc: "Every jar fingerprinted on upload. Injected builds never reach your world.", color: "#34d399" },
  { icon: Wrench, title: "SELF-HEALING NODES", desc: "Lag, crashes and bad configs are fixed before your players notice.", color: "#22d3ee" },
  { icon: Database, title: "SCHEDULED SNAPSHOTS", desc: "Off-site backups every night. Restore any point in time, one click.", color: "#818cf8" },
  { icon: MessageSquareText, title: "INSTANT SUPPORT", desc: "Answers in seconds, in Discord or in-game — powered by MCP tools.", color: "#fbbf24" },
];

export default function AgentChat() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (shown >= SCRIPT.length) {
      t = setTimeout(() => { setShown(0); }, 6000);
      return () => clearTimeout(t);
    }
    setTyping(true);
    t = setTimeout(() => {
      setTyping(false);
      setShown((s) => s + 1);
    }, 1700 + SCRIPT[shown].text.length * 12);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  return (
    <section id="agent" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono2 text-[10px] tracking-[0.5em] text-indigo-600">// AI AGENT · MODEL CONTEXT PROTOCOL</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-800 leading-tight tracking-tight text-slate-900 md:text-5xl">
          SUPPORT THAT ANSWERS
          <br />
          <span className="grad-text">IN SECONDS. AT 3 AM.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* chat window */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
              <span className="flex items-center gap-2.5 font-mono2 text-[11px] text-slate-500">
                <Bot className="h-4 w-4 text-indigo-500" /> flux-agent · live
              </span>
              <span className="flex items-center gap-2 font-mono2 text-[9px] tracking-[0.25em] text-emerald-600">
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" /> MCP CONNECTED
              </span>
            </div>

            <div ref={boxRef} className="flex h-[380px] flex-col gap-4 overflow-y-auto scroll-smooth p-5 md:h-[420px]">
              {SCRIPT.slice(0, shown).map((m, i) => (
                <div key={i} className={`pop-in flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      m.from === "user" ? "bg-slate-100 text-slate-500" : "bg-gradient-to-br from-indigo-500 to-cyan-400 text-white"
                    }`}
                  >
                    {m.from === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </span>
                  <div className={`max-w-[78%] ${m.from === "user" ? "items-end text-right" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                        m.from === "user"
                          ? "rounded-tr-sm bg-slate-100 text-slate-700"
                          : "rounded-tl-sm bg-gradient-to-br from-indigo-50 to-cyan-50 text-slate-700 border border-indigo-100"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.action && (
                      <div className="mt-1.5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono2 text-[10px] tracking-wider text-emerald-700">
                        <Zap className="h-3 w-3" /> {m.action}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && shown < SCRIPT.length && (
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-indigo-100 bg-indigo-50/60 px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-indigo-400" style={{ animationDelay: `${d * 0.18}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 font-mono2 text-[9px] tracking-[0.25em] text-slate-400">
              <span>console.control · fs.scan · backup.exec</span>
              <span>AVG RESPONSE 2.1s</span>
            </div>
          </div>
        </Reveal>

        {/* capabilities */}
        <div className="grid gap-4 sm:grid-cols-2">
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `${c.color}14`, color: c.color }}
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-mono2 text-[11px] font-700 tracking-[0.2em] text-slate-800">{c.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
