# RealGram — Design & Identity

RealGram has a visual system in code — `style.css` defines a real palette
and type scale, and it's used consistently across the site. What it doesn't
have yet is a *written*, deliberate identity: no documented rationale for
the choices, no guidance for applying them consistently outside this one
codebase (app icon, social preview cards, a pitch deck, the mobile app UI),
and no answer to "what does RealGram feel like" beyond "here's the CSS."

That's the honest starting point, and it's what this folder exists to fix.
Not a finished brand system dropped in overnight — a real one, built
deliberately, starting from what's already true and proven (the gold accent
already means *value*, the palette already works) rather than throwing it
out and starting over.

## What's here

- **[tokens.md](tokens.md)** — the palette, type, and spacing that exist
  today, captured as the v0 baseline. This is *description*, not new
  design — it's what's already live on realgram.no.
- **[brand-principles.md](brand-principles.md)** — the identity brief: who
  RealGram is for, what it should feel like, and the constraints (four
  unified parts, four-locale support, a Telegram-familiar 90/10 ratio) that
  any real visual identity has to hold true under.
- **[assets.md](assets.md)** — what exists in `../brand/` today and what's
  actually missing (app icon variants, a social preview image, a real logo
  system beyond a single lockup).

## What this folder is not, yet

A resolved brand guideline with an approved logo system, motion language,
and photography direction. That's real design work — it needs the two
people building RealGram to make actual calls on how RealGram should look
and feel, not just what it happens to look like today. This folder is the
room for that work to happen in, with a clear starting point instead of a
blank page.
