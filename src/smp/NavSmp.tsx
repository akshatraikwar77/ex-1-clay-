import { MessagesSquare, Sparkles } from "lucide-react";
import { DISCORD_URL } from "./data";

const LINKS = [
  { label: "World", href: "#world" },
  { label: "Store", href: "#shop" },
  { label: "Join", href: "#join" },
];

export default function NavSmp() {
  return (
    <>
      {/* credits badge */}
      <div className="fixed inset-x-0 top-3 z-40 flex justify-center px-3">
        <div className="clay flex items-center gap-2 rounded-full px-4 py-1.5">
          <Sparkles className="h-3 w-3 text-[#e0a92e]" fill="currentColor" />
          <span className="font-mono2 text-[8px] font-700 tracking-[0.18em] text-[#7a6a58] sm:text-[9px]">
            CRAFTED BY <span className="credit-name">AKSHAT</span>
            <span className="mx-1.5 text-[#d8c6ae]">•</span>
            DIRECTED BY <span className="credit-name">HUZAIFA</span>
          </span>
          <Sparkles className="h-2.5 w-2.5 text-[#2ea877]" fill="currentColor" />
        </div>
      </div>

      {/* clay nav */}
      <header className="fixed inset-x-0 top-12 z-40 flex justify-center px-3">
        <nav className="clay flex items-center gap-1 rounded-full px-2.5 py-2">
          <a href="#top" className="clay-btn clay-coral mr-1 grid h-9 w-9 place-items-center font-display text-base font-700 text-white">
            F
          </a>
          <span className="mr-2 hidden font-display text-base font-700 text-[#4a3b2f] sm:block">
            Flux<span className="text-[#2ea877]">SMP</span>
          </span>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 font-display text-sm font-600 text-[#7a6a58] transition-colors hover:bg-white/60 hover:text-[#4a3b2f]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="clay-btn clay-mint ml-1 flex items-center gap-2 px-4 py-2 font-display text-sm font-700 text-white"
          >
            <MessagesSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Join</span>
          </a>
        </nav>
      </header>
    </>
  );
}
