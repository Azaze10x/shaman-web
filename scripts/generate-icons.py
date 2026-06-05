#!/usr/bin/env python3
"""Generate a pixel-art favicon and apple-touch-icon for Shaman Tech.

Outputs:
- app/favicon.ico (multi-res: 16x16, 32x32, 48x48)
- app/apple-icon.png (180x180)
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_FAVICO = ROOT / "app" / "favicon.ico"
OUT_APPLE = ROOT / "app" / "apple-icon.png"

# Brand palette
BG = "#1c1b1b"
FG = "#fcf8f8"
SHADOW = "#ba0029"
ACCENT = "#5dff9f"


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


# Pixel "S" drawn on a 7-wide x 7-high grid.
S_SHAPE = [
    (1, 0), (2, 0), (3, 0),
    (0, 1), (4, 1),
    (0, 2),
    (1, 3), (2, 3), (3, 3),
    (4, 4),
    (0, 5), (4, 5),
    (1, 6), (2, 6), (3, 6),
]
SHAPE_W = 5
SHAPE_H = 7


def render(grid_w: int, grid_h: int, px: int) -> Image.Image:
    """Render the icon onto a grid and scale each block by px."""
    img_w = grid_w * px
    img_h = grid_h * px
    img = Image.new("RGBA", (img_w, img_h), hex_to_rgb(BG) + (255,))
    pixels = img.load()
    if pixels is None:
        raise RuntimeError("Could not load pixel buffer")

    c_fg = hex_to_rgb(FG) + (255,)
    c_shadow = hex_to_rgb(SHADOW) + (255,)
    c_accent = hex_to_rgb(ACCENT) + (255,)
    c_bg = hex_to_rgb(BG) + (255,)

    def block(bx: int, by: int, color: tuple[int, int, int, int]) -> None:
        for dy in range(px):
            for dx in range(px):
                x = bx * px + dx
                y = by * px + dy
                if 0 <= x < img_w and 0 <= y < img_h:
                    pixels[x, y] = color

    # Background
    for by in range(grid_h):
        for bx in range(grid_w):
            block(bx, by, c_bg)

    # 1-block rounded frame
    for x in range(1, grid_w - 1):
        block(x, 1, c_shadow)
        block(x, grid_h - 2, c_shadow)
    for y in range(2, grid_h - 2):
        block(1, y, c_shadow)
        block(grid_w - 2, y, c_shadow)

    # Center the S shape
    off_x = (grid_w - SHAPE_W) // 2
    off_y = (grid_h - SHAPE_H) // 2

    # Drop shadow (1 block down-right)
    for dx, dy in S_SHAPE:
        block(off_x + dx + 1, off_y + dy + 1, c_shadow)
    # Main shape
    for dx, dy in S_SHAPE:
        block(off_x + dx, off_y + dy, c_fg)

    # Accent pixel at lower-right inside the frame
    block(grid_w - 3, grid_h - 3, c_accent)

    return img


def main() -> None:
    # Favicon frames: draw on a 16x16 grid at 1x, 2x, 3x block scales
    img16 = render(grid_w=16, grid_h=16, px=1)
    img32 = render(grid_w=16, grid_h=16, px=2)
    img48 = render(grid_w=16, grid_h=16, px=3)

    # Apple touch icon: 36x36 grid with 5px blocks = 180x180
    apple = render(grid_w=36, grid_h=36, px=5)

    OUT_FAVICO.parent.mkdir(parents=True, exist_ok=True)
    img32.save(OUT_FAVICO, format="ICO", append_images=[img16, img48])
    apple.save(OUT_APPLE, format="PNG", optimize=True)

    print(f"Saved {OUT_FAVICO}")
    print(f"Saved {OUT_APPLE} ({apple.width}x{apple.height})")


if __name__ == "__main__":
    main()
