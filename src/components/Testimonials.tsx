import { Star, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    name: "Aarav",
    role: "Owner · 120-player SMP",
    initials: "AA",
    grad: "from-sky-400 to-blue-600",
    text: "Migrated from a big-name host after constant 2 TPS evenings. On FLUX's 9950X node we hold 20 TPS with 60+ players and 300 plugins. The chip you see on their page is literally what you get.",
  },
  {
    name: "Priya",
    role: "Admin · CraftLore",
    initials: "PR",
    grad: "from-violet-400 to-purple-600",
    text: "The MCP agent quarantined a cracked plugin jar at 3 AM and left a full report in Discord. My old host took 2 days to answer a ticket. This thing took 4 seconds.",
  },
  {
    name: "Rohan",
    role: "Player · Mumbai",
    initials: "RO",
    grad: "from-emerald-400 to-teal-600",
    text: "Ping from Mumbai is 9ms. NINE. I duel-pvp on other servers with 90ms and it feels like slow motion now. Not going back.",
  },
  {
    name: "Arjun",
    role: "Owner · SkyForge Network",
    initials: "AR",
    grad: "from-amber-400 to-orange-600",
    text: "Paid via GPay at 11pm, server was online before I closed the UPI app. Bought the LEGEND rank next day just to support. Uptime has been flawless for 5 months.",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono2 text-[10px] tracking-[0.5em] text-sky-400">// PLAYER SIGNAL</p>
        <h2 className="mt-4 font-display text-3xl font-800 leading-tight tracking-tight text-white md:text-5xl">
          LOVED BY <span className="grad-text">THE COMMUNITY</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 90}>
            <figure className="relative h-full rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.045] to-transparent p-6 transition-colors duration-500 hover:border-sky-400/25">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 text-gold" fill="currentColor" />
                  ))}
                </div>
                <span className="flex items-center gap-1.5 font-mono2 text-[9px] tracking-widest text-emerald-400">
                  <BadgeCheck className="h-3.5 w-3.5" /> VERIFIED OWNER
                </span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-slate-300">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${r.grad} font-display text-xs font-800 text-white`}>
                  {r.initials}
                </span>
                <div>
                  <p className="text-sm font-700 text-white">{r.name}</p>
                  <p className="font-mono2 text-[10px] tracking-wider text-slate-500">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
