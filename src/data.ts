export const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1538170952884686909/oMIlmqcvLWdJlGpNwC5km6dhIGrfEWt_vRGaAvanyFeDprTfunWVaET82shSTyyscfA7";

export const SERVER_IP = "play.fluxsmp.fun";
export const DISCORD_URL = "https://discord.gg/4jM9mqvtnZ";

/* ---------------- rarity meta ---------------- */
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";

export const RARITY: Record<Rarity, { label: string; color: string }> = {
  common: { label: "COMMON", color: "#9ca3af" },
  uncommon: { label: "UNCOMMON", color: "#4ade80" },
  rare: { label: "RARE", color: "#38bdf8" },
  epic: { label: "EPIC", color: "#c084fc" },
  legendary: { label: "LEGENDARY", color: "#fbbf24" },
  mythic: { label: "MYTHIC", color: "#f472b6" },
};

/* ---------------- ranks ---------------- */
export type Rank = {
  id: string;
  name: string;
  price: number;
  color: string;
  tagline: string;
  perks: string[];
};

export const RANKS: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    price: 99,
    color: "#4ade80",
    tagline: "Start your legend",
    perks: ["/fly in lobby", "Colored chat + [VIP] prefix", "2 home warps", "1 Vote Key every month", "Kit VIP weekly"],
  },
  {
    id: "mvp",
    name: "MVP",
    price: 249,
    color: "#38bdf8",
    tagline: "For the serious grinder",
    perks: ["Everything in VIP", "/fly everywhere in survival", "5 home warps", "3 Rare Keys every month", "Kit MVP weekly + pet slot"],
  },
  {
    id: "legend",
    name: "LEGEND",
    price: 499,
    color: "#c084fc",
    tagline: "Command the world",
    perks: ["Everything in MVP", "Custom enchant access", "Private ender vault ×3", "6 Rare Keys every month", "1 Epic Key every month"],
  },
  {
    id: "flux",
    name: "FLUX",
    price: 999,
    color: "#fbbf24",
    tagline: "The server's elite",
    perks: ["Everything in LEGEND", "Custom /command + join full server", "2 Legendary Keys every month", "Beta worlds first access", "Name in spawn hall of fame"],
  },
];

/* ---------------- keys & loot ---------------- */
export type Loot = { item: string; rarity: Rarity; chance: number };

export type CrateKey = {
  id: string;
  name: string;
  price: number;
  color: string;
  desc: string;
  loot: Loot[];
};

export const KEYS: CrateKey[] = [
  {
    id: "vote",
    name: "VOTE KEY",
    price: 19,
    color: "#9ca3af",
    desc: "Earned by voting — or grabbed cheap. The starter roll.",
    loot: [
      { item: "Stack of Bread ×64", rarity: "common", chance: 40 },
      { item: "Iron Ingots ×32", rarity: "common", chance: 22 },
      { item: "Emeralds ×16", rarity: "uncommon", chance: 20 },
      { item: "Diamond ×4", rarity: "rare", chance: 12 },
      { item: "Enchanted Book (Sharp III)", rarity: "epic", chance: 5 },
      { item: "Netherite Ingot", rarity: "legendary", chance: 1 },
    ],
  },
  {
    id: "rare",
    name: "RARE KEY",
    price: 49,
    color: "#38bdf8",
    desc: "Armor, spawners & pets — the mid-game booster.",
    loot: [
      { item: "Diamond Armor Piece", rarity: "rare", chance: 34 },
      { item: "Zombie Spawner", rarity: "rare", chance: 22 },
      { item: "Pet Egg (Wolf / Cat)", rarity: "uncommon", chance: 20 },
      { item: "Enchanted Book (Prot IV)", rarity: "epic", chance: 15 },
      { item: "Elytra", rarity: "legendary", chance: 7 },
      { item: "Beacon", rarity: "legendary", chance: 2 },
    ],
  },
  {
    id: "epic",
    name: "EPIC KEY",
    price: 99,
    color: "#c084fc",
    desc: "End-game enchants & cosmetics that flex.",
    loot: [
      { item: "Enchanted Book (Mending)", rarity: "epic", chance: 30 },
      { item: "Full Diamond Set (Prot IV)", rarity: "epic", chance: 25 },
      { item: "Cosmetic Trail (Flame)", rarity: "rare", chance: 18 },
      { item: "Netherite Sword (Sharp V)", rarity: "legendary", chance: 17 },
      { item: "Shulker Box of Diamonds", rarity: "legendary", chance: 8 },
      { item: "Mythic Title: «World Ender»", rarity: "mythic", chance: 2 },
    ],
  },
  {
    id: "legendary",
    name: "LEGENDARY KEY",
    price: 199,
    color: "#fbbf24",
    desc: "The top shelf. Mythic gear & server-exclusive titles.",
    loot: [
      { item: "Full Netherite Set (Max Enchants)", rarity: "legendary", chance: 38 },
      { item: "Beacon ×2", rarity: "legendary", chance: 24 },
      { item: "Mythic Pet (Ender Dragon)", rarity: "mythic", chance: 16 },
      { item: "Custom Named «Fluxblade» Sword", rarity: "mythic", chance: 12 },
      { item: "Title: «FLUX DEITY» + 1M coins", rarity: "mythic", chance: 7 },
      { item: "Spawn Plot (100×100)", rarity: "legendary", chance: 3 },
    ],
  },
];

/* ---------------- shard packs ---------------- */
export type ShardPack = {
  id: string;
  name: string;
  amount: number;
  bonus: number;
  price: number;
  color: string;
  tag?: string;
};

export const SHARDS: ShardPack[] = [
  { id: "shard-s", name: "SHARD POUCH", amount: 500, bonus: 0, price: 49, color: "#67e8f9" },
  { id: "shard-m", name: "SHARD CACHE", amount: 1200, bonus: 200, price: 99, color: "#34d399", tag: "+200 BONUS" },
  { id: "shard-l", name: "SHARD VAULT", amount: 2600, bonus: 600, price: 199, color: "#c084fc", tag: "+600 BONUS" },
  { id: "shard-xl", name: "SHARD TREASURY", amount: 7000, bonus: 2000, price: 499, color: "#fbbf24", tag: "BEST VALUE" },
];

export const SHARD_SPENDS = [
  { label: "Cosmetic Trails", cost: "400" },
  { label: "Pet Eggs", cost: "800" },
  { label: "Crate Keys", cost: "250+" },
  { label: "Custom Titles", cost: "1,500" },
  { label: "Rank Upgrades", cost: "5,000+" },
  { label: "Spawn Plots", cost: "3,000" },
];

/* ---------------- live-ish event feed ---------------- */
export const EVENTS = [
  { who: "Steve_PvP", what: "opened a LEGENDARY KEY → Elytra", color: "#fbbf24" },
  { who: "Priya", what: "slayed the Ender Dragon (Season 03, #47)", color: "#c084fc" },
  { who: "Rohan", what: "claimed 2,000 blocks in the mesa", color: "#4ade80" },
  { who: "Arjun", what: "won the Saturday Build Battle", color: "#38bdf8" },
  { who: "Sana", what: "traded 64 emeralds at spawn market", color: "#4ade80" },
  { who: "Kavya", what: "opened an EPIC KEY → Mending Book", color: "#c084fc" },
  { who: "Dev", what: "hit rank #1 on the playtime leaderboard", color: "#fbbf24" },
];

/* ---------------- world features ---------------- */
export const FEATURES = [
  { icon: "coins", title: "PLAYER ECONOMY", desc: "Earn coins from jobs, auctions & the spawn market. Your grind has real value.", color: "#fbbf24" },
  { icon: "shield", title: "LAND CLAIMS", desc: "Grief-proof your base with one command. What's yours stays yours.", color: "#4ade80" },
  { icon: "sparkles", title: "CUSTOM ENCHANTS", desc: "30+ unique enchants you won't find on vanilla — teleporting bows, lifesteal, and more.", color: "#c084fc" },
  { icon: "calendar", title: "WEEKLY EVENTS", desc: "Build battles, drop parties, boss raids & PvP tournaments every single week.", color: "#38bdf8" },
  { icon: "users", title: "MCMMO LEVELS", desc: "Level up mining, farming & combat for passive perks and bragging rights.", color: "#4ade80" },
  { icon: "skull", title: "SEASON BOSSES", desc: "Server-wide boss fights with leaderboard rewards and mythic drops.", color: "#f472b6" },
];

export function openSmpOrder(itemId?: string) {
  window.dispatchEvent(new CustomEvent("flux-smp-order", { detail: itemId ?? "mvp" }));
}
