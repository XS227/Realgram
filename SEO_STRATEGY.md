# RealGram — SEO strategy (v1, 2026-07-18)

Written fresh for `realgram.no`, replacing the old `setalink.no` positioning
("VPN Built for Iran", explicit censorship-circumvention framing) with
language scoped to RealGram specifically.

## Hard constraint (do not violate — Khabat's standing rule, 2026-07-10)

RealGram must not:
- Use Telegram's logo, or imply it is an official Telegram product/client.
- Market itself as bypassing a government blockade.

This is *not* a general ban on the underlying connectivity story — the
VPN/anti-censorship marketing that used to run under the Realink name
already leans into "bypass censorship" — it is specific to RealGram's
public-facing copy and store listing.

**Update (Khabat, 2026-07-19): the loosening described below has happened.**
RealGram is now the umbrella brand — "Realink" is retired as a
public-facing name; `realgram.no` no longer presents it as a separate
sibling product (previously a 4-card ecosystem section, now 3: RealGram /
Shahnameh / TrustAI — the connection-layer copy that used to credit
"Realink" now credits RealGram directly). The Telegram-logo /
government-blockade constraints above still stand — this is a name change,
not a loosening of what RealGram is allowed to claim.

~~If this constraint is meant to loosen now that RealGram is becoming the
umbrella brand (per §5.1 of `ADMIN_NOC_ROADMAP.md`, "REALINK = REALGRAM,
ett produkt"), that's Khabat's call to make explicitly — don't assume it
from this request alone.~~ — resolved above, 2026-07-19.

## Positioning shift

| | Old (setalink.no) | New (realgram.no) |
|---|---|---|
| Core promise | "Break through any restriction" | "Messaging that pays attention back" |
| Framing | Anti-censorship tool | Independent messenger + real economy |
| Proof points | VLESS+Reality, zero logs, AI routing | Independent client, true RTL/locale design, REAL balance, ecosystem (RealGram/Shahnameh/TrustAI) |
| Emotional register | Defiance / freedom-fighter | Calm, confident, "built properly" |

## Primary keyword clusters

1. **Category / independent messaging**
   `independent messenger`, `private messaging app`, `secure chat app`,
   `messaging app with rewards`, `earn while messaging` — legitimate
   category terms; do not pair with "Telegram" in a way that implies
   official status. A factual, one-time mention like "interoperates with
   the networks you already use" is fine; "Telegram alternative" as a
   *category* descriptor (the way dozens of independent clients use it) is
   commonly accepted and is not the same claim as "official Telegram app" —
   still, keep it out of headline copy; fine in a lower-funnel FAQ page if
   we add one later.

2. **Locale / multilingual**
   `فارسی پیام‌رسان` (Persian messenger), `RTL chat app`, `پیام رسان امن`
   (secure messenger), `мессенджер на русском`, `中文聊天应用` — these are
   honest, high-intent, and avoid the compliance trap entirely since they
   describe language support, not circumvention.

3. **Ecosystem / earn**
   `REAL economy`, `earn REAL`, `Shahnameh game rewards`, `refer and earn
   messaging app` — genuinely differentiated, nobody else owns these terms.

4. **Brand**
   `RealGram`, `RealGram app`, `RealGram download` — brand-defense terms,
   low competition, should rank #1 organically almost immediately; watch
   for confusion with unrelated third-party "Realgram" trademarks/handles
   if any exist (not checked as part of this pass — worth a trademark
   search before heavy spend).

## What we're deliberately not targeting (yet)

- `VPN Iran`, `bypass censorship`, `فیلترشکن` — Realink's cluster, not
  RealGram's. Cross-linking between the two sites is fine; keyword overlap
  in RealGram's own meta tags is not, per the constraint above.
- Anything implying Telegram official status (`Telegram web`, `Telegram
  download`, etc.) — even innocuous-seeming ones like `Telegram for PC`
  attract the wrong intent and legal exposure.

## On-page implementation (done in this pass)

- `<title>`, meta description, OG/Twitter tags on `index.html` — written
  around cluster 1 (independent messenger, earn) and cluster 3 (REAL
  economy), not cluster "old setalink" language.
- `robots.txt` + `sitemap.xml` stubs — single URL for now; expand the
  sitemap as real subpages (FAQ, About, Download) get built.
- No fabricated stats/social proof on the page (no fake user counts,
  fake review scores) — consistent with the project's standing
  no-placeholder-presented-as-real principle (`ADMIN_NOC_ROADMAP.md` §0.1/
  §8.0). Add real numbers only when they exist and are verifiable.

## Open, not done in this pass

- No backlink/content-marketing plan yet (blog, comparison pages) — scope
  call for Khabat: is realgram.no meant to carry a blog/content section,
  or stay a single landing page funneling to app stores?
- No structured data (`Organization`/`SoftwareApplication` JSON-LD) added
  yet — cheap to add once app store URLs are final; placeholder URLs would
  violate the no-fake-data principle above, so deferred.
- No analytics/Search Console wired up — same blocker as `setalink.no`'s
  own SEO section (`ADMIN_NOC_ROADMAP.md` §4.0): needs real API
  credentials, not started here.
