const fs = require("fs");
const merge = require("deepmerge");
const clone = require("clone-deep");

const defaultConfig = require("../../cypress.json");
const { getCypressConfigPath } = require("./get-cypress-config-path");

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */

// replace all relative paths or <rootDirs> with PWD
const mergeCypressConfigs = () =>
  new Promise((resolve) => {
    const cypressConfig = getCypressConfigPath();
    const isPackageJson = cypressConfig.includes("package.json");
    let mergedConfigs = defaultConfig;

    if (fs.existsSync(cypressConfig)) {
      const projectConfig = JSON.parse(fs.readFileSync(cypressConfig, "utf-8"));

      mergedConfigs = merge(
        defaultConfig,
        clone(isPackageJson ? projectConfig.cypress : projectConfig)
      );
    }
    // provide all of the config options as an object so it can be used in the fork command
    resolve(mergedConfigs);
  });

module.exports = { mergeCypressConfigs };
