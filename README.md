# ⚡ FLUX HOST — India's Premier Minecraft Server Hosting

A premium, single-page hosting website with a **3D scroll-driven AMD Ryzen chip reveal**,
interactive plan finder, live **Discord webhook order system**, MCP AI-agent chat demo,
orbital network map and cinematic credits.

> **Created by AKSHAT · Directed by HUZAIFA**

---

## 🚀 Publish to GitHub (GitHub Pages)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys
the site automatically on every push to `main`.

### 1. Create the repository on github.com
Create a **new empty repo** (no README/license) — e.g. `flux-host`.

### 2. Push this project

```bash
# inside this project folder
git init
git add .
git commit -m "FLUX HOST — initial release"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/flux-host.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Open the repo → **Settings** → **Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Done — the workflow runs on every push and your site goes live at:

```
https://<YOUR-USERNAME>.github.io/flux-host/
```

The workflow automatically rewrites `/img/…` asset paths so everything works under the
repo subpath.

---

## 🌍 Free hosts with a free subdomain (ranked for this site)

The build output is **one `index.html` + an `img/` folder**, so ANY static host works.
No server-side code needed.

| # | Host | Free domain | Ease | Notes |
|---|---|---|---|---|
| 1 | **Netlify Drop** | `yoursite.netlify.app` | ⭐⭐⭐⭐⭐ | Drag & drop the folder. Live in 30s. Works from a phone. |
| 2 | **Neocities** | `yoursite.neocities.org` | ⭐⭐⭐⭐⭐ | Simple file manager, no ads injected, very beginner friendly |
| 3 | **GitHub Pages** | `user.github.io/repo` | ⭐⭐⭐⭐ | Already wired — push repo, enable Pages (see above) |
| 4 | **Tiiny.host** | `yoursite.tiiny.site` | ⭐⭐⭐⭐ | Upload a zip, instant. Free tier adds a small badge |
| 5 | **Vercel** | `yoursite.vercel.app` | ⭐⭐⭐ | Best performance; import repo at vercel.com/new |
| 6 | **Cloudflare Pages** | `yoursite.pages.dev` | ⭐⭐⭐ | Fast global CDN; connect repo |
| 7 | **Glitch** | `yoursite.glitch.me` | ⭐⭐⭐ | In-browser editor; upload `dist` contents as files |
| 8 | **InfinityFree** | `yoursite.great-site.net` | ⭐⭐ | Free PHP hosting, but clunky manager + injected ads script |

### 🥇 Netlify Drop — 30-second deploy (even from a phone)

1. `npm run build` → you get the `dist/` folder (index.html + img)
2. Zip the **contents** of `dist` (or the folder itself — both work here)
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop) → drag the zip/folder in
4. Done → you get `https://random-name.netlify.app`, rename it under **Site settings → Change site name**

Free SSL, no ads, no account limits drama. This is the one to pick.

### 📱 Deploying from a phone (no computer, no build step)

You can't run `npm run build` on a phone, so grab the already-built page:

1. Open the **live preview URL** of this project (where the site actually works)
2. Chrome `⋮` menu → **Download** / **Save page as HTML** → you get one ~380 KB file
3. Rename it to `index.html` — that single file **is** the entire website
4. Copy the `public/img` folder next to it
5. Upload `index.html` + `img/` to **Netlify Drop** or **Cloudflare Pages → Upload assets**

⚠️ Never upload the `src/` folder or the root `index.html` (1.2 KB) — those are source
code and show a blank page. The built file is ~380 KB of minified code.

### Local preview

```bash
npm run build && npm run preview
```

---

## 🛠️ Local development

```bash
npm install     # install dependencies
npm run dev     # dev server with hot reload
npm run build   # production build → dist/
```

## 🧩 What's inside

| Feature | Details |
|---|---|
| 3D CPU hero | CSS 3D Ryzen chip — scroll spins it skyward, dies explode into plan series |
| Plans | 4 series · 19 real plans (Budget / EPYC 7763 / Ryzen 5900X VPS / Ryzen 9 9950X) |
| Order system | Modal collects Gmail, Discord ID, Minecraft name + plan → posts to Discord webhook |
| Coupon | `FLUXLAUNCH` = 15% off first month |
| AI Agent | MCP chat demo — self-typing conversation with action badges |
| Network | Orbital city-ping map with animated counters |
| Credits | Shimmering top strip: Created by AKSHAT · Directed by HUZAIFA |

## 🔑 Order webhook

Orders POST to the Discord webhook configured in
`src/components/OrderModal.tsx` (`WEBHOOK_URL`). Replace the URL there if you rotate it.

## 📞 Links

- **Server IP:** `play.fluxsmp.fun`
- **Discord:** [discord.gg/4jM9mqvtnZ](https://discord.gg/4jM9mqvtnZ)
- **Payments:** UPI · GPay · Paytm · PhonePe · Crypto

---

© 2025 FLUX HOST · Not affiliated with Mojang AB or Microsoft.
