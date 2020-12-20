const { fork } = require("child_process");
const { log } = require("@tsw38/custom-logger");

const { mergeJestConfigs } = require("./merge-jest-configs");

const { PWD } = process.env;

const jestPath = `${PWD}/node_modules/@tsw38/otis/node_modules/.bin/jest`;
const jestConfig = `${process.env.TMPDIR}jest.config.json`;

const buildFork = (watching) =>
  mergeJestConfigs().then(() =>
    fork(jestPath, [watching ? "--watch" : "", `--config=${jestConfig}`], {
      env: {
        ...process.env,
        NODE_ENV: "test",
        JEST_TEST: true,
        DEBUG_PRINT_LIMIT: -1,
      },
    })
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

const showJestConfig = () =>
  mergeJestConfigs().then(() =>
    fork(jestPath, [`--config=${jestConfig}`, "--showConfig"])
  );

module.exports = {
  runUnitTests,
  showJestConfig,
  runUnitTestsWatch,
};
