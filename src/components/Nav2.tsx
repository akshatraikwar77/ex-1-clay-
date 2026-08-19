import { useEffect, useState } from "react";
import { Zap, Menu, X, ArrowRight, Copy, Check } from "lucide-react";

const LINKS = [
  { label: "Deploy", href: "#steps" },
  { label: "Plan Finder", href: "#finder" },
  { label: "Plans", href: "#plans" },
  { label: "AI Agent", href: "#agent" },
  { label: "Network", href: "#network" },
  { label: "FAQ", href: "#faq" },
];

export function CopyIpLight({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("play.fluxsmp.fun");
    } catch {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 font-mono2 text-[11px] tracking-widest text-slate-600 transition-all hover:border-indigo-300 hover:text-indigo-600 ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "COPIED" : "play.fluxsmp.fun"}
    </button>
  );
}

export default function Nav2() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-12 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-light shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_8px_24px_rgba(79,70,229,0.4)]">
              <Zap className="h-4 w-4 text-white" fill="currentColor" />
            </span>
            <span className="font-display text-base font-800 tracking-tight text-slate-900">
              FLUX<span className="text-indigo-600">HOST</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-600 text-slate-600 transition-colors hover:bg-white/70 hover:text-indigo-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <CopyIpLight />
            <a
              href="#plans"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4.5 py-2.5 text-[13px] font-700 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all hover:shadow-[0_10px_40px_rgba(79,70,229,0.55)] hover:brightness-110"
            >
              Deploy Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-light mx-3 mb-3 rounded-2xl p-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 text-sm font-600 text-slate-700 transition-colors hover:bg-white/70 hover:text-indigo-600"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-slate-200/70 pt-3">
              <CopyIpLight />
              <a
                href="#plans"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-[13px] font-700 text-white"
              >
                Deploy Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
