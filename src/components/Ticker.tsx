import { Server, ShieldCheck, Cpu, Zap, Bot, Gauge, IndianRupee, HardDrive } from "lucide-react";

const ITEMS = [
  { icon: Cpu, label: "AMD EPYC 9004", color: "#4f46e5" },
  { icon: Gauge, label: "99.9% UPTIME SLA", color: "#06b6d4" },
  { icon: ShieldCheck, label: "2.4 TBPS DDOS SHIELD", color: "#0e9f6e" },
  { icon: Zap, label: "SETUP < 60 SECONDS", color: "#f59e0b" },
  { icon: Bot, label: "MCP AI AGENT", color: "#7c3aed" },
  { icon: HardDrive, label: "NVMe GEN5", color: "#0891b2" },
  { icon: IndianRupee, label: "UPI · CRYPTO READY", color: "#e11d48" },
  { icon: Server, label: "MUMBAI-NODE EDGE", color: "#4f46e5" },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
        >
          <it.icon className="h-4 w-4" style={{ color: it.color }} />
          <span className="font-mono2 text-[11px] font-600 tracking-[0.2em] text-slate-600">{it.label}</span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <section className="relative z-10 border-y border-slate-200/80 bg-ice2/80 py-6 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#eef1fa] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#eef1fa] to-transparent" />
      <div className="flex w-max marquee-track">
        <Row />
        <Row />
      </div>
    </section>
  );
}
