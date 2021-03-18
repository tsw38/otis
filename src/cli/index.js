#!/usr/bin/env node
const { log } = require("@tsw38/custom-logger");

const {
  test,
  MODE,
  SCOPE,
  MODES,
  SCOPES,
  showHelp,
  showConfig,
} = require("./commands");

const { runUnitTests, runUnitTestsWatch, showJestConfig } = require("./unit");
const { runE2ETests, runE2ETestsWatch, showCypressConfig } = require("./e2e");

const { help } = require("./help");

switch (SCOPE) {
  case SCOPES.unit:
    // otis test -u -w
    if (test && MODE === MODES.watch) {
      runUnitTestsWatch();
      break;
    }
    // otis test -u
    if (test) {
      runUnitTests();
      break;
    }
    // otis -u --config
    if (showConfig) {
      showJestConfig();
      break;
    }
    break;
  case SCOPES.e2e:
    // otis test -e -w
    if (test && MODE === MODES.watch) {
      runE2ETestsWatch();
      break;
    }
    // otis test -e
    if (test) {
      runE2ETests();
      break;
    }
    // otis -e --config
    if (showConfig) {
      showCypressConfig();
      break;
    }

  case SCOPES.none:
  case SCOPES.both:
  default:
    // otis test
    if (test) {
      runUnitTests()
        .then((errorCode) => {
          if (!!errorCode) {
            throw new Error("Unit Tests Failed");
          }
          return;
        })
        .then(runE2ETests)
        .then((errorCode) => {
          if (!!errorCode) {
            throw new Error("E2E Tests Failed");
          }
          return;
        })
        .catch((err) => {
          log(err.message || err, {
            type: "error",
            header: "Otis - Error",
          });
        });
      break;
    }
    // otis --help
    if (showHelp) {
      help();
      break;
    }
}
