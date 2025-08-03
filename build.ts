Bun.build({
  entrypoints: ["index.ts"],
  // sourcemap: true,
  outdir: "dist/",
  target: "node",
  format: "esm",
  external: [
    "fs",
    "path",
    "inquirerjs-checkbox-search",
    "@inquirer/prompts",
    "jsonc-parser",
    "debug",
  ],
});
