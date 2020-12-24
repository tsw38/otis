#!/usr/bin/env node
const { log } = require("@tsw38/custom-logger");

import {
  test,
  MODE,
  SCOPE,
  MODES,
  SCOPES,
  showHelp,
  showConfig,
} from "./commands.js";

import { runUnitTests, runUnitTestsWatch, showJestConfig } from "./unit";
import { runE2ETests, runE2ETestsWatch, showCypressConfig } from "./e2e";

import help from "./help";

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
