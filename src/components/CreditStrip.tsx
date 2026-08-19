import { Clapperboard, Sparkle } from "lucide-react";

export default function CreditStrip() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-9 overflow-hidden border-b border-white/10 bg-ink">
      <div className="grid-bg-dark absolute inset-0 opacity-30" />
      <div className="strip-sheen" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 opacity-80" />
      {/* soft glow behind center */}
      <div className="absolute left-1/2 top-1/2 h-8 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-lg" />

      <div className="relative flex h-full items-center justify-center gap-2.5 px-3 sm:gap-3 sm:px-4">
        <span className="hidden shrink-0 items-center gap-2 font-mono2 text-[8px] tracking-[0.35em] text-slate-500 lg:flex">
          <Clapperboard className="h-3 w-3 text-cyan-300" />
          A FLUX HOST PRODUCTION
        </span>
        <span className="hidden h-3 w-px bg-white/15 lg:block" />

        {/* always-visible credit line */}
        <span className="flex items-center gap-1.5 whitespace-nowrap font-mono2 text-[8px] tracking-[0.18em] text-slate-400 sm:gap-2 sm:text-[9px] sm:tracking-[0.3em]">
          <Sparkle className="twinkle h-2.5 w-2.5 shrink-0 text-amber-300" fill="currentColor" />
          <span className="sm:hidden">BY</span>
          <span className="hidden sm:inline">CREATED BY</span>
          <span className="credit-name font-700">AKSHAT</span>
          <Sparkle className="twinkle h-2 w-2 shrink-0 text-cyan-300" fill="currentColor" style={{ animationDelay: "-1.1s" }} />
          <span className="sm:hidden">·</span>
          <span className="hidden sm:inline">DIRECTED BY</span>
          <span className="credit-name font-700">HUZAIFA</span>
          <Sparkle className="twinkle h-2.5 w-2.5 shrink-0 text-amber-300" fill="currentColor" style={{ animationDelay: "-0.6s" }} />
        </span>

        <span className="hidden h-3 w-px bg-white/15 lg:block" />
        <span className="hidden shrink-0 font-mono2 text-[8px] tracking-[0.35em] text-slate-600 lg:block">
          EST. 2025 · DELHI, IN
        </span>
      </div>
    </div>
  );
}
