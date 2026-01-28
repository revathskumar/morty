await Bun.build({
  entrypoints: ["index.ts"],
  // sourcemap: true,
  outdir: "dist/",
  target: "node",
  format: "esm",
  minify: true,
  external: [
    "fs",
    "path",
    "inquirerjs-checkbox-search",
    "@inquirer/prompts",
    "debug",
  ],
});
