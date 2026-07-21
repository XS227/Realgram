# RealGram blog — 6-month content plan (2026-07-21)

Goal: 2–3 posts/week for ~24 weeks, ~70 articles, spread across five
content pillars so RealGram has a real shot at ranking across many
related searches instead of resting on a handful of posts.

## Compliance note — read before writing "Internet Freedom" pillar posts

`SEO_STRATEGY.md`'s hard constraint still applies to anything published
under the RealGram brand: **no marketing RealGram itself as a
government-blockade-bypass tool, no implying Telegram-official status.**
"Circumvention technology" is a real, legitimate pillar here, but it
gets written as **general digital-rights / privacy-education content**
(how censorship-resistant protocols work, why they matter, the
technology and ethics of the open internet) — not as "here's how to
beat [country]'s block on [carrier]," which was the old SetaLink
`filtershekan-*` articles' framing. Those old articles (carrier-guide,
irancell-disconnect, instagram, whatsapp — all Persian, all carrier-
specific circumvention how-tos) are the ones most clearly **NOT a
straight migration candidate** for exactly this reason; if their
underlying protocol/technical substance is worth reusing, it gets
rewritten from "how to beat X" into "how censorship-resistant tech
works" framing, never copied.

## Per-article requirements (every post, no exceptions)

- SEO title + meta description (excerpt field)
- OG/Twitter cover image — generated via `scripts/make_cover.py` when no
  real photo/illustration exists (see `brand/covers/`)
- Structured data — automatic, `scripts/generate-blog.js` emits
  `BlogPosting` JSON-LD for every post already, nothing extra to do
- 2–3 internal links to other real, already-published RealGram pages/
  posts (never link to a not-yet-published slug)
- A short "Related" list at the end, same constraint — only link what
  exists
- One clear CTA to install RealGram (`/#get`)

## Editorial standard, raised 2026-07-21

- **1,500–2,500+ words where the topic genuinely supports it** — not
  padding, real depth (mechanisms, tradeoffs, honest limitations).
  Articles 7–9 (REAL economy, community, digital identity) landed at
  ~1,200–1,600 words each; that's the realistic range for topics this
  specific without inflating with filler.
- **FAQ section + `FAQPage` JSON-LD where relevant** — written directly
  into `body_html` as a `<div class="faq-block">` + an inline
  `<script type="application/ld+json">` block, not a schema/pipeline
  change. Keeps `generate-blog.js` untouched; treated as authored
  content like the rest of the post.
- **Reference trustworthy concepts/sources by name where it adds
  credibility** (e.g. "digital rights researchers have documented...")
  without fabricating specific URLs, statistics, or citations that
  haven't been verified.
- **Never overclaim unverified product specifics** — e.g. don't invent
  account-recovery flows, cryptographic claims, or feature details not
  actually confirmed in the codebase or FAQ. Precision over
  reassurance.

## Pillars

1. **Internet Freedom** — why unrestricted internet matters, censorship-
   resistant tech (general), online privacy, digital rights, secure
   communication
2. **RealGram** — REAL-ID, "one account, one identity, one app",
   messaging, identity, privacy, community
3. **REAL Economy** — REAL token, rewards, referrals, premium, digital
   economy, creator economy
4. **Shahnameh** — educational gaming, Persian culture, history,
   gamification, learning platforms
5. **Technology** — VPN protocols, WireGuard, Xray, IPv6, network
   performance, security

## Status legend

`PUBLISHED` = live now · `DRAFT` = written, not yet published ·
`PLANNED` = title only, not yet written

## Weeks 1–4 — foundation (Khabat's named first 10 + a few pillar openers)

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 1 | 1 | RealGram | Welcome to RealGram | PUBLISHED (already live, 2026-07-20) |
| 2 | 1 | Internet Freedom | Why Internet Freedom Matters | PUBLISHED |
| 3 | 1 | RealGram | REAL-ID Explained: One Identity, Every Part of RealGram | PUBLISHED |
| 4 | 2 | RealGram | How RealGram Protects Your Privacy | PUBLISHED |
| 5 | 2 | Technology | RealGram vs. Traditional VPN Apps | PUBLISHED |
| 6 | 2 | Shahnameh | Shahnameh: Learning Through Games | PUBLISHED |
| 7 | 3 | REAL Economy | How the REAL Token Economy Works | PUBLISHED (long-form, FAQ+schema) |
| 8 | 3 | RealGram | Building a Free Internet Community | PUBLISHED (long-form, FAQ+schema) |
| 9 | 3 | RealGram | Digital Identity Without Big Tech | PUBLISHED (long-form, FAQ+schema) |
| 10 | 4 | RealGram | The Future of RealGram | PUBLISHED (long-form, FAQ+schema) |
| 11 | 4 | Internet Freedom | What "Digital Rights" Actually Means | PUBLISHED (long-form, FAQ+schema) |
| 12 | 4 | Technology | A Plain-English Guide to WireGuard | PUBLISHED (long-form, FAQ+schema) |

## Weeks 5–8 — Technology + Internet Freedom depth

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 13 | 5 | Technology | Xray and the Reality Protocol, Explained Simply | PLANNED |
| 14 | 5 | Internet Freedom | Secure Messaging 101: What "End-to-End" Really Means | PLANNED |
| 15 | 5 | Technology | Why IPv6 Matters for a Faster, More Resilient Internet | PLANNED |
| 16 | 6 | Internet Freedom | The Technology Behind Censorship-Resistant Networks | PLANNED |
| 17 | 6 | Technology | VPN Protocols Compared: WireGuard vs. OpenVPN vs. Xray | PLANNED |
| 18 | 6 | Internet Freedom | Metadata: The Privacy Risk Most People Ignore | PLANNED |
| 19 | 7 | Technology | Network Performance 101: Why Your VPN Feels Slow (and When It Doesn't) | PLANNED |
| 20 | 7 | Internet Freedom | A Short History of Internet Censorship — and the Tech That Answered It | PLANNED |
| 21 | 7 | Technology | Why RealGram Runs Multiple Protocols Instead of Just One | PLANNED |
| 22 | 8 | Internet Freedom | Privacy Isn't Just for People With Something to Hide | PLANNED |
| 23 | 8 | Technology | How Server-Side Verification Stops Fake Rewards (and Fake Everything Else) | PLANNED |
| 24 | 8 | Internet Freedom | Digital Rights Around the World: A Quick Primer | PLANNED |

## Weeks 9–12 — REAL Economy depth

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 25 | 9 | REAL Economy | What Is the REAL Token, Really? | PLANNED |
| 26 | 9 | REAL Economy | How Referrals Work in RealGram | PLANNED |
| 27 | 9 | REAL Economy | RealGram Premium: What You Actually Get | PLANNED |
| 28 | 10 | REAL Economy | The Digital Economy Explained for Non-Crypto People | PLANNED |
| 29 | 10 | REAL Economy | How Rewarded Actions Are Verified Server-Side (No Fake Balances) | PLANNED |
| 30 | 10 | REAL Economy | The Creator Economy Inside RealGram | PLANNED |
| 31 | 11 | REAL Economy | REAL Wallet: Your One Balance Across the Whole Ecosystem | PLANNED |
| 32 | 11 | RealGram | Clan: Building Your Group Inside RealGram | PLANNED |
| 33 | 11 | REAL Economy | Why "Server-Verified" Rewards Beat Client-Side Counters | PLANNED |
| 34 | 12 | REAL Economy | From Referral to REAL: A Walkthrough | PLANNED |
| 35 | 12 | RealGram | Hakim AI: Your Guide Inside RealGram | PLANNED |
| 36 | 12 | REAL Economy | Common REAL Token Questions, Answered | PLANNED |

## Weeks 13–16 — Shahnameh depth

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 37 | 13 | Shahnameh | What Is the Shahnameh? A Beginner's Guide to Persia's National Epic | PLANNED |
| 38 | 13 | Shahnameh | Rostam and Sohrab: The Tragedy at the Heart of the Shahnameh | PLANNED |
| 39 | 13 | Shahnameh | How Gamification Makes History Stick | PLANNED |
| 40 | 14 | Shahnameh | Ferdowsi: The Poet Who Saved a Language | PLANNED |
| 41 | 14 | Shahnameh | Learning Through Play: The Research Behind Educational Games | PLANNED |
| 42 | 14 | Shahnameh | Persian Culture 101: What the Shahnameh Teaches Us Today | PLANNED |
| 43 | 15 | Shahnameh | Inside Shahnameh's Chapter System: How Progress Works | PLANNED |
| 44 | 15 | Shahnameh | Why RealGram Built a Game Instead of Just an App | PLANNED |
| 45 | 15 | Shahnameh | The Shahnameh's Heroes: A Quick-Reference Guide | PLANNED |
| 46 | 16 | Shahnameh | From Ancient Epic to Mobile Game: Adapting the Shahnameh | PLANNED |
| 47 | 16 | Shahnameh | Clans, Quests, and Community in Shahnameh | PLANNED |
| 48 | 16 | Internet Freedom | Why Language and Culture Are Digital Rights Issues Too | PLANNED |

## Weeks 17–20 — RealGram identity/community depth

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 49 | 17 | RealGram | One Account, Six Parts: How RealGram Actually Fits Together | PLANNED |
| 50 | 17 | RealGram | Messages, Reimagined: What Makes RealGram's Chat Different | PLANNED |
| 51 | 17 | RealGram | Is RealGram a Telegram Alternative? Here's the Honest Answer | PLANNED |
| 52 | 18 | RealGram | Multilingual by Design: RTL, Persian, and Beyond | PLANNED |
| 53 | 18 | RealGram | Community Without a Corporation Behind It | PLANNED |
| 54 | 18 | Internet Freedom | Why Independent Apps Matter More Than Ever | PLANNED |
| 55 | 19 | RealGram | RealGram's Identity Model, Explained for Skeptics | PLANNED |
| 56 | 19 | RealGram | From Sign-Up to REAL-ID: What Actually Happens | PLANNED |
| 57 | 19 | Technology | How RealGram Keeps Your Data Yours | PLANNED |
| 58 | 20 | RealGram | Building in Public: What's Next for RealGram (Q&A Format) | PLANNED |
| 59 | 20 | RealGram | RealGram for Beginners: A 5-Minute Starter Guide | PLANNED |
| 60 | 20 | Internet Freedom | What Makes an App Trustworthy? A Checklist | PLANNED |

## Weeks 21–24 — comparisons, roundups, wrap

| # | Week | Pillar | Title | Status |
|---|---|---|---|---|
| 61 | 21 | Technology | RealGram's Tech Stack, Explained for Curious Users | PLANNED |
| 62 | 21 | REAL Economy | REAL Economy vs. Traditional In-App Currencies | PLANNED |
| 63 | 21 | Internet Freedom | The Case for Owning Your Own Digital Identity | PLANNED |
| 64 | 22 | Shahnameh | Shahnameh Update: New Chapters, New Heroes (living/recurring format) | PLANNED |
| 65 | 22 | RealGram | RealGram Community Spotlight (living/recurring format) | PLANNED |
| 66 | 22 | Technology | How We Think About Uptime and Reliability | PLANNED |
| 67 | 23 | Internet Freedom | Digital Rights News Roundup (living/recurring format) | PLANNED |
| 68 | 23 | REAL Economy | REAL Token Roadmap Update (living/recurring format) | PLANNED |
| 69 | 23 | RealGram | Six Months of RealGram: What We Learned | PLANNED |
| 70 | 24 | RealGram | RealGram Year One Roadmap | PLANNED |
| 71 | 24 | Internet Freedom | Internet Freedom in 2027: What to Watch | PLANNED |
| 72 | 24 | RealGram | Why We Built RealGram (Founder's Note) | PLANNED |

**72 articles total** — comfortably in the 50–100 range, ~3/week, 24
weeks. Three titles are marked "living/recurring format" — those are
meant to be refreshed/re-published periodically (roadmap updates,
community spotlights) rather than one-and-done, a common way to keep a
content calendar from running out of genuinely new material every week
for 6 months straight.

## Migration review — former SetaLink blog articles

| Old article | Topic | Verdict |
|---|---|---|
| `filtershekan-carrier-guide` | Per-carrier circumvention how-to (Persian) | **Rewrite only, not migrate as-is** — reframe from "beat carrier X" into general censorship-resistant-technology education (feeds weeks 6–7 Technology/Internet Freedom slots above), per the compliance note |
| `filtershekan-irancell-disconnect` | Irancell-specific disconnect diagnosis | **Same** — the underlying protocol facts (Reality/Xray behavior under blocking) are reusable for a general "how censorship-resistant networks work" piece; the carrier-specific framing is not |
| `filtershekan-instagram` | Instagram-specific circumvention guide | **Same treatment** |
| `filtershekan-whatsapp` | WhatsApp-specific circumvention guide | **Same treatment** |

No other SetaLink blog articles were found in the repo's SEO branches —
these four `filtershekan-*` posts are the entire former blog. None of
them get a direct copy-paste migration; all four's reusable substance is
already folded into the Technology/Internet Freedom slots in weeks 5–8
above, written fresh for RealGram's own framing.

### Preserving SEO value from the old URLs — recommendation, not yet done

If any of the four `setalink.no/blog/filtershekan-*` pages have real
accumulated backlinks or rankings (not checked — would need actual
Search Console data on `setalink.no`, which nobody has confirmed access
to in this file), the standard way to carry that equity forward once
the rewritten RealGram equivalents are live is a 301 redirect from each
old URL to its new counterpart, not a takedown or a silent duplicate.
That's a change to a **live production domain** (`setalink.no`,
5.249.252.221) this session doesn't have access to and isn't making
unilaterally — flagging as a recommendation for whoever has access,
once the rewritten Technology/Internet Freedom articles (weeks 5–8)
actually exist to redirect to. Doing the redirect before the
replacement content exists would just be a broken link with extra
steps.
