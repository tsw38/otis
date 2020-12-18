/* eslint-disable no-console */
const fs = require("fs");
const { merge, cloneDeep } = require("lodash");
const log = require("@tsw38/custom-logger");

/**
 * OPTIONS:
 * - tolerance: keeps the threshold below the measured coverage, allowing wiggle room. default: 0 tolerance
 * - roundDown: round down to the nearest integer. default: false
 * - configLocation: the location of the jest config, default: <rootDir>/jest.config.json
 */

class ThresholdReporter {
  #globalConfig;
  #options;
  #log;
  #PWD = process.env.PWD;

  constructor(globalConfig, options) {
    this.#globalConfig = globalConfig;
    this.#options = options;

    this.#log = new log({ header: "Otis" }).log;
  }

  #getCoverageSummary = () => {
    const coverageDirectory = this.#globalConfig.coverageDirectory;
    const coverageSummary = JSON.parse(
      fs.readFileSync(`${coverageDirectory}/coverage-summary.json`, "utf-8")
    );

    return coverageSummary;
  };

  #generateNewThreshold = (coverageSummary) => {
    return Object.entries(coverageSummary.total).reduce(
      (acc, [type, { pct }]) => {
        const newThreshold = pct - (this.#options.tolerance || 5);

        const percent = this.#options.roundDown
          ? Math.floor(newThreshold)
          : newThreshold;

        acc[type] = percent < 0 ? 0 : percent;

        return acc;
      },
      {}
    );
  };

  #getJestConfigFile = () => {
    const packagePath = `${this.#PWD}/package.json`;
    const jestConfigPath = `${this.#PWD}/jest.config.json`;

    let configLocation =
      this.#options.configLocation ||
      (fs.existsSync(jestConfigPath) ? jestConfigPath : packagePath);

    return configLocation;
  };

  #updateThreshold = (newThreshold) => {
    const configLocation = this.#getJestConfigFile();
    const isPackageJson = configLocation.includes("package.json");

    const configFile = JSON.parse(fs.readFileSync(configLocation, "utf-8"));
    const newCoverageThreshold = {
      coverageThreshold: {
        global: newThreshold,
      },
    };
    const newConfig = merge(
      cloneDeep(configFile),
      isPackageJson ? { jest: newCoverageThreshold } : newCoverageThreshold
    );

    fs.writeFileSync(
      configLocation,
      JSON.stringify(newConfig, null, 2),
      "utf-8"
    );

    this.#log("Updated global threshold", "success");
  };

  #hasDecreasedCoverage = (newThreshold) => {
    const current = this.#globalConfig.coverageThreshold;

    return Object.keys((current && current.global) || {}).some(
      (key) => current.global[key] > newThreshold[key]
    );
  };

  #hasIncreasedCoverage = (newThreshold) => {
    const current = this.#globalConfig.coverageThreshold;

    return current && current.global
      ? Object.keys(current.global).some(
          (key) => current.global[key] < newThreshold[key]
        )
      : true;
  };

  onRunComplete(context, { numFailedTests }) {
    if (this.#globalConfig.watch) {
      return;
    }

    if (!this.#globalConfig.coverageReporters.includes("json-summary")) {
      this.#log(
        'ThresholdReporter needs "json-summary" within "coverageReporters"',
        "error"
      );

      return;
    }

    if (numFailedTests) {
      this.#log(
        "ThresholdReporter only runs when all tests have passed",
        "error"
      );

      return;
    }

    const coverageSummary = this.#getCoverageSummary();
    const newThreshold = this.#generateNewThreshold(coverageSummary);

    if (this.#hasDecreasedCoverage(newThreshold)) {
      this.#log(
        "Coverage has decreased! Please resolve before running tests again.",
        "error"
      );

      return;
    }

    if (this.#hasIncreasedCoverage(newThreshold)) {
      this.#updateThreshold(newThreshold);
    } else {
      this.#log("Coverage has not changed");
    }
  }
}

module.exports = ThresholdReporter;
