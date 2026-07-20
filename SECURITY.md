# Security Policy

## Scope

This repo is the static `realgram.no` marketing/content site. It has no server-side code of its own and holds no secrets — the surfaces that matter most are:

- The blog rendering path (`blog-post.html` renders `body_html` from the API as-is; it must stay fed only by the JWT-gated admin editor in `shahnameh-backend`, never by public input).
- The download link on the landing page, which must always point at a real, current RealGram build.
- Anything served from `brand/`, `favicon.svg`, etc. — supply-chain integrity of static assets.

## Reporting a vulnerability

If you find a security issue affecting `realgram.no` or the wider RealGram ecosystem (the app, `setalink.no`, `shahnameh-backend`), report it privately rather than opening a public issue. Contact Khabat directly.

Please include:
- What you found and where (URL, request, or file).
- Steps to reproduce.
- What you'd expect to happen instead.

Please don't:
- Test against production in a way that affects other users (mass account creation, load testing, etc.).
- Publicly disclose before there's been a chance to fix it.
