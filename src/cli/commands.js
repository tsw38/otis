const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  test: "test",
};

const availableOptions = {
  e2e: ["-e", "--e2e"],
  help: ["-h", "--help"],
  unit: ["-u", "--unit"],
  watch: ["-w", "--watch"],
};

const SCOPES = {
  e2e: "e2e",
  unit: "unit",
  both: "both",
  none: "none",
};

const MODES = {
  watch: "watch",
};

const findMatchingOption = (option) => argv[option.replace(/^\-{1,}/, "")];

const test = argv._.includes(availableArgs.test);

const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);

const showHelp = availableOptions.help.some(findMatchingOption);
const showConfig = argv.config;

const MODE = runWatch ? MODES.watch : "";

const SCOPE =
  runE2E && runUnit
    ? SCOPES.both
    : runE2E && !runUnit
    ? SCOPES.e2e
    : !runE2E && runUnit
    ? SCOPES.unit
    : SCOPES.none;

module.exports = {
  SCOPE,
  SCOPES,
  MODES,
  test,
  showHelp,
  showConfig,
  MODE,
};
