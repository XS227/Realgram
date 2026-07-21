#!/usr/bin/env python3
"""
Generates a simple, on-brand 1200x630 OG/Twitter cover image for a blog
article: dark background matching the site theme, the REAL token mark,
and the article title. No external design tool available on this box,
so this is a plain procedural card -- good enough for a valid social
preview, not a substitute for real design work later.

Usage: python3 make_cover.py "Article Title" output.png
"""
import sys
import textwrap
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (3, 6, 9)  # matches --bg / theme-color #030609
FG = (240, 246, 255)  # matches --text-primary #F0F6FF
ACCENT = (255, 204, 0)  # token gold

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
TOKEN = "/var/www/realgram/brand/realtoken.png"


def make_cover(title, out_path):
    im = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(im)

    # Faint radial-ish vignette approximation: a subtle lighter band across
    # the middle so the card doesn't look like a flat void.
    for y in range(H):
        t = abs(y - H / 2) / (H / 2)
        shade = int(3 + (1 - t) * 6)
        draw.line([(0, y), (W, y)], fill=(shade, shade + 2, shade + 5))

    # Token mark, top-left.
    token = Image.open(TOKEN).convert("RGBA").resize((84, 84), Image.LANCZOS)
    im.paste(token, (72, 64), token)

    # "RealGram" wordmark next to the mark.
    font_word = ImageFont.truetype(FONT_BOLD, 40)
    draw.text((172, 84), "RealGram", font=font_word, fill=FG)

    # Title, wrapped, large and bold, vertically centered in the remaining space.
    font_title = ImageFont.truetype(FONT_BOLD, 64)
    wrapped = textwrap.wrap(title, width=22)
    line_height = 76
    total_h = line_height * len(wrapped)
    y = (H - total_h) / 2 + 40
    for line in wrapped:
        draw.text((72, y), line, font=font_title, fill=FG)
        y += line_height

    # Thin accent rule + footer strap line.
    draw.rectangle([(72, H - 96), (140, H - 92)], fill=ACCENT)
    font_small = ImageFont.truetype(FONT_REG, 24)
    draw.text((72, H - 76), "realgram.no", font=font_small, fill=(122, 155, 192))

    im.save(out_path, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage: make_cover.py \"Title\" output.png", file=sys.stderr)
        sys.exit(1)
    make_cover(sys.argv[1], sys.argv[2])
    print("saved", sys.argv[2])
