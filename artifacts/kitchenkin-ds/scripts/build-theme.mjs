/**
 * Generates browser-specific assets from @sverg84/kkds-common/tokens.json.
 *
 * Outputs:
 *   src/index.css
 *   public/favicon.svg
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const tokensPath = require.resolve("@sverg84/kkds-common/tokens.json");
const templatePath = join(here, "theme-template.css");
const cssOutputPath = join(root, "src", "index.css");
const logoPath = join(root, "public", "logo.svg");
const faviconOutputPath = join(root, "public", "favicon.svg");

function resolveValue(node, tokens) {
  const value = node?.$value;

  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    const path = value.slice(1, -1).split(".");
    let current = tokens;

    for (const key of path) {
      current = current?.[key];
    }

    return resolveValue(current, tokens);
  }

  return value;
}

function colorEntries(scope, tokens) {
  return Object.fromEntries(
    Object.entries(tokens.color[scope])
      .filter(([name]) => !name.startsWith("$"))
      .map(([name, node]) => [name, resolveValue(node, tokens)]),
  );
}

function hexToHslChannels(hex) {
  let normalized = hex.replace("#", "").trim();

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((character) => character + character)
      .join("");
  }

  const red = parseInt(normalized.slice(0, 2), 16) / 255;
  const green = parseInt(normalized.slice(2, 4), 16) / 255;
  const blue = parseInt(normalized.slice(4, 6), 16) / 255;

  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const lightness = (maximum + minimum) / 2;

  let saturation = 0;
  let hue = 0;

  if (maximum !== minimum) {
    const delta = maximum - minimum;

    saturation =
      lightness > 0.5
        ? delta / (2 - maximum - minimum)
        : delta / (maximum + minimum);

    switch (maximum) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
    }

    hue /= 6;
  }

  const h = Math.round(hue * 360);
  const s = Math.round(saturation * 1000) / 10;
  const l = Math.round(lightness * 1000) / 10;

  return `${h} ${s}% ${l}%`;
}

function toFontStack(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function buildCss(tokens) {
  let css = readFileSync(templatePath, "utf8");
  const replacements = {};

  for (const scope of ["light", "dark"]) {
    for (const [name, hex] of Object.entries(colorEntries(scope, tokens))) {
      const placeholder = `__DS_${scope.toUpperCase()}_${name.toUpperCase()}__`;
      replacements[placeholder] = hexToHslChannels(hex);
    }
  }

  replacements.__DS_FONT_SANS__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.sans, tokens),
  );
  replacements.__DS_FONT_SERIF__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.serif, tokens),
  );
  replacements.__DS_FONT_MONO__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.mono, tokens),
  );
  replacements.__DS_RADIUS__ = resolveValue(tokens.radius.base, tokens);
  replacements.__DS_SPACING__ = resolveValue(tokens.spacing.base, tokens);

  for (const [placeholder, value] of Object.entries(replacements)) {
    css = css.split(placeholder).join(value);
  }

  const unresolved = css.match(/__DS_[A-Z0-9_]+__/g);

  if (unresolved) {
    throw new Error(
      `Missing token values for: ${[...new Set(unresolved)].join(", ")}`,
    );
  }

  return css;
}

export function buildTheme() {
  const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));

  mkdirSync(dirname(cssOutputPath), { recursive: true });
  writeFileSync(cssOutputPath, buildCss(tokens));

  mkdirSync(dirname(faviconOutputPath), { recursive: true });
  writeFileSync(faviconOutputPath, readFileSync(logoPath, "utf8"));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildTheme();
  process.stdout.write("Generated src/index.css and public/favicon.svg\n");
}
