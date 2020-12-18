const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  test: "test",
};

const availableOptions = {
  e2e: ["-e", "--e2e"],
  unit: ["-u", "--unit"],
  watch: ["-w", "--watch"],
};

const findMatchingOption = (option) => argv[option.replace(/\-/g, "")];

export const test = argv._.includes(availableArgs.test);

const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);

export const unitTest = test && runUnit && !runWatch;
export const unitTestWatch = test && runUnit && runWatch;
