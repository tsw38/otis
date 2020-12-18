#!/usr/bin/env node
import { unitTest, unitTestWatch } from "./commands.js";

import { runUnitTests, runUnitTestsWatch } from "./unit";

if (unitTest) {
  runUnitTests();
}

if (unitTestWatch) {
  runUnitTestsWatch();
}
