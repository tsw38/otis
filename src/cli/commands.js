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

export const SCOPES = {
  e2e: "e2e",
  unit: "unit",
  both: "both",
  none: "none",
};

export const MODES = {
  watch: "watch",
};

const findMatchingOption = (option) => argv[option.replace(/^\-{1,}/, "")];

export const test = argv._.includes(availableArgs.test);

const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);

export const showHelp = availableOptions.help.some(findMatchingOption);
export const showConfig = argv.config;

export const MODE = runWatch ? MODES.watch : "";

export const SCOPE =
  runE2E && runUnit
    ? SCOPES.both
    : runE2E && !runUnit
    ? SCOPES.e2e
    : !runE2E && runUnit
    ? SCOPES.unit
    : SCOPES.none;
