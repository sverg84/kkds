/**
 * Negative-fixture tests for check-purity.mjs.
 *
 * Each fixture contains a forbidden pattern. The test verifies that
 * check-purity.mjs exits non-zero for every fixture (i.e. the violation
 * is caught). If any fixture passes undetected the test exits non-zero.
 *
 * Run via:  node scripts/test-purity.mjs
 */

import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), "check-purity.mjs");

// ---------------------------------------------------------------------------
// Fixtures — every entry MUST be caught (check must exit non-zero).
// ---------------------------------------------------------------------------
const FIXTURES = [
  // react — all import forms
  { id: "react/named-single",    code: `import React from 'react'` },
  { id: "react/named-double",    code: `import { useState } from "react"` },
  { id: "react/side-effect",     code: `import 'react'` },
  { id: "react/dynamic",         code: `const m = await import("react")` },
  { id: "react/re-export",       code: `export { useEffect } from 'react'` },
  { id: "react/subpath-single",  code: `import { jsx } from 'react/jsx-runtime'` },
  { id: "react/subpath-double",  code: `import { jsx } from "react/jsx-dev-runtime"` },

  // react-dom — all import forms
  { id: "react-dom/named",       code: `import ReactDOM from 'react-dom'` },
  { id: "react-dom/subpath",     code: `import { createRoot } from 'react-dom/client'` },
  { id: "react-dom/dynamic",     code: `const m = import("react-dom")` },

  // next — root and subpath
  { id: "next/root",             code: `import next from 'next'` },
  { id: "next/subpath",         code: `import { useRouter } from 'next/navigation'` },
  { id: "next/config",          code: `import config from "next/config"` },

  // DOM globals
  { id: "dom/document",          code: `const el = document.getElementById('x')` },
  { id: "dom/document-bracket",  code: `const el = document['getElementById']('x')` },
  { id: "dom/window",            code: `window.location.href = '/'` },
  { id: "dom/window-bracket",    code: `window['addEventListener']('load', cb)` },
  { id: "dom/HTMLElement",       code: `const el: HTMLElement = {} as any` },
  { id: "dom/HTMLInputElement",  code: `const i: HTMLInputElement = {} as any` },
  { id: "dom/EventTarget",       code: `const t: EventTarget = {} as any` },
  { id: "dom/MouseEvent",        code: `function onClick(e: MouseEvent) {}` },
  { id: "dom/KeyboardEvent",     code: `function onKey(e: KeyboardEvent) {}` },

  // Web Storage
  { id: "storage/localStorage",  code: `localStorage.setItem('k', 'v')` },
  { id: "storage/sessionStorage",code: `sessionStorage.getItem('k')` },
];

// ---------------------------------------------------------------------------
// Run each fixture in an isolated temp directory
// ---------------------------------------------------------------------------
let passed = 0;
let missed = 0;

for (const { id, code } of FIXTURES) {
  const dir = mkdtempSync(join(tmpdir(), "kkds-purity-"));
  const srcDir = join(dir, "src");
  mkdirSync(srcDir);
  writeFileSync(join(srcDir, "fixture.ts"), `${code}\n`);

  try {
    execSync(`node "${SCRIPT}" "${srcDir}"`, { stdio: "pipe" });
    // Exit 0 means the violation was NOT caught — test failure
    console.error(`MISS  [${id}]: violation not caught: ${code}`);
    missed++;
  } catch {
    // Non-zero exit means the violation WAS caught — test passes
    console.log(`PASS  [${id}]`);
    passed++;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log(`\n${passed} passed, ${missed} missed`);
if (missed > 0) {
  console.error(`✗ ${missed} fixture(s) not caught by check-purity.mjs`);
  process.exit(1);
} else {
  console.log("✓ All purity test fixtures caught correctly.");
}
