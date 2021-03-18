const fs = require("fs");
const { fork } = require("child_process");
const argv = require("minimist")(process.argv.slice(2));
const { log } = require("@tsw38/custom-logger");

const { mergeJestConfigs } = require("./merge-jest-configs");

const { PWD } = process.env;

const jestConfig = `${process.env.PWD}/node_modules/@tsw38/otis/.cache/jest.config.json`;

const options = {
  related: ["-r", "--only-related"],
};
const runOnlyRelated = options.related.some(
  (option) => argv[option.replace(/^\-{1,}/, "")]
);

const getJestPath = () => {
  const parentPath = `${PWD}/node_modules/.bin/jest`;

  return fs.existsSync(parentPath)
    ? parentPath
    : `${PWD}/node_modules/@tsw38/otis/node_modules/.bin/jest`;
};

const buildFork = async (isWatching) => {
  const childProcess = fork(
    getJestPath(),
    [
      isWatching ? "--watch" : "--coverage",
      runOnlyRelated ? `--findRelatedTests ${PWD}` : "",
      `--config=${jestConfig}`,
    ].filter(Boolean),
    {
      env: {
        ...process.env,
        NODE_ENV: "test",
        JEST_TEST: true,
        ...(isWatching ? { DEBUG_PRINT_LIMIT: -1 } : {}),
      },
    }
  );

  return new Promise((resolve, reject) => {
    childProcess.on("exit", (code) => {
      if (code === 1) {
        reject(code);
      } else {
        log("Unit Tests Passed", {
          type: "success",
          header: "Otis - Unit Tests",
        });
        resolve(code);
      }
    });
  }).catch((errorCode) => {
    log("Unit Tests Failed", {
      type: "error",
      header: "Otis - Unit Tests",
    });
    return errorCode;
  });
};
const runUnitTests = async () => {
  log("Running Unit Tests", {
    header: "Otis - Unit Tests",
  });
  return await mergeJestConfigs().then(() => buildFork());
};
const runUnitTestsWatch = async () => {
  log("Watching Unit Tests", {
    header: "Otis - Unit Tests",
  });

  return await mergeJestConfigs().then(() => buildFork(true));
};
const showJestConfig = () =>
  mergeJestConfigs().then(() =>
    fork(getJestPath(), [`--config=${jestConfig}`, "--showConfig"])
  );

module.exports = {
  runUnitTests,
  runUnitTestsWatch,
  showJestConfig,
};
