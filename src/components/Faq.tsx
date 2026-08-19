import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "How fast is “instant setup”, really?",
    a: "Median provisioning time is 47 seconds from successful payment. UPI confirmations are near-instant, so your server IP is usually in your inbox before you've closed the payment app.",
  },
  {
    q: "Can I run modpacks like All the Mods or Better MC?",
    a: "Yes — one-click installer for 40+ popular packs on Fabric, Forge, NeoForge and Paper. The plan builder automatically recommends a higher tier for heavy modded servers so you never chase TPS.",
  },
  {
    q: "What payments do you accept?",
    a: "UPI (GPay, PhonePe, Paytm and any UPI app), plus BTC, ETH and USDT for crypto. No foreign card gymnastics, no hidden conversion fees — the price you see is the price you pay.",
  },
  {
    q: "What does the MCP AI agent actually do?",
    a: "It connects to your server through the Model Context Protocol: it scans every uploaded plugin for malware, watches TPS and RAM, fixes lag (item pile-ups, bad chunks), takes nightly backups and answers support questions in Discord — autonomously, 24/7.",
  },
  {
    q: "Is there a refund policy?",
    a: "48-hour no-questions refund on first purchases, and SLA credits automatically applied if uptime ever dips below 99.9% in a month. You never have to file a ticket to get what you're owed.",
  },
  {
    q: "Do I get a free domain / subdomain?",
    a: "Every plan includes a free yourname.flux.host subdomain, full file access via SFTP, a web console, and one-click DNS wiring if you bring your own domain.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative mx-auto max-w-4xl px-5 pb-24 pt-4 md:px-8 md:pb-32">
      <Reveal>
        <p className="text-center font-mono2 text-[10px] tracking-[0.5em] text-indigo-600">// QUESTIONS, ANSWERED</p>
        <h2 className="mt-4 text-center font-display text-3xl font-800 tracking-tight text-slate-900 md:text-5xl">
          BEFORE YOU <span className="grad-text">ASK</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3.5">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 70}>
              <div className={`acc overflow-hidden rounded-2xl border transition-all duration-500 ${isOpen ? "open border-indigo-200 bg-white shadow-[0_20px_50px_rgba(79,70,229,0.08)]" : "border-slate-200/80 bg-white/60 hover:border-slate-300"}`}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-700 text-slate-800 md:text-[15px]">{f.q}</span>
                  <span
                    className={`acc-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
                      isOpen ? "border-indigo-300 bg-indigo-50 text-indigo-600" : "border-slate-200 text-slate-400"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className="acc-body">
                  <div>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
