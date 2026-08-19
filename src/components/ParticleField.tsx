import { useEffect, useRef } from "react";
import type { TemplateId } from "./TemplateSwitcher";

type RGB = [number, number, number];

const PALETTES: Record<TemplateId, { a: RGB; b: RGB }> = {
  neon: { a: [56, 189, 248], b: [167, 139, 250] },
  obsidian: { a: [245, 158, 11], b: [253, 230, 138] },
  matrix: { a: [34, 197, 94], b: [163, 230, 53] },
};

const GLYPHS = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﬀﬁ<>{}[]#$%&*+=/\\|";

type Mote = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  tw: number;
  twS: number;
  depth: number;
  c: 0 | 1;
};

type Drop = { x: number; y: number; sp: number; len: number; glyphs: string[] };

export default function ParticleField({ variant }: { variant: TemplateId }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pal = PALETTES[variant];
    let W = 0;
    let H = 0;
    let raf = 0;
    const mouse = { x: 0.5, y: 0.5 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const motes: Mote[] = [];
    const drops: Drop[] = [];
    const fontSize = 14;

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes.length = 0;
      drops.length = 0;
      if (variant === "matrix") {
        const cols = Math.ceil(W / fontSize);
        for (let i = 0; i < cols; i++) {
          const len = 8 + Math.floor(Math.random() * 18);
          drops.push({
            x: i * fontSize,
            y: Math.random() * H,
            sp: 40 + Math.random() * 120,
            len,
            glyphs: Array.from({ length: len }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]),
          });
        }
      } else {
        const count = Math.min(110, Math.floor((W * H) / 16000));
        for (let i = 0; i < count; i++) {
          motes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 0.6 + Math.random() * 1.8,
            vx: -0.08 - Math.random() * 0.22,
            vy: -0.05 - Math.random() * 0.18,
            tw: Math.random() * Math.PI * 2,
            twS: 0.4 + Math.random() * 1.4,
            depth: 0.3 + Math.random() * 0.7,
            c: Math.random() > 0.6 ? 1 : 0,
          });
        }
      }
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    let last = performance.now();

    const drawMotes = (t: number, dt: number) => {
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 18;
      for (const m of motes) {
        m.x += m.vx * dt * 0.06;
        m.y += m.vy * dt * 0.06;
        m.tw += m.twS * dt * 0.001;
        if (m.x < -10) m.x = W + 10;
        if (m.y < -10) m.y = H + 10;
        const a = 0.12 + (Math.sin(m.tw) * 0.5 + 0.5) * 0.5;
        const [r, g, b] = m.c ? pal.b : pal.a;
        const ox = px * m.depth;
        const oy = py * m.depth;
        ctx.beginPath();
        ctx.arc(m.x + ox, m.y + oy, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        ctx.fill();
      }
      // faint constellation links
      for (let i = 0; i < motes.length; i++) {
        for (let j2 = i + 1; j2 < motes.length; j2++) {
          const dx = motes[i].x - motes[j2].x;
          const dy = motes[i].y - motes[j2].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12100) {
            const al = (1 - d2 / 12100) * 0.1;
            ctx.strokeStyle = `rgba(${pal.a[0]},${pal.a[1]},${pal.a[2]},${al.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(motes[i].x, motes[i].y);
            ctx.lineTo(motes[j2].x, motes[j2].y);
            ctx.stroke();
          }
        }
      }
      void t;
    };

    const drawRain = (dt: number) => {
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (const d of drops) {
        d.y += (d.sp * dt) / 1000;
        if (d.y - d.len * fontSize > H) {
          d.y = -Math.random() * 200;
          d.sp = 40 + Math.random() * 120;
        }
        for (let k = 0; k < d.len; k++) {
          const gy = d.y - k * fontSize;
          if (gy < -fontSize || gy > H + fontSize) continue;
          if (Math.random() < 0.006) d.glyphs[k] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          const fade = 1 - k / d.len;
          if (k === 0) {
            ctx.fillStyle = "rgba(209,250,229,0.9)";
          } else {
            ctx.fillStyle = `rgba(${pal.a[0]},${pal.a[1]},${pal.a[2]},${(0.5 * fade).toFixed(3)})`;
          }
          ctx.fillText(d.glyphs[k], d.x, gy);
        }
      }
    };

    const frame = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      ctx.clearRect(0, 0, W, H);
      if (variant === "matrix") drawRain(dt);
      else drawMotes(t, dt);
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (reduced) {
      ctx.clearRect(0, 0, W, H);
      if (variant === "matrix") drawRain(0);
      else drawMotes(0, 0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [variant]);

  return <canvas ref={ref} className="particle-canvas" aria-hidden="true" />;
}
