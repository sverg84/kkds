/**
 * Generates the consumable web theme (src/index.css) and the portable token
 * object (src/generated/tokens.tsx) from lib/kkds-common/tokens.json.
 *
 * tokens.json lives in kkds-common because tokens are platform-neutral.
 * The CSS theme stays in kkds-web because it is browser-specific.
 * Both share the same input file so web + (future) mobile stay in sync.
 *
 * This script also regenerates kkds-common's TS output (lib/kkds-common/src/generated/tokens.ts)
 * so the two packages remain in sync after a single `pnpm tokens` invocation.
 *
 * Outputs:
 *   src/index.css                          the design system's web theme
 *   src/generated/tokens.tsx               hex + motion token object (web barrel)
 *   ../../lib/kkds-common/src/generated/tokens.ts  platform-neutral TS object
 *   public/favicon.svg                     regenerated from public/logo.svg
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, ".."); // artifacts/kitchenkin-ds/
const commonRoot = join(root, "../../lib/kkds-common"); // lib/kkds-common/

const tokensPath = join(commonRoot, "tokens.json");
const templatePath = join(here, "theme-template.css");
const cssOut = join(root, "src", "index.css");
const tsOutDir = join(root, "src", "generated");
const faviconOut = join(root, "public", "favicon.svg");
const commonTsOutDir = join(commonRoot, "src", "generated");

/** Resolve a DTCG node's $value, following {alias} references. */
function resolveValue(node, tokens) {
  const raw = node?.$value;
  if (typeof raw === "string" && raw.startsWith("{") && raw.endsWith("}")) {
    const path = raw.slice(1, -1).split(".");
    let cur = tokens;
    for (const key of path) cur = cur?.[key];
    return resolveValue(cur, tokens);
  }
  return raw;
}

function hexToHslChannels(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      default:
        hue = (r - g) / d + 4;
    }
    hue /= 6;
  }
  const H = Math.round(hue * 360);
  const S = Math.round(s * 1000) / 10;
  const L = Math.round(l * 1000) / 10;
  return `${H} ${S}% ${L}%`;
}

function toFontStack(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function buildFavicon() {
  const logoPath = join(root, "public", "logo.svg");
  return readFileSync(logoPath, "utf8");
}

function colorEntries(scope, tokens) {
  const out = {};
  for (const [name, node] of Object.entries(tokens.color[scope])) {
    if (name.startsWith("$")) continue;
    out[name] = resolveValue(node, tokens);
  }
  return out;
}

function motionEntries(group, tokens) {
  const out = {};
  for (const [name, node] of Object.entries(tokens.motion[group])) {
    if (name.startsWith("$")) continue;
    out[name] = resolveValue(node, tokens);
  }
  return out;
}

function buildPortable(tokens) {
  return {
    color: {
      light: colorEntries("light", tokens),
      dark: colorEntries("dark", tokens),
    },
    fontFamily: {
      sans: resolveValue(tokens.typography.fontFamily.sans, tokens),
      serif: resolveValue(tokens.typography.fontFamily.serif, tokens),
      mono: resolveValue(tokens.typography.fontFamily.mono, tokens),
    },
    radius: resolveValue(tokens.radius.base, tokens),
    spacing: resolveValue(tokens.spacing.base, tokens),
    motion: {
      duration: motionEntries("duration", tokens),
      easing: motionEntries("easing", tokens),
    },
  };
}

function buildCss(tokens) {
  let css = readFileSync(templatePath, "utf8");
  const replacements = {};

  for (const scope of ["light", "dark"]) {
    for (const [name, hex] of Object.entries(colorEntries(scope, tokens))) {
      replacements[`__DS_${scope.toUpperCase()}_${name.toUpperCase()}__`] =
        hexToHslChannels(hex);
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

  for (const [token, value] of Object.entries(replacements)) {
    css = css.split(token).join(value);
  }

  const leftover = css.match(/__DS_[A-Z0-9_]+__/g);
  if (leftover) {
    throw new Error(
      `tokens.json is missing values for: ${[...new Set(leftover)].join(", ")}`,
    );
  }
  return css;
}

function buildWebTs(portable) {
  return `/* GENERATED FROM lib/kkds-common/tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex, motion as CSS strings). Web consumes the
// color theme via src/index.css; all platforms share this object.
export const tokens = ${JSON.stringify(portable, null, 2)} as const;

export type Tokens = typeof tokens;
export default tokens;
`;
}

function buildCommonTs(portable) {
  return `/* GENERATED FROM tokens.json -- DO NOT EDIT. Run \`pnpm tokens\` in lib/kkds-common. */
// Portable design tokens (colors as hex, motion as CSS strings).
// Web consumes the color theme via kkds-web's src/index.css.
// All platforms import this object so the whole product shares one source of truth.
export const tokens = ${JSON.stringify(portable, null, 2)} as const;

export type Tokens = typeof tokens;
export default tokens;
`;
}

export function buildTokens() {
  const rawTokens = JSON.parse(readFileSync(tokensPath, "utf8"));
  const portable = buildPortable(rawTokens);

  // 1. Write the web CSS theme
  writeFileSync(cssOut, buildCss(rawTokens));

  // 2. Write the kkds-web portable token object (with motion)
  mkdirSync(tsOutDir, { recursive: true });
  writeFileSync(join(tsOutDir, "tokens.tsx"), buildWebTs(portable));

  // 3. Keep kkds-common's generated/tokens.ts in sync
  mkdirSync(commonTsOutDir, { recursive: true });
  writeFileSync(join(commonTsOutDir, "tokens.ts"), buildCommonTs(portable));

  // 4. Regenerate favicon
  mkdirSync(dirname(faviconOut), { recursive: true });
  writeFileSync(faviconOut, buildFavicon());
}

function dirname2(path) {
  return path.split("/").slice(0, -1).join("/");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokens();
  process.stdout.write(
    "Generated src/index.css, src/generated/tokens.tsx, lib/kkds-common/src/generated/tokens.ts, and public/favicon.svg\n",
  );
}
