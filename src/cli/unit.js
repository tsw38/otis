const { fork } = require("child_process");
const { log } = require("@tsw38/custom-logger");
const argv = require("minimist")(process.argv.slice(2));

const { mergeJestConfigs } = require("./merge-jest-configs");

const { PWD } = process.env;

const jestPath = `${PWD}/node_modules/.bin/jest`;
const jestConfig = `${process.env.TMPDIR}jest.config.json`;

const options = {
  related: ["-r", "--only-related"],
};
const runOnlyRelated = options.related.some(
  (option) => argv[option.replace(/^\-{1,}/, "")]
);

const buildFork = async (isWatching) => {
  const childProcess = fork(
    jestPath,
    [
      isWatching ? "--watch" : "--coverage",
      ...[runOnlyRelated ? `--findRelatedTests ${PWD}` : ""],
      `--config=${jestConfig}`,
    ],
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

  return await buildFork();
};

const runUnitTestsWatch = async () => {
  log("Watching Unit Tests", {
    header: "Otis - Unit Tests",
  });

  return await buildFork(true);
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
