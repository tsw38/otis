const path = require("path");
const Bundler = require("parcel-bundler");

const isDevMode = process.env.WATCH === "true";

// Bundler options
const options = {
  outDir: "./bin",
  outFile: "cli.js", // The name of the outputFile
  watch: isDevMode,
  cache: false, // Enabled or disables caching, defaults to true
  contentHash: false, // Disable content hash from being included on the filename
  minify: !isDevMode,
  scopeHoist: false,
  target: "node", // Browser/node/electron, defaults to browser
  bundleNodeModules: false, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
  logLevel: 3,
  hmr: false,
  hmrPort: 0,
  sourceMaps: false,
  detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: true,
};

(async function () {
  // Single entrypoint file location:
  const entryFiles = path.join(__dirname, "./src/index.js");

  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.bundle();
})();
