#!/usr/bin/env node
import { help, unitTest, unitTestWatch, showConfig } from "./commands.js";

import { runUnitTests, runUnitTestsWatch, showJestConfig } from "./unit";

import cliOptions from "./command-line-options";

if (help) {
  cliOptions();
}

if (showConfig) {
  showJestConfig();
}

if (unitTest) {
  runUnitTests();
}

if (unitTestWatch) {
  runUnitTestsWatch();
}
