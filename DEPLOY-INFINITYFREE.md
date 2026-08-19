# 🌐 Deploy FLUX HOST to InfinityFree (File Manager Method)

InfinityFree hosts static sites for free. Your site is a **single `index.html`**
(everything inlined) **plus one `img/` folder** — upload those two things and you're live.

---

## Step 0 — Build the site (on your computer)

```bash
npm install
npm run build
node fix-paths.mjs     # makes image paths relative → works on any host/folder
```

When it finishes you have a `dist/` folder:

```
dist/
├── index.html      ← the whole website (~380 KB, JS+CSS inlined)
└── img/            ← 6 AI images (pcb-texture.jpg, die-texture.jpg, datacenter.jpg, …)
```

## Step 1 — Zip the CONTENTS of `dist`

Select **`index.html` and the `img` folder together** → right-click →
*Send to → Compressed (zipped) folder* (Windows) or *Compress* (Mac).

⚠️ **Zip the contents, not the `dist` folder itself** — `index.html` must be at the
TOP level of the zip, not inside a `dist/` subfolder.

## Step 2 — Open the file manager

1. Log in at [app.infinityfree.com](https://app.infinityfree.com)
2. Click your domain / free subdomain → **Control Panel**
3. Open **Online File Manager**
4. Navigate into the **`htdocs`** folder (that's your website's root)

## Step 3 — Clean the default files

Delete whatever InfinityFree put there by default
(`index2.html`, `default.php`, etc.).

## Step 4 — Upload & extract

1. Click **Upload** → choose your zip file → upload
2. Right-click the uploaded zip → **Extract**
3. Delete the zip after extraction

You should now see inside `htdocs`:

```
htdocs/
├── index.html
└── img/
```

## Step 5 — Visit your site

Open your free subdomain, e.g.:

```
http://fluxhost.infinityfreeapp.com/
```

🎉 Done — the whole 3D experience, plan builder and Discord order system are live.

---

## Optional — Free SSL (https)

Control Panel → **Free SSL Certificates** → request the free Let's Encrypt cert
for your subdomain. Takes ~5 minutes.

## Troubleshooting

| Problem | Fix |
|---|---|
| Images not loading | Make sure you ran `node fix-paths.mjs` and extracted the zip **inside `htdocs`** |
| "Index of /" listing | `index.html` must be directly in `htdocs`, not in a subfolder |
| Old site still showing | Hard-refresh: `Ctrl + F5` |
| Upload too slow | Use FTP (FileZilla) with the FTP account from the client area — upload the same two items |

## FTP alternative (big files / slow manager)

Client Area → **FTP Accounts** → note host, username, password → connect with
FileZilla → drag `index.html` + `img/` into `htdocs`.
