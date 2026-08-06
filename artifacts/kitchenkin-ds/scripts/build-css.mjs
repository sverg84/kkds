/**
 * Builds a browser-ready dist/styles.css from src/index.css.
 *
 * Uses Vite + @tailwindcss/vite to process the Tailwind v4 source so that
 * consumers can `import "@sverg84/kkds-react/styles.css"` without running Tailwind
 * themselves.  The @source directive in src/index.css instructs Tailwind to
 * scan the component files, so all utility classes used by KKDS components
 * are included in the output.
 *
 * Run after tsup so dist/ already exists.
 */
import { build } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const cssInputPath = join(root, "src", "index.css");
const cssOutputPath = join(root, "dist", "styles.css");

const result = await build({
  root,
  configFile: false, // do not load vite.config.ts
  plugins: [
    tailwindcss(),
    {
      // Virtual JS entry that imports the CSS so Vite processes it through
      // the Tailwind plugin.  Using a null-byte-prefixed virtual id prevents
      // Vite from treating the id as a file path.
      name: "kkds-virtual-css-entry",
      resolveId(id) {
        if (id === "virtual:kkds-css-entry") return "\0virtual:kkds-css-entry";
      },
      load(id) {
        if (id === "\0virtual:kkds-css-entry")
          return `import ${JSON.stringify(cssInputPath)}`;
      },
    },
  ],
  logLevel: "warn",
  build: {
    write: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: "virtual:kkds-css-entry",
      output: { assetFileNames: "[name][extname]" },
    },
  },
});

// Extract the CSS asset from the rollup output
let cssContent = "";
const outputs = Array.isArray(result) ? result[0].output : result.output;
for (const chunk of outputs) {
  if (chunk.type === "asset" && chunk.fileName.endsWith(".css")) {
    cssContent = chunk.source;
    break;
  }
}

if (!cssContent) {
  process.stderr.write("build-css: no CSS asset in Vite output\n");
  process.exit(1);
}

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(cssOutputPath, cssContent);
process.stdout.write(
  `build-css: dist/styles.css ${(cssContent.length / 1024).toFixed(1)} kB\n`,
);
