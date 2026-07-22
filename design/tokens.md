# Visual tokens — v0 (as-built)

Captured directly from `style.css` and the mobile app's existing design
system on 2026-07-22. This is what's live today, written down for the first
time — not a proposal.

## Color

| Token | Value | Use |
|---|---|---|
| `--void` | `#030609` | Deepest background |
| `--base` | `#070D18` | Primary background |
| `--surface` | `#0D1828` | Cards, panels |
| `--elevated` | `#111F35` | Raised surfaces, modals |
| `--purple` | `#C77DFF` | Accent (site-specific) |
| `--purple-dim` | `#9A5CD0` | Accent, muted state |
| `--emerald` | `#00E87A` | Primary product accent (mobile app) |
| `--blue` | `#3399FF` | Secondary accent |
| `--gold` | `#D4AF37` | **Semantic only — see below** |
| `--gold-light` | `#F0D060` | **Semantic only — see below** |
| `--text-primary` | `#F0F6FF` | Primary text on dark |
| `--text-secondary` | `#7A9BC0` | Secondary text |
| `--text-muted` | `#3D5570` | Tertiary / disabled text |

**Gold is not a decorative accent — it's a signal.** It means *value*:
REAL balance, earned rewards, Shahnameh achievements surfaced in RealGram,
referral milestones, premium connectivity state. If gold shows up on a
screen where nothing of value is being communicated, that's a bug in the
application of the system, not a style choice. This rule already exists in
the mobile app's design system and should hold everywhere RealGram's
identity shows up, including this site and any future marketing material.

## Type

| Role | Family | Notes |
|---|---|---|
| Display / body | Inter | System-ui/-apple-system/sans-serif fallback |
| Metrics, IDs, timestamps | JetBrains Mono | ui-monospace fallback |

**Known gap:** Inter doesn't cover Persian (Perso-Arabic) shaping, Cyrillic
renders at uneven weight, and CJK isn't covered at all. RealGram is
committed to four locales (English, Persian/Farsi, Russian, Simplified
Chinese) — a real identity system has to either pick per-locale type pairs
now or explicitly flag this as unresolved. Right now it's unresolved.

## Shape & surface

- Glassmorphism: `rgba(13,24,40,0.72)` background, `rgba(255,255,255,0.08)`
  border, `blur(20px) saturate(180%)`.
- Radius: `16px` (large), `20px` (extra-large), full/pill for badges.

## Where this diverges: site vs. app

The website (`style.css`, this repo) and the mobile app's own design system
share the void/base/surface ground and the gold-as-value rule, but the site
adds its own `--purple` accent that the mobile app doesn't use. Worth a
deliberate decision — one accent system across every surface, or a
documented reason the site gets its own — rather than an accidental drift
that grows over time.
