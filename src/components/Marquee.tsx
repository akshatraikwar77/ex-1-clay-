import { Zap } from "lucide-react";

const ITEMS = [
  "AMD EPYC 9004 SERIES",
  "RYZEN 9 9950X · ZEN 5",
  "99.9% UPTIME SLA",
  "2.4 TBPS DDOS SHIELD",
  "NVMe GEN5 STORAGE",
  "INSTANT SETUP < 60s",
  "AI AGENT · MCP CORE",
  "MUMBAI · SINGAPORE · FFM",
  "DDRAM5 ECC",
  "AUTO MALWARE SCANNER",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((it, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-display text-sm font-700 tracking-[0.2em] md:text-base ${
              i % 2 === 0 ? "text-slate-400" : "text-transparent"
            }`}
            style={
              i % 2 !== 0
                ? { WebkitTextStroke: "1px var(--marquee-stroke)" }
                : undefined
            }
          >
            {it}
          </span>
          <Zap className="h-3.5 w-3.5 shrink-0 text-sky-400/70" fill="currentColor" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative z-20 border-y border-white/8 bg-[#06080f]/90 py-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#06080f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#06080f] to-transparent" />
      <div className="flex w-max marquee-track">
        <Row />
        <Row />
      </div>
    </section>
  );
}
