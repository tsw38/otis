#!/usr/bin/env node
import { help, unitTest, unitTestWatch } from "./commands.js";

import { runUnitTests, runUnitTestsWatch } from "./unit";

import logOtisOptions from "./log-options";

if (help) {
  logOtisOptions();
}

if (unitTest) {
  runUnitTests();
}

if (unitTestWatch) {
  runUnitTestsWatch();
}
