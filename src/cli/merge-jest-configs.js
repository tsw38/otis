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
    const rootDir = process.env.PWD;
    const jestConfig = getJestConfig();
    const isPackageJson = jestConfig.includes("package.json");

    if (fs.existsSync(jestConfig)) {
      const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8"));

      const mergedConfigs = merge(
        {
          ...defaultConfig,
          // next remove paths in roots that does exist in project
          roots: defaultConfig.roots.filter((root) =>
            fs.existsSync(`${rootDir}/${root.replace("<rootDir>", "")}`)
          ),
        },
        {
          ...clone(isPackageJson ? projectConfig.jest : projectConfig),
          rootDir,
        }
      );

      fs.writeFileSync(
        `${process.env.TMPDIR}/jest.config.json`,
        JSON.stringify(mergedConfigs),
        "utf-8"
      );
    }

    resolve({});
  });
