# /// script
# requires-python = ">=3.11"
# dependencies = ["fonttools[woff]>=4.56", "brotli>=1.1"]
# ///
"""Generate the web font subsets the site ships.

Run by hand, never from the build:

    uv run scripts/subset-fonts.py

Reads the upstream fonts in fonts/upstream/, writes woff2 subsets and the
@font-face stylesheet into apps/web/src/lib/assets/fonts/. Both are committed,
so a normal build and deploy needs nothing from this script.

Rerun it when any of these change:
  - the upstream font files in fonts/upstream/
  - CORE or EXTENDED below (for example, content starts using a character that
    is in neither range, or a new page needs a character in core)
  - the weights or axis values the site uses (AXIS_LIMITS)
  - the OpenType features the CSS turns on (KEEP_FEATURES)

Then rebuild and check the pages with code blocks, italics and accents.
"""

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

# Characters every page needs: printable ASCII plus the punctuation that shows up
# across the site (c/o the footer and markdown smart quotes) and the dashes and
# ellipsis markdown can produce. This file is preloaded, so keep it tight.
CORE = (
    list(range(0x0020, 0x007F))
    + [
        0x00A0,  # no-break space
        0x00A9,  # (c) in the footer, on every page
        0x00B7,  # middle dot, used as a separator in lists and the footer
        0x2013,  # en dash
        0x2014,  # em dash, markdown turns --- into this
        0x2018,
        0x2019,  # single curly quotes, markdown turns ' into these
        0x201C,
        0x201D,  # double curly quotes, markdown turns " into these
        0x2026,  # ellipsis, markdown turns ... into this
    ]
)

# Everything else we keep coverage for: the rest of Latin-1 Supplement and all of
# Latin Extended-A, so accented names and loanwords render in the real font
# rather than a fallback. Loaded only when a page actually contains one.
EXTENDED = [cp for cp in range(0x00A1, 0x0100) if cp not in CORE] + list(
    range(0x0100, 0x0180)
)

# OpenType features browsers apply without any CSS asking for them. Everything
# else is dropped: nothing in the site's CSS sets font-feature-settings or
# font-variant, so an off-by-default feature can never fire.
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
    """One @font-face family split into a preloaded core and a lazy extended file."""

    source: str
    stem: str
    family: str
    weight: str
    style: str
    # (min, default, max) per axis, or a single float to pin the axis.
    axis_limits: dict[str, object] = field(default_factory=dict)
    # TrueType hinting is dropped only where it provably changes nothing.
    keep_hinting: bool = False


FACES = [
    # JetBrains Mono carries all body text, code and the SVG diagram labels.
    # wght stays a range because the site uses 400, 500, 600 and 700.
    Face(
        source="JetBrainsMono[wght].ttf",
        stem="jetbrains-mono",
        family="JetBrains Mono Variable",
        weight="400 700",
        style="normal",
        axis_limits={"wght": (400, 400, 700)},
    ),
    # Instrument Serif is only ever used italic (every font-display class in the
    # app pairs it with italic), so the upright face is not shipped at all.
    # keep_hinting=True: unlike JetBrains Mono, this face has real TrueType
    # instructions (143+ hinted glyphs). Dropping them measurably changes
    # anti-aliasing on glyph edges (pixel-diff showed deltas up to 235/255 on
    # heading text), so they stay to keep rendering pixel-identical.
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
    """Write one woff2 subset and return the codepoints it actually ended up with."""
    font = TTFont(UPSTREAM / face.source)

    if face.axis_limits:
        font = instantiateVariableFont(
            font,
            face.axis_limits,
            inplace=True,
            updateFontNames=False,
            optimize=True,
        )
        # Narrowing the axis leaves some glyphs with no deltas at all, and the
        # instancer drops their gvar entries. The subsetter then looks every
        # retained glyph up in gvar and raises KeyError on the gaps, so put the
        # empty entries back; they cost nothing and get dropped with the glyphs.
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
    # Keep the name records that carry attribution and the OFL, drop the rest.
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.name_legacy = False
    options.name_languages = ["0x0409"]
    options.drop_tables = list(options.drop_tables) + ["DSIG"]
    if not face.keep_hinting:
        # Subsetter strips fpgm/prep/cvt and the per-glyph programs, but leaves
        # gasp, which is the other half of the hinting story on Windows.
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
    """Collapse codepoints into the shortest correct unicode-range list."""
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

    blocks = [
        "/* Generated by scripts/subset-fonts.py. Do not edit by hand. */",
        "/* Rerun that script after changing the font sources or the character sets. */",
    ]
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
                        f"/* {face.family} {face.style} {part} */",
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
