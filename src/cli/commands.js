const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  init: "init",
  test: "test",
};

const availableOptions = {
  e2e: ["-e", "--e2e"],
  unit: ["-u", "--unit"],
  watch: ["-w", "--watch"],
};

const findMatchingOption = (option) => argv[option.replace(/\-/g, "")];

const init = argv._.includes(availableArgs.init);
const test = argv._.includes(availableArgs.test);

const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);

module.exports = {
  init,
  test,
  unitTest: test && runUnit && !runWatch,
  unitTestWatch: test && runUnit && runWatch,
};
