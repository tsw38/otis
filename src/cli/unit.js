const { fork } = require("child_process");
const log = require("@tsw38/custom-logger");

import getJestConfigLocation from "./get-jest-config";

const Log = new log({ header: "Otis - Unit Tests" }).log;

const buildFork = (watching) => {
  const jestConfig = getJestConfigLocation();

  return fork(
    "node_modules/.bin/jest",
    ["--coverage", watching ? "--watch" : `--config=${jestConfig}`],
    {
      env: {
        ...process.env,
        NODE_ENV: "test",
        JEST_TEST: true,
        ...(watching ? { DEBUG_PRINT_LIMIT: -1 } : {}),
      },
    }
  );
};

const runUnitTests = () => {
  Log("Running Unit Tests");
  buildFork();
};

const runUnitTestsWatch = () => {
  Log("Watching Unit Tests");
  buildFork(true);
};

module.exports = {
  runUnitTests,
  runUnitTestsWatch,
};
