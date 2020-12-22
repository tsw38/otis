#!/usr/bin/env node
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

import cliOptions from "./command-line-options";

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
  default:
    // otis --help
    if (showHelp) {
      cliOptions();
      break;
    }
}
