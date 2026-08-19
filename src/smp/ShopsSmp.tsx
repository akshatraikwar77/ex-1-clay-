import { useState, type CSSProperties } from "react";
import { Crown, KeyRound, Gem, Coins, Sparkles, Check, X } from "lucide-react";
import Reveal from "../components/Reveal";
import { RANKS, KEYS, SHARDS, SHARD_SPENDS, RARITY, openSmpOrder } from "./data";

type ShopId = "ranks" | "keys" | "shards";

const META: Record<ShopId, { title: string; tint: string; text: string; icon: typeof Crown; blurb: string }> = {
  ranks: { title: "Rank Shop", tint: "clay-butter", text: "#6b4e12", icon: Crown, blurb: "Lifetime ranks — pay once, keep across every season." },
  keys: { title: "Key Shop", tint: "clay-sky", text: "#1c4f7d", icon: KeyRound, blurb: "Crate keys with honest, printed drop rates." },
  shards: { title: "Shards Shop", tint: "clay-lilac", text: "#4a2a80", icon: Gem, blurb: "Premium currency for cosmetics, pets & upgrades." },
};

/* ---------- item card ---------- */
function ItemCard({ tint, icon: Icon, iconColor, name, price, lines, delay, onBuy }: {
  tint: string; icon: typeof Crown; iconColor: string; name: string; price: string;
  lines: Array<{ text: string; color?: string }>; delay: number; onBuy: () => void;
}) {
  return (
    <div className="cascade clay wobble flex flex-col rounded-[1.8rem] p-5" style={{ ["--cd" as string]: `${delay}ms` } as CSSProperties}>
      <div className="flex items-center gap-3">
        <span className={`clay ${tint} grid h-14 w-14 shrink-0 place-items-center rounded-2xl`}>
          <Icon className="h-6 w-6" style={{ color: iconColor }} />
        </span>
        <div className="min-w-0">
          <h4 className="truncate font-display text-base font-700 text-[#4a3b2f]">{name}</h4>
          <p className="font-display text-lg font-700 text-[#e0a92e]">{price}</p>
        </div>
      </div>
      <ul className="mt-4 flex-1 space-y-1.5">
        {lines.map((l, i) => (
          <li key={i} className="flex items-start gap-2 text-[12.5px] font-700 leading-snug text-[#7a6a58]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: l.color ?? "#2ea877" }} />
            <span className="min-w-0 truncate">{l.text}</span>
          </li>
        ))}
      </ul>
      <button onClick={onBuy} className={`clay-btn ${tint} mt-4 w-full py-2.5 font-display text-sm font-700`} style={{ color: "#fff" }}>
        Buy now
      </button>
    </div>
  );
}

/* ---------- overlay ---------- */
function ShopGui({ shop, onClose }: { shop: ShopId; onClose: () => void }) {
  const meta = META[shop];
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-6">
      <div className="fixed inset-0 bg-[#4a3b2f]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="sheet-in clay relative my-4 w-full max-w-4xl rounded-[2.5rem] p-6 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className={`font-display text-2xl font-700 md:text-3xl`} style={{ color: meta.text }}>{meta.title}</h3>
            <p className="mt-1 text-sm font-700 text-[#7a6a58]">{meta.blurb}</p>
          </div>
          <button onClick={onClose} className="clay-btn clay-coral grid h-11 w-11 place-items-center text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shop === "ranks" &&
            RANKS.map((r, i) => (
              <ItemCard
                key={r.id} tint="clay-butter" icon={Crown} iconColor={r.color}
                name={r.name} price={`₹${r.price} once`}
                lines={r.perks.slice(0, 4).map((p) => ({ text: p }))}
                delay={i * 80}
                onBuy={() => { onClose(); openSmpOrder(r.id); }}
              />
            ))}
          {shop === "keys" &&
            KEYS.map((k, i) => (
              <ItemCard
                key={k.id} tint="clay-sky" icon={KeyRound} iconColor={k.color}
                name={k.name} price={`₹${k.price}`}
                lines={k.loot.slice(0, 4).map((l) => ({ text: `${l.item} · ${l.chance}%`, color: RARITY[l.rarity].color }))}
                delay={i * 80}
                onBuy={() => { onClose(); openSmpOrder(`key:${k.id}`); }}
              />
            ))}
          {shop === "shards" &&
            SHARDS.map((s, i) => (
              <ItemCard
                key={s.id} tint="clay-lilac" icon={Gem} iconColor={s.color}
                name={s.name} price={`₹${s.price}`}
                lines={[
                  { text: `${s.amount.toLocaleString("en-IN")} shards` },
                  ...(s.bonus ? [{ text: `+${s.bonus} bonus shards`, color: "#e0a92e" }] : []),
                  { text: "Instant in-game delivery" },
                  ...(s.tag ? [{ text: s.tag, color: "#9a6fe0" }] : []),
                ]}
                delay={i * 80}
                onBuy={() => { onClose(); openSmpOrder(`shard:${s.id}`); }}
              />
            ))}
        </div>

        {shop === "shards" && (
          <div className="cascade mt-6 rounded-3xl bg-white/50 p-5" style={{ ["--cd" as string]: "380ms" } as CSSProperties}>
            <p className="flex items-center gap-2 font-display text-sm font-700 text-[#4a2a80]">
              <Coins className="h-4 w-4" /> Spend shards on
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SHARD_SPENDS.map((s) => (
                <span key={s.label} className="clay flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-800 text-[#7a6a58]">
                  <Sparkles className="h-3 w-3 text-[#9a6fe0]" /> {s.label} · {s.cost}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 text-center font-mono2 text-[10px] font-700 tracking-[0.2em] text-[#a08a70]">
          CODE <span className="text-[#e8654c]">FLUXLAUNCH</span> = 15% OFF · UPI · GPAY · PAYTM · PHONEPE · CRYPTO
        </p>
      </div>
    </div>
  );
}

/* ---------- portal ---------- */
export default function ShopsSmp() {
  const [open, setOpen] = useState<ShopId | null>(null);

  return (
    <section id="shop" className="relative bg-white/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <span className="clay clay-coral inline-block rounded-full px-4 py-1.5 font-mono2 text-[10px] font-700 tracking-[0.25em] text-white">// THE STORE</span>
            <h2 className="mt-5 font-display text-4xl font-700 text-[#4a3b2f] emboss md:text-5xl">
              Squish a <span className="text-[#9a6fe0] emboss-color">chest</span> open
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {(Object.keys(META) as ShopId[]).map((id, i) => {
            const m = META[id];
            return (
              <Reveal key={id} delay={i * 110}>
                <button
                  onClick={() => setOpen(id)}
                  className={`clay ${m.tint} wobble group flex w-full flex-col items-center gap-4 rounded-[2.5rem] p-8`}
                  style={{ rotate: i === 1 ? "0deg" : i === 0 ? "-1.2deg" : "1.2deg" }}
                >
                  <span className="clay bob grid h-20 w-20 place-items-center rounded-3xl" style={{ animationDelay: `${i * 0.7}s` }}>
                    <m.icon className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" style={{ color: "#4a3b2f" }} />
                  </span>
                  <span className="font-display text-xl font-700 text-white [text-shadow:0_2px_0_rgba(255,255,255,0.35)]">{m.title}</span>
                  <span className="clay-btn rounded-full bg-white/70 px-6 py-2.5 font-display text-sm font-700 text-[#4a3b2f]">
                    Open chest
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {open && <ShopGui shop={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
