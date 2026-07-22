# RealGram — realgram.no

![status](https://img.shields.io/badge/status-live-brightgreen)
![stack](https://img.shields.io/badge/stack-static%20HTML%2FCSS%2FJS-blue)
![license](https://img.shields.io/badge/license-proprietary-lightgrey)

**RealGram unifies four things under one identity (REAL-ID):** Shahnameh
(a Telegram-native game rooted in Persian epic storytelling), REAL (the
token and reward economy), Realink/Freedom (resilient connectivity for
users under network filtering), and TrustAI (verified referral
infrastructure). One login, one profile, one balance — instead of four
accounts to juggle.

This repo is the public site and content layer, live at **https://realgram.no**.

Built by **[Khabat Setaei](https://www.setai.no)** and
**[Dr. Nasrin Dadashi](https://www.dadashi.no)** — see **[PEOPLE.md](PEOPLE.md)**
for who does what. RealGram is the product of almost three years of work
across Shahnameh Season 1, the REAL token/blockchain layer, and the Realink
VPN app, now brought together as one platform.

## What lives here

Plain HTML/CSS/JS, no build step, no framework. Served directly from this
directory on the `realgram.no` / `www.realgram.no` vhost — editing a file
here puts it live on the next request.

```
index.html       Landing page
faq.html         FAQ (also carries FAQPage JSON-LD structured data)
blog.html        Blog listing — fetches published posts from the backend API
blog-post.html   Single blog post view
soon.html        Generic "not live yet" placeholder for unfinished sections
style.css        Shared styles for every page
app.js           Shared behavior: nav toggle, scroll-reveal animations, cinematic dust canvas
brand/           Logo marks, wordmarks, and token art (SVG/PNG) — see design/assets.md
design/          Visual identity system: tokens, brand brief, asset inventory
docs/            Public product reference — see docs/README.md
PEOPLE.md        Who built this and what each person owns
favicon.svg
robots.txt
sitemap.xml
```

Implementation-level engineering docs (API contracts, integration map,
monetization/anti-abuse rules, compliance reasoning) live in a private
companion repo, not here — see [docs/README.md](docs/README.md) for why.

## Architecture, at a glance

`realgram.no` is a static site with no server-side code of its own. Three
purposefully separate surfaces sit behind the same domain family: the
public site (this repo), a blog whose posts are authored elsewhere and
fetched client-side at page load, and an API/admin layer that RealGram's
backend systems sit behind. Deep infrastructure detail (which system runs
where, internal hostnames, box topology) lives in the private companion
repo — this file stays accurate about what's public without doubling as an
infrastructure map.

Nothing here depends on a build step or a deploy pipeline — a saved file is
live immediately. The one exception is blog *data*, fetched at page-load
time rather than baked into these HTML files.

## Branding

See **[design/](design/README.md)** for the visual identity system —
today's palette and type as captured tokens, the brand brief, and an honest
inventory of what exists vs. what's still missing. Shahnameh and RealGram
both have marks in `brand/` today; Realink/Freedom and TrustAI don't yet —
tracked as an open gap in `design/assets.md`, not an oversight to paper
over.

## Security

- `nginx` denies any request for a dotfile or a `.md` file directly
  (`location ~ /\. { deny all; }`, `location ~ \.(md)$ { deny all; }`) —
  this README and everything else `.md` here are not publicly fetchable
  even though they live in the web root.
- The blog's post body is authored exclusively through a JWT-gated admin
  editor — there is no public write path. `blog-post.html` renders
  `body_html` directly, which is safe specifically because that trust
  boundary holds; don't add any endpoint that lets untrusted input reach
  `body_html`.
- No secrets, API keys, or credentials belong in this repo — it's a static
  site with no server-side code of its own.
- See `SECURITY.md` for how to report a vulnerability.

## Local development

No build step. Serve the directory with anything that speaks static files, e.g.:

```
npx http-server . -p 8080
```

Blog pages will still hit the live backend API from local dev — there's no
local mock.

## Deploying

There isn't a deploy pipeline — this directory *is* the live web root.
Changes are made directly on the server and are live on save;
`git commit`/`git push` here is for history and backup, not for triggering
a deploy.
