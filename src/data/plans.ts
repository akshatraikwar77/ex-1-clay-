export type Plan = {
  id: string;
  name: string;
  badge?: string;
  ram: string;
  cpu: string;
  storage: string;
  slots: string;
  price: number;
};

export type Series = {
  id: string;
  tag: string;
  name: string;
  heroName: string;
  accent: string;
  cpuLine: string;
  blurb: string;
  note?: string;
  plans: Plan[];
};

export const SERIES: Series[] = [
  {
    id: "budget",
    tag: "SERIES 01",
    name: "FLUX BUDGET",
    heroName: "BUDGET",
    accent: "#0891b2",
    cpuLine: "Flux Noida DC · 1Gbps Network",
    blurb: "Budget servers from our Noida datacenter — perfect for testing, friend servers & development worlds.",
    note: "Best-effort uptime. For 24/7 production servers, check the EPYC & Ryzen series below.",
    plans: [
      { id: "stone", name: "FLUX STONE", ram: "4 GB", cpu: "2 vCores", storage: "10 GB SSD", slots: "10 Players", price: 200 },
      { id: "iron", name: "FLUX IRON", ram: "6 GB", cpu: "4 vCores", storage: "15 GB SSD", slots: "20 Players", price: 300 },
      { id: "copper", name: "FLUX COPPER", ram: "8 GB", cpu: "4 vCores", storage: "20 GB SSD", slots: "30 Players", price: 400 },
      { id: "redstone", name: "FLUX REDSTONE", ram: "16 GB", cpu: "6 vCores", storage: "35 GB SSD", slots: "50 Players", price: 800 },
      { id: "gold", name: "FLUX GOLD", ram: "32 GB", cpu: "8 vCores", storage: "50 GB SSD", slots: "Unlimited", price: 1200, badge: "UNLIMITED SLOTS" },
      { id: "ghast", name: "FLUX GHAST", ram: "64 GB", cpu: "12 vCores", storage: "80 GB SSD", slots: "Unlimited", price: 1500, badge: "BEAST MODE" },
    ],
  },
  {
    id: "epyc",
    tag: "SERIES 02",
    name: "FLUX EPYC 7763",
    heroName: "EPYC 7763",
    accent: "#7c3aed",
    cpuLine: "AMD EPYC 7763 · 64-Core Enterprise",
    blurb: "Enterprise-grade EPYC silicon with NVMe storage and a 99.9% uptime guarantee. 50% faster chunk loading.",
    plans: [
      { id: "epyc-basic", name: "FLUX BASIC", ram: "2 GB DDR4", cpu: "EPYC 7763 · 1 vCore", storage: "12 GB NVMe", slots: "25 Players", price: 279 },
      { id: "epyc-pro", name: "FLUX PRO", ram: "4 GB DDR4", cpu: "EPYC 7763 · 2 vCores", storage: "18 GB NVMe", slots: "50 Players", price: 499, badge: "MOST POPULAR" },
      { id: "epyc-elite", name: "FLUX ELITE", ram: "8 GB DDR4", cpu: "EPYC 7763 · 3 vCores", storage: "25 GB NVMe", slots: "100 Players", price: 899 },
      { id: "epyc-ultimate", name: "FLUX ULTIMATE", ram: "16 GB DDR4", cpu: "EPYC 7763 · 4 vCores", storage: "35 GB NVMe", slots: "150+ Players", price: 1699 },
      { id: "epyc-titan", name: "FLUX TITAN", ram: "24 GB DDR4", cpu: "EPYC 7763 · 6 vCores", storage: "45 GB NVMe", slots: "Unlimited", price: 2199, badge: "MAX POWER" },
    ],
  },
  {
    id: "ryzen-vps",
    tag: "SERIES 03",
    name: "FLUX RYZEN 5900X VPS",
    heroName: "RYZEN 5900X",
    accent: "#4f46e5",
    cpuLine: "AMD Ryzen 9 5900X · 100% Uptime Guarantee",
    blurb: "Max-performance Ryzen VPS with L3/L4 + Layer 7 DDoS mitigation and a no-data-loss guarantee.",
    plans: [
      { id: "ryzen4", name: "FLUX RYZEN 4GB", ram: "4 GB DDR4 3200", cpu: "5900X · 1 vCore", storage: "15 GB NVMe", slots: "25 Players", price: 399 },
      { id: "ryzen8", name: "FLUX RYZEN 8GB", ram: "8 GB DDR4 3200", cpu: "5900X · 2 vCores", storage: "30 GB NVMe", slots: "50 Players", price: 799, badge: "MOST POPULAR" },
      { id: "ryzen16", name: "FLUX RYZEN 16GB", ram: "16 GB DDR4 3200", cpu: "5900X · 4 vCores", storage: "60 GB NVMe", slots: "100 Players", price: 1600 },
      { id: "ryzen32", name: "FLUX RYZEN 32GB", ram: "32 GB DDR4 3200", cpu: "5900X · 8 vCores", storage: "120 GB NVMe", slots: "200+ Players", price: 3000 },
      { id: "ryzen64", name: "FLUX RYZEN 64GB", ram: "64 GB DDR4 3200", cpu: "5900X · 16 vCores", storage: "250 GB NVMe", slots: "Unlimited", price: 5200, badge: "MAX POWER" },
    ],
  },
  {
    id: "ryzen-9950x",
    tag: "SERIES 04",
    name: "FLUX RYZEN 9 9950X",
    heroName: "RYZEN 9 9950X",
    accent: "#d97706",
    cpuLine: "Ryzen 9 9950X · 6.80 GHz Turbo · DDR5",
    blurb: "Zen 5 flagship with DDR5 ultra-low-latency memory, 6.8GHz turbo boost and zero CPU steal time.",
    plans: [
      { id: "r9-4", name: "FLUX RYZEN 4GB", ram: "4 GB DDR5", cpu: "9950X · 1 vCore", storage: "20 GB NVMe", slots: "50 Players", price: 1299 },
      { id: "r9-8", name: "FLUX RYZEN 8GB", ram: "8 GB DDR5", cpu: "9950X · 2 vCores", storage: "40 GB NVMe", slots: "100 Players", price: 1999, badge: "MOST POPULAR" },
      { id: "r9-16", name: "FLUX RYZEN 16GB", ram: "16 GB DDR5", cpu: "9950X · 4 vCores", storage: "80 GB NVMe", slots: "200+ Players", price: 2999 },
      { id: "r9-32", name: "FLUX RYZEN 32GB", ram: "32 GB DDR5", cpu: "9950X · 6 vCores", storage: "120 GB NVMe", slots: "Unlimited", price: 5499, badge: "ENTERPRISE" },
    ],
  },
];

export const ALL_INCLUDES = [
  "24/7 Discord Support",
  "Pterodactyl Control Panel",
  "FTP File Access",
  "MySQL Database",
  "Free Subdomain",
  "One-Click Modpack Installer",
  "Daily Backups",
  "Full Mod Support",
  "Cracked / Offline Mode",
  "Free Migration",
  "Instant Setup",
  "DDoS Protection",
];

export function findPlan(planId: string): { series: Series; plan: Plan } | null {
  for (const s of SERIES) {
    const p = s.plans.find((pl) => pl.id === planId);
    if (p) return { series: s, plan: p };
  }
  return null;
}
