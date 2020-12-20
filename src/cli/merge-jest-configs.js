const fs = require("fs");
const merge = require("deepmerge");
const clone = require("clone-deep");

import defaultConfig from "../../jest.config.json";
import { getJestConfig } from "./get-jest-config";

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
export const mergeJestConfigs = () =>
  new Promise((resolve) => {
    const jestConfig = getJestConfig();
    const isPackageJson = jestConfig.includes("package.json");

    if (fs.existsSync(jestConfig)) {
      const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8"));

      const mergedConfigs = merge(defaultConfig, {
        ...clone(isPackageJson ? projectConfig.jest : projectConfig),
        rootDir: process.env.PWD,
      });

      // console.log(mergedConfigs);

      fs.writeFileSync(
        `${process.env.TMPDIR}/jest.config.json`,
        JSON.stringify(mergedConfigs),
        "utf-8"
      );
    }

    resolve({});
  });
