/* eslint-disable no-console */
import fs from "fs";
import merge from "lodash/merge";
import { log } from "@tsw38/custom-logger";
import cloneDeep from "lodash/cloneDeep";

/**
 * OPTIONS:
 * - tolerance: keeps the threshold below the measured coverage, allowing wiggle room. default: 0 tolerance
 * - roundDown: round down to the nearest integer. default: false
 */

class ThresholdReporter {
  #globalConfig;
  #options;
  #header = "Threshold Ratchet";
  #PWD = process.env.PWD;

  constructor(globalConfig, options) {
    this.#globalConfig = globalConfig;
    this.#options = options;
  }

  /**
   * @returns the generated coverage summary from the json-summary reporter
   */
  #getReportedCoverageSummary = () => {
    const coverageDirectory = this.#globalConfig.coverageDirectory;
    const coverageSummary = JSON.parse(
      fs.readFileSync(`${coverageDirectory}/coverage-summary.json`, "utf-8")
    );

    return coverageSummary;
  };

  /**
   * @context given a tolerance threshold
   * @returns iterates over all coverage keys and update their percentages from the generated coverage report
   */
  #generateNewThreshold = () => {
    const coverageSummary = this.#getReportedCoverageSummary();

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

  /**
   * @returns the path of the projects jest configuration or defaults to package.json
   */
  #getJestConfigFile = () => {
    const packagePath = `${this.#PWD}/package.json`;
    const jestConfigPath = `${this.#PWD}/jest.config.json`;

    return fs.existsSync(jestConfigPath) ? jestConfigPath : packagePath;
  };

  /**
   * @returns a boolean if the jest configuration is the default package json file
   */
  #isPackageJSON = () => this.#getJestConfigFile().includes("package.json");

  /**
   * @param: newThreshold - the ratcheted threshold generated after successful runs
   * @returns void
   */
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

    log("Updated global threshold", {
      type: "success",
      header: this.#header,
    });
  };

  /**
   * @returns the coverage json either from the jest config
   */
  #getCoverageFromConfig = () => {
    const config = this.#getJestConfigFile();
    const file = JSON.parse(fs.readFileSync(config, "utf-8"));
    const coverage = this.#isPackageJSON()
      ? (file.jest &&
          file.jest.coverageThreshold &&
          file.jest.coverageThreshold.global) ||
        {}
      : (file.coverageThreshold && file.coverageThreshold.global) || {};

    return coverage;
  };

  /**
   * @returns true if after running tests, coverage has decreased
   */
  #hasDecreasedCoverage = (newThreshold) => {
    const coverage = this.#getCoverageFromConfig();

    return Object.keys(coverage).some(
      (key) => coverage[key] > newThreshold[key]
    );
  };

  /**
   * @returns true if after running tests, coverage has increased
   */
  #hasIncreasedCoverage = (newThreshold) => {
    const coverage = this.#getCoverageFromConfig();

    const coverageKeys = Object.keys(coverage);

    return (
      !coverageKeys.length ||
      coverageKeys.some((key) => coverage[key] < newThreshold[key])
    );
  };

  onRunComplete(context, { numFailedTests }) {
    if (this.#globalConfig.watch) {
      return;
    }

    if (numFailedTests) {
      log("ThresholdReporter only runs when all tests have passed", {
        type: "error",
        header: this.#header,
      });

      return;
    }

    const newThreshold = this.#generateNewThreshold();

    if (this.#hasDecreasedCoverage(newThreshold)) {
      log(
        "Coverage has decreased! Please resolve before running tests again.",
        { type: "error", header: this.#header }
      );

      return;
    }

    if (this.#hasIncreasedCoverage(newThreshold)) {
      this.#updateThreshold(newThreshold);
    } else {
      log("Coverage has not changed", { header: this.#header });
    }
  }
}

export default ThresholdReporter;
