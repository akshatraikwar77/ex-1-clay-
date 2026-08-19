import { useEffect, useMemo, useState } from "react";
import { X, Mail, Hash, User, Tag, ShieldCheck, Loader2, CheckCircle2, AlertTriangle, MessagesSquare } from "lucide-react";
import { SERIES, findPlan } from "../data/plans";

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1538170952884686909/oMIlmqcvLWdJlGpNwC5km6dhIGrfEWt_vRGaAvanyFeDprTfunWVaET82shSTyyscfA7";

export function openOrder(planId?: string) {
  window.dispatchEvent(new CustomEvent("flux-order", { detail: planId ?? "epyc-pro" }));
}

type Status = "idle" | "sending" | "sent" | "error";

export default function OrderModal() {
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState("epyc-pro");
  const [mcName, setMcName] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const found = useMemo(() => findPlan(planId) ?? findPlan("epyc-pro")!, [planId]);
  const discount = couponOk ? Math.round(found.plan.price * 0.85) : found.plan.price;

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setPlanId(id);
      setStatus("idle");
      setErrMsg("");
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("flux-order", handler);
    return () => window.removeEventListener("flux-order", handler);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const applyCoupon = () => {
    setCouponOk(coupon.trim().toUpperCase() === "FLUXLAUNCH");
  };

  const submit = async () => {
    if (!mcName.trim() || !discordId.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrMsg("Please fill your Minecraft name, Discord ID and a valid email.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const body = {
        username: "FLUX HOST · Order System",
        embeds: [
          {
            title: "🛒 New Server Order",
            description: `**${found.series.name}** — ${found.plan.name}`,
            color: 0x4f46e5,
            fields: [
              { name: "💰 Price", value: couponOk ? `₹${found.plan.price}/mo → **₹${discount}** first month (FLUXLAUNCH −15%)` : `₹${found.plan.price}/mo`, inline: true },
              { name: "🧠 RAM", value: found.plan.ram, inline: true },
              { name: "⚙️ CPU", value: found.plan.cpu, inline: true },
              { name: "💾 Storage", value: found.plan.storage, inline: true },
              { name: "👥 Slots", value: found.plan.slots, inline: true },
              { name: "🎮 Minecraft Name", value: mcName.trim(), inline: true },
              { name: "💬 Discord ID", value: discordId.trim(), inline: true },
              { name: "📧 Email (Gmail)", value: email.trim(), inline: true },
              { name: "🏷️ Coupon", value: couponOk ? "FLUXLAUNCH (−15% first month)" : coupon.trim() || "—", inline: true },
            ],
            footer: { text: "FLUX HOST · play.fluxsmp.fun · UPI / GPay / Paytm / PhonePe / Crypto" },
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
      setErrMsg(
        `Could not reach the order webhook (${err instanceof Error ? err.message : "network error"}). Please DM us on Discord instead — we'll set you up manually.`
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={close} />

      <div className="pop-in relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_50px_140px_rgba(15,23,42,0.35)] md:p-9">
        {status === "sent" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-800 text-slate-900">ORDER RECEIVED!</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Your <span className="font-700 text-slate-800">{found.plan.name}</span> order is in our
              queue. We'll DM you on Discord (<span className="font-600">{discordId}</span>) within
              minutes with payment steps — UPI, GPay, Paytm, PhonePe or Crypto. Setup starts the
              second payment clears.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.gg/4jM9mqvtnZ"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-700 text-white"
              >
                <MessagesSquare className="h-4 w-4" /> Open Discord
              </a>
              <button
                onClick={close}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-700 text-slate-600 transition-colors hover:bg-slate-50"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono2 text-[9px] tracking-[0.4em] text-indigo-600">// ORDER SERVER</p>
                <h3 className="mt-1.5 font-display text-xl font-800 text-slate-900">
                  Deploy in 60 seconds
                </h3>
              </div>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* plan select */}
            <label className="mt-6 block font-mono2 text-[9px] tracking-[0.3em] text-slate-500">PLAN</label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-600 text-slate-800 outline-none transition-colors focus:border-indigo-400"
            >
              {SERIES.map((s) => (
                <optgroup key={s.id} label={`${s.tag} — ${s.name}`}>
                  {s.plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price}/mo · {p.ram} · {p.slots}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* plan summary */}
            <div
              className="mt-3 rounded-2xl border p-4"
              style={{ borderColor: `${found.series.accent}30`, background: `${found.series.accent}08` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono2 text-[9px] tracking-[0.3em]" style={{ color: found.series.accent }}>
                  {found.series.name}
                </span>
                <span className="font-mono2 text-[10px] text-slate-500">
                  {found.plan.ram} · {found.plan.cpu} · {found.plan.storage}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="font-display text-lg font-800 text-slate-900">{found.plan.name}</span>
                <span className="flex items-baseline gap-1.5">
                  {couponOk && (
                    <span className="font-mono2 text-xs text-slate-400 line-through">₹{found.plan.price}</span>
                  )}
                  <span className="font-display text-2xl font-900" style={{ color: found.series.accent }}>
                    ₹{discount}
                  </span>
                  <span className="font-mono2 text-[9px] text-slate-400">/MO{couponOk ? " · 1ST" : ""}</span>
                </span>
              </div>
            </div>

            {/* inputs */}
            <div className="mt-5 space-y-3.5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={mcName}
                  onChange={(e) => setMcName(e.target.value)}
                  placeholder="Minecraft username (e.g. Steve_PvP)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400"
                />
              </div>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                  placeholder="Discord ID (e.g. fluxgamer or 1234567890123)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Gmail address (order + payment updates)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400"
                />
              </div>
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponOk(false); }}
                    placeholder='Coupon — try "FLUXLAUNCH"'
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-400"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 text-sm font-700 text-indigo-600 transition-colors hover:bg-indigo-100"
                >
                  Apply
                </button>
              </div>
              {couponOk && (
                <p className="pop-in text-center font-mono2 text-[10px] tracking-[0.2em] text-emerald-600">
                  FLUXLAUNCH APPLIED — 15% OFF FIRST MONTH ✓
                </p>
              )}
            </div>

            {status === "error" && errMsg && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs leading-relaxed text-rose-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {errMsg}
              </div>
            )}

            <button
              onClick={submit}
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-4 text-sm font-700 text-white shadow-[0_16px_40px_rgba(79,70,229,0.35)] transition-all hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> SENDING ORDER…
                </>
              ) : (
                <>
                  PLACE ORDER — ₹{discount}
                  {couponOk && found.plan.price !== discount ? " FIRST MO" : "/MO"}
                </>
              )}
            </button>
            <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center font-mono2 text-[9px] tracking-[0.25em] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> SENT SECURELY TO OUR DISCORD · UPI · GPAY · PAYTM · PHONEPE · CRYPTO
            </p>
          </>
        )}
      </div>
    </div>
  );
}
