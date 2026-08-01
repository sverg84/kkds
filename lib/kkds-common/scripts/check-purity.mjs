/**
 * Purity guard for @sverg84/kkds-common.
 *
 * This package must have zero framework dependencies — no React, no DOM, no Next.js.
 * Scans src/ for any module specifier or global reference that would break that
 * promise and exits non-zero on violation, so CI catches it immediately.
 *
 * Usage:
 *   node check-purity.mjs            — scans the default src/ directory
 *   node check-purity.mjs <srcDir>   — scans an arbitrary directory (for tests)
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const defaultSrc = join(fileURLToPath(import.meta.url), "../../src");
const SRC_DIR = process.argv[2] ?? defaultSrc;

// ---------------------------------------------------------------------------
// Forbidden patterns
//
// Specifier checks use the form  ['"]pkg['"/]  which matches ALL import forms:
//   import Foo from 'pkg'          named / default import
//   import { foo } from 'pkg'      named import
//   import 'pkg'                   side-effect import
//   import("pkg")                  dynamic import
//   export { foo } from 'pkg'      re-export
//   require("pkg")                 CommonJS require
//   import { foo } from 'pkg/sub'  subpath import  (trailing / is in the char class)
// ---------------------------------------------------------------------------
export const FORBIDDEN = [
  {
    id: "react",
    pattern: /['"]react['"/]/,
    message: "Forbidden: react or react/* — React is framework-specific",
  },
  {
    id: "react-dom",
    pattern: /['"]react-dom['"/]/,
    message: "Forbidden: react-dom or react-dom/* — browser-specific",
  },
  {
    id: "next",
    pattern: /['"]next['"/]/,
    message: "Forbidden: next or next/* — Next.js is framework-specific",
  },
  {
    id: "document",
    pattern: /\bdocument[.[]/,
    message: "`document` DOM global — not available in React Native or Node",
  },
  {
    id: "window",
    pattern: /\bwindow[.[]/,
    message: "`window` DOM global — not available in React Native or Node",
  },
  {
    id: "dom-types",
    pattern: /\bHTMLElement\b|\bHTMLInputElement\b|\bHTMLDivElement\b|\bEventTarget\b|\bMouseEvent\b|\bKeyboardEvent\b/,
    message: "DOM type — use platform-neutral equivalents",
  },
  {
    id: "web-storage",
    pattern: /\blocalStorage\b|\bsessionStorage\b/,
    message: "`localStorage`/`sessionStorage` — Web Storage API, browser-only",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect .ts / .tsx files under a directory. */
export function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(tsx?)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

/** Strip single-line and inline block comments from a line of source code. */
function stripComments(line) {
  return line
    .replace(/\/\*.*?\*\//g, "") // inline block comments: /* … */
    .replace(/\/\/.*$/, "");     // line comments: // …
}

/**
 * Check a single source file.
 * Returns an array of { line, lineNo, message } violations.
 */
export function checkFile(filePath) {
  const violations = [];
  const lines = readFileSync(filePath, "utf8").split("\n");

  lines.forEach((raw, i) => {
    const trimmed = raw.trimStart();

    // Skip pure comment lines — no code can violate here
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("/*")
    ) {
      return;
    }

    // Check the comment-stripped version for all patterns
    const code = stripComments(raw);

    for (const { pattern, message } of FORBIDDEN) {
      if (pattern.test(code)) {
        violations.push({ line: raw.trim(), lineNo: i + 1, message });
      }
    }
  });

  return violations;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------
if (
  import.meta.url === `file://${process.argv[1]}` ||
  // Node resolves symlinks; also match when invoked via package script
  process.argv[1]?.endsWith("check-purity.mjs")
) {
  let total = 0;

  for (const file of walk(SRC_DIR)) {
    const rel = relative(SRC_DIR + "/..", file);
    const violations = checkFile(file);
    for (const { line, lineNo, message } of violations) {
      console.error(`FAIL  ${rel}:${lineNo}  ${message}`);
      console.error(`      ${line}`);
      total++;
    }
  }

  if (total > 0) {
    console.error(
      `\n✗ ${total} purity violation${total === 1 ? "" : "s"} in @sverg84/kkds-common.`,
    );
    console.error(
      "  kkds-common must stay framework-free (no React, no DOM, no Next.js).\n",
    );
    process.exit(1);
  } else {
    console.log(
      "✓ @sverg84/kkds-common purity check passed — no framework or DOM references found.",
    );
  }
}
