import { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    name: "Aarav",
    role: "Owner · 120-player SMP",
    initials: "AA",
    grad: "from-indigo-500 to-cyan-400",
    text: "Migrated after constant 2 TPS evenings elsewhere. On the 9950X node we hold 20 TPS with 60 players and 300 plugins. The chip on their homepage is genuinely what you get.",
  },
  {
    name: "Priya",
    role: "Admin · CraftLore",
    initials: "PR",
    grad: "from-violet-500 to-fuchsia-400",
    text: "The AI agent quarantined a cracked plugin jar at 3 AM and left a full report in Discord. My old host took two days to answer a ticket. This took four seconds.",
  },
  {
    name: "Rohan",
    role: "PVPer · Mumbai",
    initials: "RO",
    grad: "from-cyan-500 to-emerald-400",
    text: "9ms from Mumbai. NINE. I duel on other servers with 90ms and it feels like slow motion now. Not going back, ever.",
  },
  {
    name: "Arjun",
    role: "Owner · SkyForge",
    initials: "AR",
    grad: "from-amber-500 to-orange-500",
    text: "Paid via GPay at 11pm, server was online before I closed the UPI app. Five months of flawless uptime since. The plan builder picked the perfect tier too.",
  },
  {
    name: "Sana",
    role: "Modder · 40 modpacks",
    initials: "SA",
    grad: "from-rose-500 to-red-400",
    text: "Running a 240-mod Forge pack with 30 friends on the EPYC tier. Zero crashes in two months, and the malware scanner caught two bad mods before they nuked the world.",
  },
];

export default function Reviews2() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    rowRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-32">
      <div className="aurora absolute -right-40 top-20 h-[26rem] w-[26rem] rounded-full bg-indigo-300/35 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono2 text-[10px] tracking-[0.5em] text-indigo-600">// PLAYER SIGNAL</p>
              <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-slate-900 md:text-5xl">
                THE COMMUNITY
                <br />
                <span className="grad-text">HAS SPOKEN</span>
              </h2>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => scrollBy(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-indigo-300 hover:text-indigo-600"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-indigo-300 hover:text-indigo-600"
                aria-label="Next reviews"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div
          ref={rowRef}
          className="snap-row mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8"
        >
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="group relative w-[320px] shrink-0 snap-center rounded-3xl border border-slate-200/80 bg-white/80 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_26px_70px_rgba(15,23,42,0.1)] md:w-[380px]"
            >
              <Quote className="h-7 w-7 text-indigo-200 transition-colors group-hover:text-indigo-300" fill="currentColor" />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">“{r.text}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${r.grad} font-display text-xs font-800 text-white`}>
                  {r.initials}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-700 text-slate-800">{r.name}</p>
                  <p className="font-mono2 text-[10px] tracking-wider text-slate-400">{r.role}</p>
                </div>
                <span className="flex items-center gap-1 font-mono2 text-[8px] tracking-[0.2em] text-emerald-600">
                  <BadgeCheck className="h-3.5 w-3.5" /> VERIFIED
                </span>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
