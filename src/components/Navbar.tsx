import { useEffect, useState } from "react";
import { Zap, Menu, X, MessagesSquare, Copy, Check } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "AI Agent", href: "#mcp" },
  { label: "Plans", href: "#plans" },
  { label: "Network", href: "#network" },
  { label: "Reviews", href: "#reviews" },
];

export function CopyIpButton({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("play.fluxsmp.fun");
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className={`group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 font-mono2 text-[11px] tracking-widest text-slate-300 transition-all hover:border-sky-400/50 hover:text-sky-300 ${
        compact ? "px-2.5 py-1.5" : "px-3.5 py-2"
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? "COPIED!" : "play.fluxsmp.fun"}</span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.45)]" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        {/* logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500 shadow-[0_0_24px_rgba(56,189,248,0.45)] transition-transform duration-500 group-hover:rotate-[15deg]">
            <Zap className="h-4.5 w-4.5 text-white" fill="currentColor" />
          </span>
          <span className="font-display text-lg font-800 tracking-tight text-white">
            FLUX<span className="text-sky-400">HOST</span>
          </span>
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium tracking-wide text-slate-300 transition-colors hover:text-sky-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CopyIpButton compact />
          <a
            href="https://discord.gg/4jM9mqvtnZ"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_8px_36px_rgba(124,58,237,0.65)] hover:brightness-110"
          >
            <MessagesSquare className="h-4 w-4" />
            Join Discord
          </a>
        </div>

        {/* mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mt-2 rounded-2xl p-4">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-300"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
            <CopyIpButton compact />
            <a
              href="https://discord.gg/4jM9mqvtnZ"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-[13px] font-semibold text-white"
            >
              <MessagesSquare className="h-4 w-4" />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
