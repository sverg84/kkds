import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/generated/tokens.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  outDir: "dist",
  // Exclude preview app and Vite app shell from the library bundle
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
});
