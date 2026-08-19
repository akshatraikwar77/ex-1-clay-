import { Zap, Gem, Terminal } from "lucide-react";

export type TemplateId = "neon" | "obsidian" | "matrix";

export const TEMPLATES: Array<{ id: TemplateId; label: string; icon: typeof Zap }> = [
  { id: "neon", label: "NEON", icon: Zap },
  { id: "obsidian", label: "OBSIDIAN", icon: Gem },
  { id: "matrix", label: "MATRIX", icon: Terminal },
];

export default function TemplateSwitcher({
  value,
  onChange,
}: {
  value: TemplateId;
  onChange: (t: TemplateId) => void;
}) {
  const idx = TEMPLATES.findIndex((t) => t.id === value);
  return (
    <div className="glass fixed bottom-5 right-5 z-50 flex items-center rounded-full p-1 shadow-[0_16px_50px_rgba(0,0,0,0.55)]">
      {/* sliding indicator */}
      <span
        className="absolute inset-y-1 left-1 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: "calc((100% - 8px) / 3)",
          transform: `translateX(calc(${idx} * 100%))`,
          background: "linear-gradient(135deg, rgba(var(--acc-rgb),0.25), rgba(var(--acc2-rgb),0.18))",
          boxShadow: "inset 0 0 0 1px rgba(var(--acc-rgb),0.35)",
        }}
      />
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono2 text-[9px] tracking-[0.2em] transition-colors duration-300 md:px-4 md:text-[10px] ${
            value === t.id ? "text-white" : "text-slate-500 hover:text-slate-300"
          }`}
          aria-pressed={value === t.id}
        >
          <t.icon className="h-3 w-3" style={value === t.id ? { color: "var(--acc1)" } : undefined} />
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
