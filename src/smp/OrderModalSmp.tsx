import { useEffect, useMemo, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Crown, KeyRound, Gem, ArrowRight, X, Mail, Hash, User, Tag } from "lucide-react";
import { RANKS, KEYS, SHARDS, WEBHOOK_URL, DISCORD_URL } from "./data";

type Status = "idle" | "sending" | "sent" | "error";
type BuyType = "rank" | "key" | "shard";

function parseDetail(detail: string): { type: BuyType; id: string } {
  if (detail.startsWith("key:")) return { type: "key", id: detail.slice(4) };
  if (detail.startsWith("shard:")) return { type: "shard", id: detail.slice(6) };
  return { type: "rank", id: detail };
}

const field = "clay-in w-full px-4 py-3 text-sm font-700 text-[#4a3b2f] placeholder:text-[#c4b29a]";

export default function OrderModalSmp() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<BuyType>("rank");
  const [rankId, setRankId] = useState("mvp");
  const [keyId, setKeyId] = useState("rare");
  const [shardId, setShardId] = useState("shard-m");
  const [mcName, setMcName] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const d = parseDetail((e as CustomEvent<string>).detail || "mvp");
      setType(d.type);
      if (d.type === "key") setKeyId(d.id);
      else if (d.type === "shard") setShardId(d.id);
      else setRankId(d.id);
      setStatus("idle");
      setErrMsg("");
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("flux-smp-order", handler);
    return () => window.removeEventListener("flux-smp-order", handler);
  }, []);

  const item = useMemo(() => {
    if (type === "rank") {
      const r = RANKS.find((x) => x.id === rankId)!;
      return { name: `${r.name} Rank`, price: r.price, color: r.color, icon: Crown, tint: "clay-butter" };
    }
    if (type === "key") {
      const k = KEYS.find((x) => x.id === keyId)!;
      return { name: k.name, price: k.price, color: k.color, icon: KeyRound, tint: "clay-sky" };
    }
    const s = SHARDS.find((x) => x.id === shardId)!;
    return { name: `${s.amount.toLocaleString("en-IN")} Shards`, price: s.price, color: s.color, icon: Gem, tint: "clay-lilac" };
  }, [type, rankId, keyId, shardId]);

  const finalPrice = couponOk ? Math.round(item.price * 0.85) : item.price;
  const close = () => { setOpen(false); document.body.style.overflow = ""; };

  const submit = async () => {
    if (!mcName.trim() || !discordId.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrMsg("Please fill your Minecraft name, Discord ID and a valid Gmail.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const titles: Record<BuyType, string> = { rank: "👑 New Rank Order", key: "🔑 New Key Order", shard: "💎 New Shards Order" };
      const body = {
        username: "FLUX SMP · Order System",
        embeds: [
          {
            title: titles[type],
            description: `**${item.name}**`,
            color: parseInt(item.color.slice(1), 16),
            fields: [
              { name: "💰 Price", value: couponOk ? `₹${item.price} → **₹${finalPrice}** (FLUXLAUNCH −15%)` : `₹${item.price}`, inline: true },
              { name: "🏷️ Type", value: type.toUpperCase(), inline: true },
              { name: "🎮 Minecraft Name", value: mcName.trim(), inline: true },
              { name: "💬 Discord ID", value: discordId.trim(), inline: true },
              { name: "📧 Gmail", value: email.trim(), inline: true },
              { name: "🎟️ Coupon", value: couponOk ? "FLUXLAUNCH (−15%)" : coupon.trim() || "—", inline: true },
            ],
            footer: { text: "FLUX SMP · play.fluxsmp.fun · UPI / GPay / Paytm / PhonePe / Crypto" },
            timestamp: new Date().toISOString(),
          },
        ],
      };
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrMsg(`Couldn't reach the order webhook (${err instanceof Error ? err.message : "network error"}). DM us on Discord instead.`);
    }
  };

  if (!open) return null;

  const TYPES: Array<{ id: BuyType; label: string; tint: string }> = [
    { id: "rank", label: "Rank", tint: "clay-butter" },
    { id: "key", label: "Key", tint: "clay-sky" },
    { id: "shard", label: "Shards", tint: "clay-lilac" },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#4a3b2f]/45 backdrop-blur-sm" onClick={close} />
      <div className="pop-in clay relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[2.5rem] p-6 md:p-8">
        {status === "sent" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="clay clay-mint grid h-20 w-20 place-items-center rounded-3xl">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-700 text-[#2ea877]">Order received!</h3>
            <p className="mt-3 max-w-xs text-sm font-700 leading-relaxed text-[#7a6a58]">
              We'll DM <b className="text-[#4a3b2f]">{discordId}</b> with payment steps. Your{" "}
              <b style={{ color: item.color }}>{item.name}</b> lands in-game within minutes.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="clay-btn clay-sky px-5 py-3 font-display text-sm font-700 text-white">Open Discord</a>
              <button onClick={close} className="clay-btn bg-white/70 px-5 py-3 font-display text-sm font-700 text-[#4a3b2f]">Done</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-700 text-[#4a3b2f]">Checkout</h3>
              <button onClick={close} className="clay-btn clay-coral grid h-9 w-9 place-items-center text-white" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* item preview */}
            <div className={`clay ${item.tint} mt-4 flex items-center justify-between rounded-2xl px-4 py-3`}>
              <span className="flex items-center gap-3">
                <span className="clay grid h-11 w-11 place-items-center rounded-xl">
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </span>
                <span className="font-display text-base font-700 text-[#4a3b2f]">{item.name}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowRight className="h-4 w-4 text-[#4a3b2f]/50" />
                <span className="font-display text-xl font-700 text-[#4a3b2f]">₹{finalPrice}</span>
              </span>
            </div>
            {couponOk && <p className="mt-2 text-center font-mono2 text-[10px] font-700 text-[#2ea877]">FLUXLAUNCH applied — 15% off ✓</p>}

            {/* type tabs */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`clay-btn py-2.5 font-display text-sm font-700 ${type === t.id ? `${t.tint} text-white` : "bg-white/60 text-[#7a6a58]"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <select
              value={type === "rank" ? rankId : type === "key" ? keyId : shardId}
              onChange={(e) => (type === "rank" ? setRankId(e.target.value) : type === "key" ? setKeyId(e.target.value) : setShardId(e.target.value))}
              className={`${field} mt-3 appearance-none`}
            >
              {type === "rank" && RANKS.map((r) => <option key={r.id} value={r.id}>{r.name} — ₹{r.price} lifetime</option>)}
              {type === "key" && KEYS.map((k) => <option key={k.id} value={k.id}>{k.name} — ₹{k.price}</option>)}
              {type === "shard" && SHARDS.map((s) => <option key={s.id} value={s.id}>{s.amount.toLocaleString("en-IN")} Shards{s.bonus ? ` +${s.bonus}` : ""} — ₹{s.price}</option>)}
            </select>

            <div className="mt-3 space-y-2.5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b29a]" />
                <input value={mcName} onChange={(e) => setMcName(e.target.value)} placeholder="Minecraft username" className={`${field} pl-11`} />
              </div>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b29a]" />
                <input value={discordId} onChange={(e) => setDiscordId(e.target.value)} placeholder="Discord ID" className={`${field} pl-11`} />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b29a]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Gmail address" className={`${field} pl-11`} />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b29a]" />
                  <input value={coupon} onChange={(e) => { setCoupon(e.target.value); setCouponOk(false); }} placeholder='Coupon "FLUXLAUNCH"' className={`${field} pl-11`} />
                </div>
                <button onClick={() => setCouponOk(coupon.trim().toUpperCase() === "FLUXLAUNCH")} className="clay-btn clay-butter px-4 font-display text-sm font-700 text-[#6b4e12]">Apply</button>
              </div>
            </div>

            {status === "error" && errMsg && (
              <div className="clay clay-coral mt-3 flex items-start gap-2 rounded-2xl p-3 text-xs font-800 leading-relaxed text-white">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {errMsg}
              </div>
            )}

            <button
              onClick={submit}
              disabled={status === "sending"}
              className="clay-btn clay-mint mt-5 flex w-full items-center justify-center gap-2 py-4 font-display text-base font-700 text-white disabled:opacity-60"
            >
              {status === "sending" ? (<><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>) : (<>Place order — ₹{finalPrice}</>)}
            </button>
            <p className="mt-3 text-center font-mono2 text-[9px] font-700 tracking-[0.2em] text-[#a08a70]">
              UPI · GPAY · PAYTM · PHONEPE · CRYPTO
            </p>
          </>
        )}
      </div>
    </div>
  );
}
