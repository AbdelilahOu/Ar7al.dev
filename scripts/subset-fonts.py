# /// script
# requires-python = ">=3.11"
# dependencies = ["fonttools[woff]>=4.56", "brotli>=1.1"]
# ///

from __future__ import annotations

import sys
from dataclasses import dataclass, field
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
UPSTREAM = ROOT / "fonts" / "upstream"
OUT_DIR = ROOT / "apps" / "web" / "src" / "lib" / "assets" / "fonts"
CSS_OUT = OUT_DIR / "fonts.css"

CORE = list(range(0x0020, 0x007F)) + [
    0x00A0,
    0x00A9,
    0x00B7,
    0x2013,
    0x2014,
    0x2018,
    0x2019,
    0x201C,
    0x201D,
    0x2026,
]

EXTENDED = [cp for cp in range(0x00A1, 0x0100) if cp not in CORE] + list(
    range(0x0100, 0x0180)
)

KEEP_FEATURES = [
    "calt",
    "ccmp",
    "clig",
    "curs",
    "kern",
    "liga",
    "locl",
    "mark",
    "mkmk",
    "rclt",
    "rlig",
    "rvrn",
]


@dataclass
class Face:
    source: str
    stem: str
    family: str
    weight: str
    style: str
    axis_limits: dict[str, object] = field(default_factory=dict)
    keep_hinting: bool = False


FACES = [
    Face(
        source="JetBrainsMono[wght].ttf",
        stem="jetbrains-mono",
        family="JetBrains Mono Variable",
        weight="400 700",
        style="normal",
        axis_limits={"wght": (400, 400, 700)},
    ),
    Face(
        source="InstrumentSerif-Italic.ttf",
        stem="instrument-serif-italic",
        family="Instrument Serif",
        weight="400",
        style="italic",
        keep_hinting=True,
    ),
]


def subset_font(face: Face, codepoints: list[int], out: Path) -> set[int]:
    font = TTFont(UPSTREAM / face.source)

    if face.axis_limits:
        font = instantiateVariableFont(
            font,
            face.axis_limits,
            inplace=True,
            updateFontNames=False,
            optimize=True,
        )
        if "gvar" in font:
            variations = dict(font["gvar"].variations)
            font["gvar"].variations = {
                name: variations.get(name, []) for name in font.getGlyphOrder()
            }

    options = subset.Options()
    options.layout_features = list(KEEP_FEATURES)
    options.hinting = face.keep_hinting
    options.desubroutinize = False
    options.glyph_names = False
    options.legacy_kern = False
    options.legacy_cmap = False
    options.symbol_cmap = False
    options.notdef_outline = False
    options.recalc_bounds = True
    options.recalc_timestamp = False
    options.prune_unicode_ranges = True
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.name_legacy = False
    options.name_languages = ["0x0409"]
    options.drop_tables = list(options.drop_tables) + ["DSIG"]
    if not face.keep_hinting:
        options.drop_tables.append("gasp")

    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)

    font.flavor = "woff2"
    out.parent.mkdir(parents=True, exist_ok=True)
    font.save(out)

    kept = set(TTFont(out).getBestCmap())
    font.close()
    return kept


def to_unicode_range(codepoints: set[int]) -> str:
    parts = []
    for cp in sorted(codepoints):
        if parts and cp == parts[-1][1] + 1:
            parts[-1][1] = cp
        else:
            parts.append([cp, cp])
    out = []
    for lo, hi in parts:
        out.append(f"U+{lo:04X}" if lo == hi else f"U+{lo:04X}-{hi:04X}")
    return ",".join(out)


def main() -> int:
    if not UPSTREAM.is_dir():
        print(f"missing upstream fonts: {UPSTREAM}", file=sys.stderr)
        return 1

    blocks = []
    report = []

    for face in FACES:
        for part, codepoints in (("core", CORE), ("ext", EXTENDED)):
            name = f"{face.stem}-{part}.woff2"
            out = OUT_DIR / name
            kept = subset_font(face, codepoints, out)
            if not kept:
                print(f"{name}: no glyphs, skipping", file=sys.stderr)
                out.unlink(missing_ok=True)
                continue

            requested = set(codepoints)
            if missing := requested - kept:
                print(
                    f"  note: {name} lacks "
                    + " ".join(f"U+{cp:04X}" for cp in sorted(missing)),
                    file=sys.stderr,
                )

            blocks.append(
                "\n".join(
                    [
                        "@font-face {",
                        f"  font-family: '{face.family}';",
                        f"  font-style: {face.style};",
                        "  font-display: swap;",
                        f"  font-weight: {face.weight};",
                        f"  src: url('./{name}') format('woff2');",
                        f"  unicode-range: {to_unicode_range(kept)};",
                        "}",
                    ]
                )
            )
            report.append((name, out.stat().st_size, len(kept)))

    CSS_OUT.write_text("\n\n".join(blocks) + "\n", encoding="utf-8")

    width = max(len(n) for n, _, _ in report)
    print(f"\nwrote {CSS_OUT.relative_to(ROOT)}")
    for name, size, count in report:
        print(f"  {name.ljust(width)}  {size:>6} B  {count:>3} codepoints")
    print(f"  {'total'.ljust(width)}  {sum(s for _, s, _ in report):>6} B")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
