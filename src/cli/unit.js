const { fork } = require("child_process");
const log = require("@tsw38/custom-logger");

const { mergeJestConfigs } = require("./merge-jest-configs");

const Log = new log({ header: "Otis - Unit Tests" }).log;

const buildFork = (watching) =>
  new Promise((resolve) => {
    resolve(mergeJestConfigs());
  }).then(() =>
    fork(
      "node_modules/.bin/jest",
      [
        watching ? "--watch" : "--coverage",
        `--config=${process.env.TMPDIR}jest.config.json`,
      ],
      {
        env: {
          ...process.env,
          NODE_ENV: "test",
          JEST_TEST: true,
          ...(watching ? { DEBUG_PRINT_LIMIT: -1 } : {}),
        },
      }
    )
  );

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
