"""Turn the generated WildParty symbol art into clean, transparent, square sprites.

The generated images are RGB with a baked-in light-gray "transparency" checker
background (no real alpha). This script:
  1. downsizes to a working resolution,
  2. flood-fills the gray checker from the borders -> alpha 0 (keeps interior
     white highlights that are not connected to the border),
  3. trims to the content bounding box, centers on a square transparent canvas,
  4. exports a 256px PNG with alpha.
Pure PIL only (no numpy/scipy) so it runs reliably in the sandbox.
"""
import os
from collections import deque
from PIL import Image

SRC_DIR = os.path.expanduser(
    "~/.cursor/projects/Users-stone-Stake-Engine-math-sdk-games-WildParty/assets"
)
OUT_DIR = os.path.join(
    os.path.dirname(__file__),
    "static/assets/sprites/wildPartySymbols",
)

MAPPING = {
    "sym_h1.png": "h1.png",
    "sym_h2.png": "h2.png",
    "sym_h3.png": "h3.png",
    "sym_h4.png": "h4.png",
    "sym_l1.png": "l1.png",
    "sym_l2.png": "l2.png",
    "sym_l3.png": "l3.png",
    "sym_l4.png": "l4.png",
    "sym_w.png": "w.png",
    "sym_s.png": "s.png",
}

WORK = 512          # working resolution for flood fill
CANVAS = 256        # final sprite size
PADDING = 0.05      # empty margin fraction on the final canvas
GRAY_TOL = 22       # max channel spread to count as gray
LIGHT_MIN = 165     # min brightness to count as checker background


def is_bg(px):
    r, g, b = px[0], px[1], px[2]
    mx, mn = max(r, g, b), min(r, g, b)
    return (mx - mn) <= GRAY_TOL and mn >= LIGHT_MIN


def remove_checker(img):
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    visited = bytearray(w * h)
    q = deque()

    def consider(x, y):
        idx = y * w + x
        if visited[idx]:
            return
        visited[idx] = 1
        if is_bg(px[x, y]):
            q.append((x, y))

    for x in range(w):
        consider(x, 0)
        consider(x, h - 1)
    for y in range(h):
        consider(0, y)
        consider(w - 1, y)

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not visited[idx]:
                    visited[idx] = 1
                    if is_bg(px[nx, ny]):
                        q.append((nx, ny))
    return img


def process(src_path, out_path):
    img = Image.open(src_path).convert("RGB")
    # downscale to working size keeping aspect
    w, h = img.size
    scale = WORK / max(w, h)
    img = img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)

    img = remove_checker(img)

    # trim to content (alpha) bbox
    bbox = img.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if bbox:
        img = img.crop(bbox)

    inner = int(CANVAS * (1 - 2 * PADDING))
    w, h = img.size
    s = inner / max(w, h)
    new_size = (max(1, round(w * s)), max(1, round(h * s)))
    img = img.resize(new_size, Image.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    ox = (CANVAS - new_size[0]) // 2
    oy = (CANVAS - new_size[1]) // 2
    canvas.paste(img, (ox, oy), img)
    canvas.save(out_path)
    return new_size


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for raw, out in MAPPING.items():
        src = os.path.join(SRC_DIR, raw)
        dst = os.path.join(OUT_DIR, out)
        if not os.path.exists(src):
            print(f"MISSING {src}")
            continue
        size = process(src, dst)
        print(f"{raw} -> {out} (content {size[0]}x{size[1]} on {CANVAS}px)")


if __name__ == "__main__":
    main()
