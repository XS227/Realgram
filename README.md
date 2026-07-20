# RealGram — realgram.no

The public marketing site and content layer for **RealGram**: one app connecting Freedom (VPN), Shahnameh (game), REAL Wallet, Messages, Clan, and Hakim AI under a single REAL-ID.

Live at **https://realgram.no**.

## What lives here

This repo is the static site served directly from `/var/www/realgram` on the `realgram.no` / `www.realgram.no` vhost — plain HTML/CSS/JS, no build step, no framework. Editing a file here and it's live on the next request.

```
index.html       Landing page
faq.html         FAQ (also carries FAQPage JSON-LD structured data)
blog.html        Blog listing — fetches published posts from the shahnameh-backend API
blog-post.html   Single blog post view
soon.html        Generic "not live yet" placeholder for unfinished sections
style.css        Shared styles for every page
app.js           Shared behavior: nav toggle, scroll-reveal animations, cinematic dust canvas
brand/           RealGram's own logo marks and wordmarks (SVG)
favicon.svg
robots.txt
sitemap.xml
SEO_STRATEGY.md  SEO/content strategy notes (internal)
```

## Architecture — how this fits the wider RealGram ecosystem

`realgram.no` is **one of three subdomains**, each routed differently by nginx's `stream{}` SNI router on this box (`/etc/nginx/sites-enabled/realgram.no`):

| Host | Serves | Backend |
|---|---|---|
| `realgram.no` / `www.realgram.no` | **This repo** — static files | Local disk, this box |
| `api.realgram.no` | Transparent reverse proxy, unmodified path+query | `setalink.no` (SetaLink VPN backend, separate box/repo) |
| `admin.realgram.no` | Transparent reverse proxy → `/_setalink-admin/` | `setalink.no` (same backend) |

**The blog is a separate case**: authoring happens in `shahnameh-admin`'s "Blog" tab (JWT-protected, a different admin panel from `_setalink-admin`), and `blog.html`/`blog-post.html` on this site fetch published posts client-side from `shahnameh-backend`'s public API at `https://shahnameh.setaei.com/api/blog/posts`. This keeps the blog fully within infrastructure this repo's maintainers control end-to-end, rather than depending on the separate SetaLink deployment.

Nothing on `realgram.no` itself depends on a build step or a deploy pipeline — a saved file is live immediately. The one exception is the blog *data*, which lives in MongoDB on the `shahnameh-backend` box and is fetched at page-load time, not baked into these HTML files.

## Branding

RealGram is the only brand represented in this repo. `Shahnameh` assets are kept in `brand/` because Shahnameh is one of RealGram's own six parts, not a separate product. Older/retired brand names (Realink, SetaLink, TrustAI) that RealGram was consolidated from are deliberately **not** referenced here — see `SEO_STRATEGY.md` if you need that history, it isn't repeated in any public-facing page.

## Security

- `nginx` denies any request for a dotfile or a `.md` file directly (`location ~ /\. { deny all; }`, `location ~ \.(md)$ { deny all; }`) — this README and `SEO_STRATEGY.md` are not publicly fetchable even though they live in the web root.
- The blog's post body is authored exclusively through a JWT-gated admin editor (`shahnameh-backend`'s `/blog-admin/*`) — there is no public write path. `blog-post.html` renders `body_html` directly, which is safe specifically because that trust boundary holds; don't add any endpoint that lets untrusted input reach `body_html`.
- No secrets, API keys, or credentials belong in this repo — it's a static site with no server-side code of its own. If a future change needs a secret (an analytics key, a form endpoint), keep it server-side in `shahnameh-backend`, not here.
- See `SECURITY.md` for how to report a vulnerability.

## Local development

No build step. Serve the directory with anything that speaks static files, e.g.:

```
npx http-server . -p 8080
```

Blog pages will still hit the live `https://shahnameh.setaei.com/api/blog/*` endpoints from local dev — there's no local mock.

## Deploying

There isn't a deploy pipeline — this directory *is* the live web root. Changes are made directly on `5.249.255.116` and are live on save; `git commit`/`git push` here is for history and backup, not for triggering a deploy.
