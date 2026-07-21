#!/usr/bin/env node
/**
 * Generates static, server-rendered blog pages + sitemap.xml from the live
 * blog API (shahnameh-backend), so Google indexes real content/URLs without
 * executing any client JS. Idempotent -- safe to re-run any time; run via
 * cron so new posts get a page + sitemap entry automatically.
 *
 * Writes:
 *   /var/www/realgram/blog/<slug>/index.html  (one per published post)
 *   /var/www/realgram/blog.html               (grid between BLOG_POSTS markers)
 *   /var/www/realgram/sitemap.xml             (home/faq/blog + every post)
 */
'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_ROOT = '/var/www/realgram';
const SITE_URL = 'https://realgram.no';
const API_BASE = 'https://shahnameh.setaei.com/api/blog';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('bad JSON from ' + url + ': ' + e.message)); }
      });
    }).on('error', reject).on('timeout', function () { this.destroy(new Error('timeout: ' + url)); });
  });
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function fmtDateLong(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function fmtDateShort(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function isoDate(iso) {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 10);
}

function postTemplate(p) {
  const url = SITE_URL + '/blog/' + encodeURIComponent(p.slug) + '/';
  const title = esc(p.title) + ' — RealGram';
  const desc = esc(p.excerpt || '');
  const hasImage = !!p.cover_image;
  const cardType = hasImage ? 'summary_large_image' : 'summary';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt || undefined,
    datePublished: p.published_at || undefined,
    url,
    image: p.cover_image || undefined,
    author: { '@type': 'Organization', name: 'RealGram' },
    publisher: { '@type': 'Organization', name: 'RealGram' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const jsonLdStr = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return '<!DOCTYPE html>\n'
    + '<html lang="en">\n'
    + '<head>\n'
    + '<!-- Google tag (gtag.js) -->\n'
    + '<script async src="https://www.googletagmanager.com/gtag/js?id=G-C6DPYN2MQZ"></script>\n'
    + '<script>\n'
    + '  window.dataLayer = window.dataLayer || [];\n'
    + '  function gtag(){dataLayer.push(arguments);}\n'
    + "  gtag('js', new Date());\n"
    + "  gtag('config', 'G-C6DPYN2MQZ');\n"
    + '</script>\n'
    + '<meta charset="UTF-8" />\n'
    + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n'
    + '<title>' + title + '</title>\n'
    + '<meta name="description" content="' + desc + '" />\n'
    + '<meta name="theme-color" content="#030609" />\n'
    + '<link rel="canonical" href="' + url + '" />\n'
    + '<link rel="icon" type="image/png" href="/favicon.png" />\n'
    + '\n'
    + '<meta property="og:type" content="article" />\n'
    + '<meta property="og:title" content="' + title + '" />\n'
    + '<meta property="og:description" content="' + desc + '" />\n'
    + '<meta property="og:url" content="' + url + '" />\n'
    + '<meta property="og:site_name" content="RealGram" />\n'
    + (p.published_at ? '<meta property="article:published_time" content="' + esc(p.published_at) + '" />\n' : '')
    + (hasImage ? '<meta property="og:image" content="' + esc(p.cover_image) + '" />\n' : '')
    + '\n'
    + '<meta name="twitter:card" content="' + cardType + '" />\n'
    + '<meta name="twitter:title" content="' + title + '" />\n'
    + '<meta name="twitter:description" content="' + desc + '" />\n'
    + (hasImage ? '<meta name="twitter:image" content="' + esc(p.cover_image) + '" />\n' : '')
    + '\n'
    + '<script type="application/ld+json">' + jsonLdStr + '</script>\n'
    + '\n'
    + '<link rel="preconnect" href="https://fonts.googleapis.com" />\n'
    + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n'
    + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />\n'
    + '<link rel="stylesheet" href="/style.css" />\n'
    + '<style>\n'
    + '  .post-wrap { max-width:720px; }\n'
    + '  .post-date { font-size:.78rem; letter-spacing:.04em; text-transform:uppercase; color:#7A9BC0; }\n'
    + '  .post-cover { width:100%; border-radius:14px; margin:20px 0; display:block; }\n'
    + '  .post-body { font-size:1rem; line-height:1.75; color:#DDE6F0; }\n'
    + '  .post-body h2 { margin-top:2em; }\n'
    + '  .post-body a { color:#C77DFF; }\n'
    + '  .post-body p { margin:1em 0; }\n'
    + '  .post-back { display:inline-block; margin-bottom:20px; color:#7A9BC0; text-decoration:none; font-size:.85rem; }\n'
    + '  .post-back:hover { color:#C77DFF; }\n'
    + '</style>\n'
    + '</head>\n'
    + '<body>\n'
    + '<a class="skip-link" href="#main-content">Skip to main content</a>\n'
    + '<div class="bg-field" aria-hidden="true"></div>\n'
    + '<canvas id="cinematicDust" class="cinematic-dust" aria-hidden="true"></canvas>\n'
    + '\n'
    + '<header class="site-header">\n'
    + '  <div class="wrap header-inner">\n'
    + '    <a class="brand" href="/" aria-label="RealGram home">\n'
    + '      <img class="brand-mark" src="/brand/realtoken.png" width="44" height="44" alt="" aria-hidden="true">\n'
    + '      <span class="brand-word">Real<b>Gram</b></span>\n'
    + '    </a>\n'
    + '    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">\n'
    + '      <span></span><span></span><span></span>\n'
    + '      <span class="sr-only">Menu</span>\n'
    + '    </button>\n'
    + '    <nav id="site-nav" class="site-nav" aria-label="Main">\n'
    + '      <a href="/#journey">How it works</a>\n'
    + '      <a href="/#ecosystem">Ecosystem</a>\n'
    + '      <a href="/#platforms">Where to play</a>\n'
    + '      <a href="/faq.html">FAQ</a>\n'
    + '      <a href="/blog.html">Blog</a>\n'
    + '      <a href="/#get" class="btn btn-small">Get RealGram</a>\n'
    + '    </nav>\n'
    + '  </div>\n'
    + '</header>\n'
    + '\n'
    + '<main id="main-content">\n'
    + '  <section class="wrap post-wrap" style="padding-top:48px">\n'
    + '    <a class="post-back" href="/blog.html">← Back to Blog</a>\n'
    + '    <span class="post-date">' + esc(fmtDateLong(p.published_at)) + '</span>\n'
    + '    <h1 style="margin:.4em 0 0">' + esc(p.title) + '</h1>\n'
    + (hasImage ? '    <img class="post-cover" src="' + esc(p.cover_image) + '" alt="' + esc(p.title) + '">\n' : '')
    + '    <div class="post-body">' + (p.body_html || '') + '</div>\n'
    + '  </section>\n'
    + '\n'
    + '  <section class="cta-band wrap">\n'
    + '    <h2>Want RealGram itself?</h2>\n'
    + '    <p>One app, one identity, one economy.</p>\n'
    + '    <div class="hero-actions center">\n'
    + '      <a href="/#get" class="btn btn-primary">Get RealGram</a>\n'
    + '    </div>\n'
    + '  </section>\n'
    + '</main>\n'
    + '\n'
    + '<footer class="site-footer">\n'
    + '  <div class="wrap footer-grid">\n'
    + '    <div class="footer-col">\n'
    + '      <span class="footer-brand"><img class="footer-brand-mark" src="/brand/realtoken.png" alt="" loading="lazy" /> RealGram</span>\n'
    + '      <p class="footer-tagline">One account. One identity. One app.</p>\n'
    + '    </div>\n'
    + '    <div class="footer-col">\n'
    + '      <p class="footer-col-title">Product</p>\n'
    + '      <a href="/#journey">How it works</a>\n'
    + '      <a href="/#ecosystem">Ecosystem</a>\n'
    + '      <a href="/#platforms">Where to play</a>\n'
    + '    </div>\n'
    + '    <div class="footer-col">\n'
    + '      <p class="footer-col-title">Resources</p>\n'
    + '      <a href="/faq.html">FAQ</a>\n'
    + '      <a href="/blog.html">Blog</a>\n'
    + '    </div>\n'
    + '    <div class="footer-col">\n'
    + '      <p class="footer-col-title">Company</p>\n'
    + '      <p class="footer-fine">RealGram is an independent product and is not\n'
    + '        affiliated with, endorsed by, or an official client of any messaging\n'
    + '        platform it may interoperate with.</p>\n'
    + '    </div>\n'
    + '  </div>\n'
    + '  <div class="wrap footer-bottom">\n'
    + '    <p class="footer-parts">Freedom · Shahnameh · REAL Wallet · Messages · Clan · Hakim AI</p>\n'
    + '    <p class="footer-copy">© 2026 SETAEI (<a href="https://www.setai.no">setai.no</a>). Part of the REAL ecosystem.</p>\n'
    + '  </div>\n'
    + '</footer>\n'
    + '\n'
    + '<script src="/app.js"></script>\n'
    + '</body>\n'
    + '</html>\n';
}

function renderCard(p) {
  const url = '/blog/' + encodeURIComponent(p.slug) + '/';
  const date = fmtDateShort(p.published_at);
  const img = p.cover_image ? '<img src="' + esc(p.cover_image) + '" alt="" loading="lazy">' : '';
  return '<a class="blog-card" href="' + url + '">'
    + img
    + '<div class="blog-card-body">'
    + '<span class="blog-card-date">' + esc(date) + '</span>'
    + '<h3>' + esc(p.title) + '</h3>'
    + '<p>' + esc(p.excerpt || '') + '</p>'
    + '</div></a>';
}

function buildSitemap(posts) {
  const urls = [
    { loc: SITE_URL + '/', changefreq: 'weekly', priority: '1.0' },
    { loc: SITE_URL + '/fa/', changefreq: 'weekly', priority: '1.0' },
    { loc: SITE_URL + '/faq.html', changefreq: 'monthly', priority: '0.6' },
    { loc: SITE_URL + '/fa/faq.html', changefreq: 'monthly', priority: '0.6' },
    { loc: SITE_URL + '/blog.html', changefreq: 'weekly', priority: '0.7' },
    { loc: SITE_URL + '/fa/blog.html', changefreq: 'weekly', priority: '0.7' },
  ].concat(posts.map((p) => ({
    loc: SITE_URL + '/blog/' + encodeURIComponent(p.slug) + '/',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: isoDate(p.published_at),
  })));

  const body = urls.map((u) => (
    '  <url>\n'
    + '    <loc>' + u.loc + '</loc>\n'
    + (u.lastmod ? '    <lastmod>' + u.lastmod + '</lastmod>\n' : '')
    + '    <changefreq>' + u.changefreq + '</changefreq>\n'
    + '    <priority>' + u.priority + '</priority>\n'
    + '  </url>'
  )).join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + body + '\n'
    + '</urlset>\n';
}

async function main() {
  const listResp = await get(API_BASE + '/posts');
  const listedPosts = (listResp && listResp.status && listResp.posts) || [];

  const fullPosts = [];
  for (const p of listedPosts) {
    try {
      const detail = await get(API_BASE + '/posts/' + encodeURIComponent(p.slug));
      fullPosts.push((detail && detail.status && detail.post) ? detail.post : p);
    } catch (e) {
      console.error('generate-blog: failed to fetch detail for ' + p.slug + ', using list data:', e.message);
      fullPosts.push(p);
    }
  }

  // Write one static page per post; remove stale directories for posts that
  // no longer exist so old/deleted posts don't stay indexable forever.
  const blogDir = path.join(SITE_ROOT, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });
  const currentSlugs = new Set(fullPosts.map((p) => p.slug));
  for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !currentSlugs.has(entry.name)) {
      fs.rmSync(path.join(blogDir, entry.name), { recursive: true, force: true });
    }
  }
  for (const p of fullPosts) {
    const dir = path.join(blogDir, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), postTemplate(p));
  }

  // Regenerate the blog.html listing grid between its markers.
  const blogHtmlPath = path.join(SITE_ROOT, 'blog.html');
  let blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');
  const cardsHtml = fullPosts.length
    ? fullPosts.map(renderCard).join('\n      ')
    : '<p style="text-align:center;color:#7A9BC0;padding:40px 0;grid-column:1/-1">No posts yet — check back soon.</p>';
  const marker = /(<!-- BLOG_POSTS_START[\s\S]*?-->\s*<div class="blog-grid" id="blog-grid">)([\s\S]*?)(<\/div>\s*<!-- BLOG_POSTS_END -->)/;
  if (marker.test(blogHtml)) {
    blogHtml = blogHtml.replace(marker, (_m, pre, _mid, post) => pre + '\n      ' + cardsHtml + '\n    ' + post);
    fs.writeFileSync(blogHtmlPath, blogHtml);
  } else {
    console.error('generate-blog: BLOG_POSTS markers not found in blog.html -- grid NOT updated');
  }

  // Same cards (English titles/links -- posts aren't translated yet) into
  // the Persian blog shell, so it doesn't go stale as new posts publish.
  const blogHtmlFaPath = path.join(SITE_ROOT, 'fa', 'blog.html');
  if (fs.existsSync(blogHtmlFaPath)) {
    let blogHtmlFa = fs.readFileSync(blogHtmlFaPath, 'utf8');
    const cardsHtmlFa = fullPosts.length
      ? fullPosts.map(renderCard).join('\n      ')
      : '<p style="text-align:center;color:#7A9BC0;padding:40px 0;grid-column:1/-1">به‌زودی مقاله‌ای منتشر می‌شود.</p>';
    const markerFa = /(<!-- BLOG_POSTS_START_FA[\s\S]*?-->\s*<div class="blog-grid" id="blog-grid">)([\s\S]*?)(<\/div>\s*<!-- BLOG_POSTS_END_FA -->)/;
    if (markerFa.test(blogHtmlFa)) {
      blogHtmlFa = blogHtmlFa.replace(markerFa, (_m, pre, _mid, post) => pre + '\n      ' + cardsHtmlFa + '\n    ' + post);
      fs.writeFileSync(blogHtmlFaPath, blogHtmlFa);
    } else {
      console.error('generate-blog: BLOG_POSTS_FA markers not found in fa/blog.html -- grid NOT updated');
    }
  }

  // Regenerate sitemap.xml.
  fs.writeFileSync(path.join(SITE_ROOT, 'sitemap.xml'), buildSitemap(fullPosts));

  console.log('generate-blog: ' + fullPosts.length + ' post(s) -> blog/<slug>/, blog.html, sitemap.xml updated');
}

main().catch((err) => {
  console.error('generate-blog FAILED:', err);
  process.exitCode = 1;
});
