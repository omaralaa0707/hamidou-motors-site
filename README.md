# Hamedo Motors — site 36 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Hamedo Motors, and not an official site.**

- **Live:** https://hamidou-motors-site.vercel.app
- **Repo:** [hamidou-motors-site](https://github.com/omaralaa0707/hamidou-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Cool near-black #0D1114, sampled from their own Haval service-bay poster, with panel #171B1F and signal red #E3212F sampled from their "HAMEDO" wordmark bar — the account's only consistent colour across every poster, so no third hue and no gold anywhere, since gold-on-black as an identity belongs to 02

**Type pairing**
: Michroma + Overpass / Qahiri + Ruwudu (AR)

**3D / signature technique**
: **The network**: their four published branch Google Maps links resolved to real coordinates and projected onto a flat local plane — three branches clustered within a 25 km radius of Greater Cairo collapse into nearly one point, and a fourth on the North Coast sits far off on its own, at true relative scale with no distortion. Pins and routes are drawn at deliberately oversized world-scale (the way every map pin on every real map is larger than the place it marks) so they stay legible at the distance the layout's own disparity forces the camera back to

**Motion language**
: **The ping**: a thin red ring expands outward from a block's own leading edge and dissolves while the content steps up to full opacity beneath it, styled after the dealer's own "keep your eye on the map" teaser — a dropped pin with roads lighting and radiating outward

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/hamedomotors/
- Facebook: https://www.facebook.com/HamedoMotors/
- Google Maps: https://www.google.com/maps/place/Hamido+Motors/data=!4m2!3m1!1s0x0:0xb67d902d28c13728

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
