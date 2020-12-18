const fs = require("fs");
const merge = require("deepmerge");

import defaultConfig from "../../jest.config.json";
import { getJestConfig } from "./get-jest-config";

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
export const mergeJestConfigs = () => {
  const jestConfig = getJestConfig();
  const isPackageJson = jestConfig.includes("package.json");

  if (fs.existsSync(jestConfig)) {
    const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8"));

    const mergedConfigs = merge(
      defaultConfig,
      { rootDir: process.env.PWD },
      isPackageJson ? projectConfig.jest : projectConfig
    );

    fs.writeFileSync(
      `${process.env.TMPDIR}/jest.config.json`,
      JSON.stringify(mergedConfigs),
      "utf-8"
    );
  }
};
