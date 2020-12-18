const merge = require("deepmerge");
const Bundler = require("parcel-bundler");

const isDevMode = process.env.WATCH === "true";

// shared options
const options = {
  hmr: false,
  hmrPort: 0,
  logLevel: 3,
  cache: false, // Enabled or disables caching, defaults to true
  target: "node", // Browser/node/electron, defaults to browser
  watch: isDevMode,
  scopeHoist: false,
  sourceMaps: false,
  autoInstall: true,
  minify: !isDevMode,
  contentHash: false, // Disable content hash from being included on the filename
  detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  bundleNodeModules: "otis", // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
};

(async function () {
  // Initializes a bundler using the entrypoint location and options provided
  await new Bundler(
    "./src/cli/index.js",
    merge(options, { outDir: "./bin", outFile: "cli.js" })
  ).bundle();

  // await new Bundler(
  //   "./src/test/**/*.js",
  //   merge(options, { outDir: "./lib", outFile: "index.js" })
  // ).bundle();
})();
