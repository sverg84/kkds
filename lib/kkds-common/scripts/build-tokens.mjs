/**
 * Generates src/generated/tokens.ts from tokens.json.
 *
 * tokens.json is the platform-neutral source of truth.
 *
 * Output:
 *   src/generated/tokens.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const tokensPath = join(root, "tokens.json");
const outputDir = join(root, "src", "generated");
const outputPath = join(outputDir, "tokens.ts");

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

function entries(group, tokens) {
  return Object.fromEntries(
    Object.entries(group)
      .filter(([name]) => !name.startsWith("$"))
      .map(([name, node]) => [name, resolveValue(node, tokens)]),
  );
}

function buildPortable(tokens) {
  return {
    color: {
      light: entries(tokens.color.light, tokens),
      dark: entries(tokens.color.dark, tokens),
    },
    fontFamily: {
      sans: resolveValue(tokens.typography.fontFamily.sans, tokens),
      serif: resolveValue(tokens.typography.fontFamily.serif, tokens),
      mono: resolveValue(tokens.typography.fontFamily.mono, tokens),
    },
    radius: resolveValue(tokens.radius.base, tokens),
    spacing: resolveValue(tokens.spacing.base, tokens),
    motion: {
      duration: entries(tokens.motion.duration, tokens),
      easing: entries(tokens.motion.easing, tokens),
    },
  };
}

function buildTs(portable) {
  return `/* GENERATED FROM tokens.json — DO NOT EDIT. */
export const tokens = ${JSON.stringify(portable, null, 2)} as const;

export type Tokens = typeof tokens;

export default tokens;
`;
}

export function buildTokens() {
  const rawTokens = JSON.parse(readFileSync(tokensPath, "utf8"));
  const portable = buildPortable(rawTokens);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, buildTs(portable));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokens();
  process.stdout.write("Generated src/generated/tokens.ts\n");
}
