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
  default:
    // otis --help
    if (showHelp) {
      cliOptions();
      break;
    }
}
