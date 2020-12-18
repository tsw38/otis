#!/usr/bin/env node
import { fork } from "child_process";

import log from "@tsw38/custom-logger";
import getJestConfigLocation from "./get-jest-config";

const Log = new log({ header: "Otis" }).log;

import {
  initOtis,
  testMode,
  e2eTestMode,
  unitTestMode,
  unitWatchTestMode,
} from "./commands.js";

if (initOtis) {
  Log("Initializing Otis configurations", "info");
}

// import {unit, unitWatch} from './unit.js';

if (testMode) {
}

if (unitTestMode) {
  Log("Running Unit Tests", "info");
  const jestConfig = getJestConfigLocation();

  // const child = spawn("npx", ["jest", "--coverage", `--config=${jestConfig}`], {
  //   detatched: false,
  //   env: {
  //     ...process.env,
  //     NODE_ENV: "test",
  //     JEST_TEST: true,
  //     DEBUG_PRINT_LIMIT: -1,
  //   },
  // });

  const forked = fork(
    "node_modules/.bin/jest",
    ["--coverage", `--config=${jestConfig}`],
    {
      env: {
        ...process.env,
        NODE_ENV: "test",
        JEST_TEST: true,
        DEBUG_PRINT_LIMIT: -1,
      },
    }
  );
  // child.on("exit", (code) => {
  //   console.log(`Child process exited with code ${code}`);
  // });
  // child.stdout.on("data", (data) => {
  //   console.log("stdout");
  //   console.log(`${data}`);
  // });
  // child.stderr.on("data", (data) => {
  //   console.log("stderr");
  //   console.log(`${data}`);
  // });
}

if (unitWatchTestMode) {
}

if (e2eTestMode) {
}
