# Deploying nvshipping

This site has **two deploy targets** on the same cPanel hosting account:

| Target | URL | Server folder |
|---|---|---|
| **Preview / staging** | https://preview.nvshipping.com | `public_html/preview/` |
| **Production / live** | https://nvshipping.com | `public_html/` |

Both serve the same React/Vite codebase. The only difference is which folder you upload the build into.

---

## Before you deploy

1. **Pull latest:** `git pull origin main`
2. **Tell the other person** (WhatsApp/Telegram) — *"deploying preview"* or *"deploying prod"*. FTP isn't atomic; only one person should deploy at a time.
3. **Make sure your changes are committed and pushed** — git is the source of truth, not the FTP server.

---

## Deploy to preview (default — what you do every time)

From inside `~/nvpshipping`:

```bash
npm run build && lftp -e \
  "set ftp:ssl-allow yes; set ssl:verify-certificate no; \
   mirror -R --parallel=4 --only-newer --no-perms dist/ public_html/preview/; bye" \
  nvshipping.com
```

FTP credentials are read from your `~/.netrc` (Mac/Linux) or `_netrc` (Windows). If lftp prompts for a password, your netrc isn't set up — see `COLLAB.md`.

Then check: https://preview.nvshipping.com

---

## Deploy to production (the live site)

**Only do this when the change has been signed off** — clients see this immediately.

```bash
npm run build && lftp -e \
  "set ftp:ssl-allow yes; set ssl:verify-certificate no; \
   mirror -R --parallel=4 --only-newer --no-perms dist/ public_html/; bye" \
  nvshipping.com
```

Same command, only `public_html/preview/` → `public_html/`.

**This is safe re: WordPress:** the old WordPress files coexist in `public_html/`, but Apache serves `index.html` (React) over `index.php` (WordPress). `mirror -R` without `--delete` only uploads new/changed files — it never deletes WordPress files.

Then check: https://nvshipping.com

---

## After deploying

Add an entry to `CHANGELOG.md`:

```markdown
- **2026-05-05** — Manolis — deployed to preview — *fixed contact form spacing*
```

Takes 10 seconds, prevents weeks of "wait, did we deploy that?".

---

## Common issues

- **`lftp: command not found`** — install it: macOS `brew install lftp`, Ubuntu/WSL `sudo apt install lftp`. Windows native: use FileZilla manually or install lftp via WSL.
- **FTP asks for password every time** — set up `~/.netrc` (see `COLLAB.md`).
- **Deep links 404 after deploy** — `public/.htaccess` is missing or didn't upload. Re-run deploy.
- **HTTPS broken** — log into cPanel → SSL/TLS Status → run AutoSSL.
- **Site looks unchanged** — browser cache. Hard refresh (Cmd+Shift+R / Ctrl+F5) or open in incognito.
