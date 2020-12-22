const fs = require("fs");
const merge = require("deepmerge");
const clone = require("clone-deep");

import defaultConfig from "../../jest.config.json";
import { getJestConfig } from "./get-jest-config-path";

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
export const mergeJestConfigs = () =>
  new Promise((resolve) => {
    const rootDir = process.env.PWD;
    const jestConfig = getJestConfig();
    const isPackageJson = jestConfig.includes("package.json");
    let mergedConfigs = defaultConfig;

    if (fs.existsSync(jestConfig)) {
      const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8"));

      // next remove paths in roots that does exist in project
      mergedConfigs = merge(
        {
          ...defaultConfig,
          roots: defaultConfig.roots.filter((root) =>
            fs.existsSync(`${rootDir}/${root.replace("<rootDir>", "")}`)
          ),
        },
        {
          ...clone(isPackageJson ? projectConfig.jest : projectConfig),
          rootDir,
        }
      );
    }

    fs.writeFileSync(
      `${process.env.TMPDIR}/jest.config.json`,
      JSON.stringify(mergedConfigs),
      "utf-8"
    );

    resolve({});
  });
