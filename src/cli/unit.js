const { fork } = require("child_process");
const { log } = require("@tsw38/custom-logger");

const { mergeJestConfigs } = require("./merge-jest-configs");

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
  log("Running Unit Tests", {
    header: "Otis - Unit Tests",
  });
  buildFork();
};

const runUnitTestsWatch = () => {
  log("Watching Unit Tests", {
    header: "Otis - Unit Tests",
  });
  buildFork(true);
};

module.exports = {
  runUnitTests,
  runUnitTestsWatch,
};
