const fs = require("fs");
const mkdirp = require("mkdirp");
const merge = require("deepmerge");
const clone = require("clone-deep");

import defaultConfig from "../../jest.config.json";
import { getJestConfig } from "./get-jest-config-path";

const cacheDir = `${process.env.PWD}/node_modules/@tsw38/otis/.cache`;

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

    mkdirp.sync(cacheDir);

    fs.writeFileSync(
      `${cacheDir}/jest.config.json`,
      JSON.stringify(mergedConfigs),
      "utf-8"
    );

    resolve({});
  });
