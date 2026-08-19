import { useEffect, useRef } from "react";
import { IndianRupee, Cpu, Gamepad2, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: IndianRupee,
    title: "PAY IN SECONDS",
    color: "#4f46e5",
    desc: "UPI, GPay, Paytm, PhonePe or crypto. No account creation marathon — checkout is three taps on your phone.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "NODE ARMS ITSELF",
    color: "#06b6d4",
    desc: "Your EPYC / Ryzen 9 vCores are pinned, files deployed, DDoS shield raised and malware scanner pre-loaded. ~45 seconds, hands-free.",
  },
  {
    n: "03",
    icon: Gamepad2,
    title: "PLAY. FOREVER.",
    color: "#f59e0b",
    desc: "IP lands in your inbox and Discord. From here the MCP agent watches TPS, threats and backups so you never babysit a console again.",
  },
];

export default function Steps() {
  const lineRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          lineRef.current?.classList.add("drawn");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={secRef} id="steps" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono2 text-[10px] tracking-[0.5em] text-indigo-600">// DEPLOY TIMELINE</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-800 leading-tight tracking-tight text-slate-900 md:text-5xl">
          FROM UPI TO
          <br />
          <span className="grad-text">ONLINE IN 60 SECONDS</span>
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* drawing line */}
        <div className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-0.5 bg-slate-200 md:block" />
        <div
          ref={lineRef}
          className="tline absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-0.5 md:block"
        />

        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 140}>
              <div className="group relative flex gap-5 md:gap-7">
                <span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-white shadow-[0_14px_40px_rgba(15,23,42,0.1)] transition-transform duration-500 group-hover:scale-110"
                  style={{ borderColor: `${s.color}30` }}
                >
                  <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  <span
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full font-mono2 text-[9px] font-700 text-white"
                    style={{ background: s.color }}
                  >
                    {i + 1}
                  </span>
                </span>
                <div className="flex-1 rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-800 tracking-wide text-slate-900 md:text-xl">
                      {s.title}
                    </h3>
                    <span className="font-mono2 text-[10px] tracking-[0.35em] text-slate-400">{s.n}</span>
                  </div>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={200}>
        <div className="mt-12 flex justify-center">
          <a
            href="#plans"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-7 py-3.5 text-sm font-700 text-white shadow-[0_16px_40px_rgba(79,70,229,0.35)] transition-all hover:shadow-[0_16px_50px_rgba(79,70,229,0.55)]"
          >
            BUILD YOUR PLAN
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
