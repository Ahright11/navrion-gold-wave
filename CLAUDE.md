# NV Shipping (nvpshipping) — Project Notes

Boutique ship-management site for **NEW VISION SHIPPING S.A.** (NV), built in Vite + React 18 + TS + Tailwind + shadcn/ui. Originally scaffolded via Lovable; now being finished for the client (Constantine Podotas / Kassiani Zisi at NV).

## Who / Why
- **Client**: NEW VISION SHIPPING S.A. — Piraeus, Greece. 5-vessel bulk-carrier fleet (Fortune, Providence, Destiny, Galaxy, Horizon) + 4 historical ships.
- **Original agency**: ITSolution (uncle Roussos Stolidis, roussos.stolidis@itsolution.gr). Manolis is finishing the build.
- **Delivery pattern**: Roussos sends 3 staged emails to the client (see `DELIVERY-EMAILS.md`) with `[DEMO LINK]` — that link is `preview.nvshipping.com`.
- **Source of truth for content**: `EMAIL-CONTENT.md` — consolidated from 7 forwarded emails (Apr 8-9, 2026). Do NOT invent content that isn't in there.

## Deployment

### preview.nvshipping.com (staging — current working target)
- Shared cPanel hosting, Apache, Greek NS (`ns1/ns2.s441782.name-servers.gr`)
- cPanel user: `nvshippi` @ `nvshipping.com:2083`. Password is in local conversation context (rotate after sessions). FTP on port 21, SSH/22 blocked.
- Subdomain already created via cPanel API: `public_html/preview/`
- **Deploy command** (from `~/nvpshipping`):
  ```bash
  npm run build && lftp -u 'nvshippi,<PASSWORD>' -e \
    "set ftp:ssl-allow yes; set ssl:verify-certificate no; \
     mirror -R --parallel=4 --only-newer --no-perms dist/ public_html/preview/; bye" \
    nvshipping.com
  ```
- `.htaccess` lives in `public/.htaccess` so it ships every build. Contains the SPA rewrite rules — without it, deep links 404.
- AutoSSL was triggered once; re-run in cPanel → SSL/TLS Status if HTTPS is missing.

### nvshipping.com (production)
- **Still WordPress**, untouched. Don't overwrite `public_html/` on the apex — that's the live customer site.

### GitHub
- Remote: `Ahright11/navrion-gold-wave` (branch: `main`). Push is `gh auth setup-git` + `git push origin main`.
- No CI / auto-deploy — FTP mirror is manual.

## Architecture notes
- Single-page with `useFullPage` hook (`src/hooks/useFullPage.ts`) driving section-snap on desktop; normal scroll on mobile (<768px).
- Any new wheel-hijacking component must skip when the target is inside `.leaflet-container` — pattern established in `useFullPage.ts`.
- i18n system exists (`src/i18n.tsx`) with EN + GR translations, but **GR toggle is intentionally NOT rendered** — site is EN-only. `LangToggle.tsx` is dead code retained in case of revert. Don't re-import it without checking.
- Full-page scroll blocks when any element has `data-fleet-modal` — new modals should use this attribute if they open on top of the full-page sections.

## Performance decisions already made
- **PortsMap** (`src/components/PortsMap.tsx`): canvas renderer, no clustering (removed — individual ports must be hoverable), hover-intent 140ms before image fetch, URL cache, lazy tooltip images. **Never** re-introduce `closeTooltip()/openTooltip()` reposition trick — it thrashes Leaflet's tooltip layer. Custom SVG reticle cursor on `.leaflet-container`.
- **Blueprints** (`src/components/Fleet.tsx`): served via `<picture>` with WebP full + 1000px preview, PNG fallback. Full WebP preloaded with `fetchPriority=low` on modal open so Expand is instant. Drop-shadow was replaced with wrapper box-shadow — don't add drop-shadow back on the blueprint image itself.

## Client feedback already applied (Apr 20, 2026)
- ISO 9001:2015 certificate (Bureau Veritas, GR005631, valid to 20-04-2028) at `/iso-9001-certificate.pdf`. Button lives on the **Services → Technical** tab credentials (both desktop horizontal pill + stacked side card + mobile pill) — NOT on the About cert strip. That About strip is plain labels, per the client's mockup screenshot.
- Clickable-credential visual cue: same navy bg as the others (no color shift), small `ArrowUpRight` at 40% opacity, hover reveals a blue ring + arrow nudge. The earlier "brand-blue fill + ring" version was rejected as too loud and doubled the repetition.
- **Services default tab = Technical** (index 1), not Commercial.
- Charterer list (17 names) rendered as:
  - Desktop: intro + 3 stacked lines under the stats
  - Mobile: a scrolling marquee (75s loop, Raleway semibold 8-9px, · separator, mask-image fade at both edges, pause on hover). Playfair bold was rejected as "dizzy".
- Contact bg: `/images/office/reception.webp` (77 KB, optimized from the 2.6 MB client JPEG). Blur 4px (down from 8px).
- Google Map iframe on mobile: constrained width + centered + shorter so it reads as a preview card, not a banner. Desktop unchanged.

## Still open (needs client input)
- `/images/office/logo-wall.webp` (77 KB optimized from `logo website background.jpg`, 3024×4032 portrait) — staged but NOT placed anywhere. Manolis hasn't decided where it goes.
- **Bureau Veritas DOC** and **DNV · ClassNK** pills in the Technical tab are non-clickable labels; no PDFs supplied yet.
- Baidu-hosted `N1195 NAMING.7z` (ceremony archive) — link expires ~May 8, 2026. Unknown if downloaded.
- Client typo in one email: `nvshiping.com` — ensure only `nvshipping.com` is used in code.

## MCPs available to this project (2026-04-20)
- **gmail-composio** — hosted via Composio (`https://backend.composio.dev/tool_router/trs_i9gJFBkjF4un/mcp`). Auth key held in `~/.claude.json`. Gmail OAuth was completed through Composio's web UI; next session can search/read Roussos's emails directly. If `claude mcp list` shows it disconnected, re-authenticate via `/mcp` → gmail-composio → Authenticate.
- Standard Vite/React tooling — nothing special beyond the project's own `npm run dev / build`.

## Gotchas
- PNG fallbacks for blueprints and reception images remain in `public/` — `<picture>` source order picks WebP for modern browsers. Don't delete the PNGs.
- Vite lazy-loads `PortsMap` — the main index chunk doesn't contain it, so searching `grep PortsMap dist/index.html` finds nothing. Look inside `dist/assets/index-*.js` for the dynamic import ref.
- `public/blueprints/` ships both `.png` and `.webp` (full + preview). Total ~10 MB. Don't commit higher-res versions without re-running the cwebp script.
- FTP upload over 4 parallel conns transfers the full `dist/` (~224 MB including videos) in ~2-3 minutes. `--only-newer` skips unchanged files on subsequent deploys.
