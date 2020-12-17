const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  e2e: "e2e",
  test: "test",
  unit: "unit",
  watch: "watch",
};

const runE2E = argv._.includes(availableArgs.e2e);
const runTest = argv._.includes(availableArgs.test);
const runUnit = argv._.includes(availableArgs.unit);
const runWatch = argv._.includes(availableArgs.watch);

module.exports = {
  testMode: runTest && !runWatch,
  e2eTestMode: runE2E && !runWatch,
  unitTestMode: runUnit && !runWatch,
  unitWatchTestMode: runUnit && runWatch,
};
