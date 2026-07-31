import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/generated/tokens.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  // dist is wiped by the build:lib script before this runs; clean:true here
  // would be redundant but harmless — kept false to make the sequence explicit.
  clean: false,
  splitting: false,
  sourcemap: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  outDir: "dist",
  // Mark the entire bundle as a client module.  The bundle mixes stateless
  // presentational components with stateful Radix primitives and KKDS
  // interactive components, so the safest accurate declaration for a single
  // entry bundle is "use client".  Next.js App Router consumers can import
  // any export from a React Server Component — they will be rendered as client
  // component references, which is correct behaviour.
  banner: {
    js: '"use client";',
  },
  // Ensure node_modules conditions resolve to browser/module builds.
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
});
