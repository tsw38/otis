#!/usr/bin/env node
import { fork } from "child_process";

import log from "@tsw38/custom-logger";

const Log = new log({ header: "Otis" }).log;

import { init, test, unitTest, unitTestWatch } from "./commands.js";

import { runUnitTests, runUnitTestsWatch } from "./unit";

if (init) {
  Log("Initializing Otis configurations");
}

if (unitTest) {
  runUnitTests();
}

if (unitTestWatch) {
  runUnitTestsWatch();
}
