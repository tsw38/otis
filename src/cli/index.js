#!/usr/bin/env node
import { help, unitTest, unitTestWatch, showConfig } from "./commands.js";

import { runUnitTests, runUnitTestsWatch, showJestConfig } from "./unit";

import logOtisOptions from "./log-options";

if (help) {
  logOtisOptions();
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
