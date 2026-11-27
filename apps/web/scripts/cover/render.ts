import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

import sharp from "sharp";

const TONES = ["dark", "light"] as const;

const usage = `Usage: bun run cover <screenshot> --out <file.png> [options]

Options:
  --out <file>       Output PNG path (required)
  --tone <name>      both, dark or light (default: both, which also writes <file>-light.png)
  --cell <px>        Size of one dither pixel (default: 3)
  --seed <n>         Changes where the background shapes fall (default: 1)
  --width <px>       Output width in pixels (default: keeps the screenshot at its native size)
  --padding <px>     Space around the screenshot (default: 4.5% of the width)
  --radius <px>      Corner radius of the screenshot (default: 12)
  --blend            Recolor the image onto the site colors for each tone, keeping saturated colors
  --browser <path>   Chrome, Edge or Chromium executable (default: auto-detect, or CHROME_PATH)`;

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  allowPositionals: true,
  options: {
    out: { type: "string" },
    tone: { type: "string", default: "both" },
    cell: { type: "string" },
    seed: { type: "string", default: "1" },
    width: { type: "string" },
    padding: { type: "string" },
    radius: { type: "string", default: "12" },
    blend: { type: "boolean", default: false },
    browser: { type: "string" },
    help: { type: "boolean", short: "h" },
  },
});

function fail(message: string): never {
  console.error(`${message}\n\n${usage}`);
  process.exit(1);
}

if (values.help) {
  console.log(usage);
  process.exit(0);
}

const [input] = positionals;
if (!input) fail("Missing the screenshot path.");
if (!values.out) fail("Missing --out.");
if (!existsSync(input)) fail(`Screenshot not found: ${input}`);

const tone = values.tone as (typeof TONES)[number] | "both";
if (tone !== "both" && !TONES.includes(tone)) fail(`Unknown tone "${values.tone}".`);

const cell = values.cell === undefined ? 3 : Math.round(Number(values.cell));
const seed = Math.round(Number(values.seed));
if (!Number.isFinite(cell) || cell < 1) fail("--cell must be a whole number of at least 1.");
if (!Number.isFinite(seed)) fail("--seed must be a number.");

function findBrowser(): string | undefined {
  const candidates = [
    values.browser,
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    Bun.which("google-chrome"),
    Bun.which("chromium"),
    Bun.which("chromium-browser"),
    Bun.which("microsoft-edge"),
  ];
  return candidates.find((path): path is string => !!path && existsSync(path));
}

const browser = findBrowser();
if (!browser) fail("No Chrome, Edge or Chromium found. Pass --browser or set CHROME_PATH.");

const screenshot = resolve(input);
const { width: imageWidth, height: imageHeight } = await sharp(screenshot).metadata();
if (!imageWidth || !imageHeight) fail(`Could not read the size of ${input}.`);

const width =
  values.width === undefined ? Math.round(imageWidth / 0.91) : Math.round(Number(values.width));
const padding =
  values.padding === undefined ? Math.round(width * 0.045) : Math.round(Number(values.padding));
const radius = Number(values.radius);
if (![width, padding, radius].every((n) => Number.isFinite(n) && n >= 0) || width <= padding * 2) {
  fail(
    "--width, --padding and --radius must be non-negative, and the width must exceed twice the padding.",
  );
}

const contentWidth = width - padding * 2;
const contentHeight = Math.round((contentWidth * imageHeight) / imageWidth);
const height = contentHeight + padding * 2;

const template = await readFile(join(import.meta.dir, "template.html"), "utf8");
const out = resolve(values.out);
const tones = tone === "both" ? TONES : [tone];
const workDir = await mkdtemp(join(tmpdir(), "cover-"));

function outputPath(current: (typeof TONES)[number]): string {
  if (tone !== "both" || current === "dark") return out;
  return out.replace(/(\.png)?$/i, "-light.png");
}

const PAGE_COLORS = {
  dark: { background: [15, 15, 15], ink: [245, 243, 238] },
  light: { background: [250, 249, 246], ink: [28, 27, 25] },
};

const COLOR_STRENGTH = { dark: 1, light: 0.62 };

async function source(current: (typeof TONES)[number]): Promise<string> {
  if (!values.blend) return screenshot;
  const { background, ink } = PAGE_COLORS[current];
  const strength = COLOR_STRENGTH[current];
  const target = join(workDir, `source-${current}.png`);
  const { data, info } = await sharp(screenshot)
    .removeAlpha()
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const count = info.width * info.height;
  const stride = info.channels;
  const gray = new Uint8Array(count);
  const histogram = Array.from({ length: 128 }, () => 0);
  for (let index = 0; index < count; index++) {
    const [r, g, b] = [data[index * stride], data[index * stride + 1], data[index * stride + 2]];
    gray[index] = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    if (gray[index] < 128) histogram[gray[index]]++;
  }
  const black = histogram.indexOf(Math.max(...histogram)) + 6;
  const pixels = Buffer.alloc(count * 3);
  for (let index = 0; index < count; index++) {
    const rgb = [data[index * stride], data[index * stride + 1], data[index * stride + 2]];
    const brightest = Math.max(...rgb);
    const saturation = brightest === 0 ? 0 : (brightest - Math.min(...rgb)) / brightest;
    const color = Math.min(1, Math.max(0, (saturation - 0.25) / 0.25));
    const grayLevel = Math.max(0, (gray[index] - black) / (255 - black));
    const colorLevel = Math.max(0, (brightest - black) / (255 - black));
    const level = grayLevel + (colorLevel - grayLevel) * color;
    for (let channel = 0; channel < 3; channel++) {
      const hue = brightest === 0 ? 0 : (rgb[channel] / brightest) * 255 * strength;
      const tint = ink[channel] + (hue - ink[channel]) * color;
      pixels[index * 3 + channel] = Math.round(
        background[channel] + (tint - background[channel]) * level,
      );
    }
  }
  await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 3 } })
    .png()
    .toFile(target);
  return target;
}

async function render(current: (typeof TONES)[number]): Promise<void> {
  const image = await source(current);
  const html = Object.entries({
    WIDTH: width,
    HEIGHT: height,
    PADDING: padding,
    RADIUS: radius,
    CONTENT_WIDTH: contentWidth,
    CONTENT_HEIGHT: contentHeight,
    TONE: current,
    CELL: cell,
    SEED: seed,
    IMAGE: pathToFileURL(image).href,
  }).reduce((page, [key, value]) => page.replaceAll(`{{${key}}}`, String(value)), template);

  const page = join(workDir, `cover-${current}.html`);
  const raw = join(workDir, `cover-${current}.png`);
  await writeFile(page, html);

  const run = Bun.spawn(
    [
      browser,
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--allow-file-access-from-files",
      `--user-data-dir=${join(workDir, "profile")}`,
      `--window-size=${width},${height}`,
      "--force-device-scale-factor=1",
      "--virtual-time-budget=3000",
      `--screenshot=${raw}`,
      pathToFileURL(page).href,
    ],
    { stdout: "ignore", stderr: "pipe" },
  );
  await run.exited;

  if (!existsSync(raw)) {
    fail(`The browser did not produce a screenshot.
${await new Response(run.stderr).text()}`);
  }

  const target = outputPath(current);
  await mkdir(dirname(target), { recursive: true });
  await sharp(raw)
    .extract({ left: 0, top: 0, width, height })
    .png({ palette: true, quality: 90, effort: 10 })
    .toFile(target);

  console.log(`Wrote ${target} (${width}x${height}, ${current}, seed ${seed})`);
}

try {
  for (const current of tones) await render(current);
} finally {
  await rm(workDir, { recursive: true, force: true });
}
