#!/usr/bin/env node










// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"commands.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCOPE = exports.MODE = exports.showConfig = exports.showHelp = exports.test = exports.MODES = exports.SCOPES = void 0;

const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  test: "test"
};
const availableOptions = {
  e2e: ["-e", "--e2e"],
  help: ["-h", "--help"],
  unit: ["-u", "--unit"],
  watch: ["-w", "--watch"]
};
const SCOPES = {
  e2e: "e2e",
  unit: "unit",
  both: "both",
  none: "none"
};
exports.SCOPES = SCOPES;
const MODES = {
  watch: "watch"
};
exports.MODES = MODES;

const findMatchingOption = option => argv[option.replace(/\-/g, "")];

const test = argv._.includes(availableArgs.test);

exports.test = test;
const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);
const showHelp = availableOptions.help.some(findMatchingOption);
exports.showHelp = showHelp;
const showConfig = argv.config;
exports.showConfig = showConfig;
const MODE = runWatch ? MODES.watch : "";
exports.MODE = MODE;
const SCOPE = runE2E && runUnit ? SCOPES.both : runE2E && !runUnit ? SCOPES.e2e : !runE2E && runUnit ? SCOPES.unit : SCOPES.none;
exports.SCOPE = SCOPE;
},{}],"../../jest.config.json":[function(require,module,exports) {
module.exports = {
  "clearMocks": true,
  "resetMocks": true,
  "moduleDirectories": ["node_modules", "<rootDir>/src/js/", "<rootDir>/src", "<rootDir>/__test__", "<rootDir>"],
  "moduleFileExtensions": ["js", "jsx", "json"],
  "roots": ["<rootDir>/node_modules", "<rootDir>/src/js/", "<rootDir>/src", "<rootDir>"],
  "modulePaths": ["<rootDir>/node_modules", "<rootDir>/src/js/", "<rootDir>/src", "<rootDir>"],
  "moduleNameMapper": {
    "\\.(svg|css)$": "@tsw38/otis/lib/modules/map-to-string",
    "\\.scss$": "@tsw38/otis/lib/modules/identity-obj-proxy"
  },
  "globalSetup": "@tsw38/otis/lib/modules/global-setup",
  "setupFiles": ["@tsw38/otis/lib/modules/jest-date-mock"],
  "setupFilesAfterEnv": ["@tsw38/otis/lib/modules/jest-extended", "@tsw38/otis/lib/modules/jest-chain", "@tsw38/otis/lib/modules/rtl-extend-expect"],
  "reporters": ["default"],
  "coverageDirectory": "coverage",
  "collectCoverageFrom": ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  "coverageReporters": ["json", "lcov", "text-summary", "json-summary"],
  "watchPlugins": ["@tsw38/otis/lib/modules/watch-typeahead-filename", "@tsw38/otis/lib/modules/watch-typeahead-testname"],
  "testPathIgnorePatterns": ["cypress/*", "/src/.+(int|e2e).(spec|test).(t|j)s(x)?"]
};
},{}],"get-jest-config-path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJestConfig = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getJestConfig = () => {
  const PWD = process.env.PWD;
  const jestConfigPath = `${PWD}/jest.config.json`;
  return _fs.default.existsSync(jestConfigPath) ? jestConfigPath : `${PWD}/package.json`;
};

exports.getJestConfig = getJestConfig;
},{}],"merge-jest-configs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeJestConfigs = void 0;

var _jestConfig = _interopRequireDefault(require("../../jest.config.json"));

var _getJestConfigPath = require("./get-jest-config-path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = require("fs");

const merge = require("deepmerge");

const clone = require("clone-deep");

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
const mergeJestConfigs = () => new Promise(resolve => {
  const rootDir = process.env.PWD;
  const jestConfig = (0, _getJestConfigPath.getJestConfig)();
  const isPackageJson = jestConfig.includes("package.json");
  let mergedConfigs = _jestConfig.default;

  if (fs.existsSync(jestConfig)) {
    const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8")); // next remove paths in roots that does exist in project

    mergedConfigs = merge({ ..._jestConfig.default,
      roots: _jestConfig.default.roots.filter(root => fs.existsSync(`${rootDir}/${root.replace("<rootDir>", "")}`))
    }, { ...clone(isPackageJson ? projectConfig.jest : projectConfig),
      rootDir
    });
  }

  fs.writeFileSync(`${process.env.TMPDIR}/jest.config.json`, JSON.stringify(mergedConfigs), "utf-8");
  resolve({});
});

exports.mergeJestConfigs = mergeJestConfigs;
},{"../../jest.config.json":"../../jest.config.json","./get-jest-config-path":"get-jest-config-path.js"}],"unit.js":[function(require,module,exports) {
const {
  fork
} = require("child_process");

const {
  log
} = require("@tsw38/custom-logger");

const {
  mergeJestConfigs
} = require("./merge-jest-configs");

const {
  PWD
} = process.env;
const jestPath = `${PWD}/node_modules/.bin/jest`;
const jestConfig = `${process.env.TMPDIR}jest.config.json`;

const buildFork = async watching => {
  const mergedConfig = await mergeJestConfigs();
  const childProcess = fork(jestPath, [watching ? "--watch" : "--coverage", `--config=${jestConfig}`], {
    env: { ...process.env,
      NODE_ENV: "test",
      JEST_TEST: true,
      ...(watching ? {
        DEBUG_PRINT_LIMIT: -1
      } : {})
    }
  });
  return new Promise((resolve, reject) => {
    childProcess.on("exit", code => {
      if (code === 1) {
        reject(code);
      } else {
        log("Unit Tests Passed", {
          type: "success",
          header: "Otis - Unit Tests"
        });
        resolve(code);
      }
    });
  }).catch(errorCode => {
    log("Unit Tests Failed", {
      type: "error",
      header: "Otis - Unit Tests"
    });
    return errorCode;
  });
};

const runUnitTests = async () => {
  log("Running Unit Tests", {
    header: "Otis - Unit Tests"
  });
  return await buildFork();
};

const runUnitTestsWatch = async () => {
  log("Watching Unit Tests", {
    header: "Otis - Unit Tests"
  });
  return await buildFork(true);
};

const showJestConfig = () => mergeJestConfigs().then(() => fork(jestPath, [`--config=${jestConfig}`, "--showConfig"]));

module.exports = {
  runUnitTests,
  showJestConfig,
  runUnitTestsWatch
};
},{"./merge-jest-configs":"merge-jest-configs.js"}],"../../cypress.json":[function(require,module,exports) {
module.exports = {
  "viewportWidth": 1080,
  "viewportHeight": 1080,
  "video": true,
  "nodeVersion": "system",
  "screenshotOnRunFailure": true,
  "integrationFolder": "cypress/e2e",
  "fixturesFolder": "__test__/fixtures"
};
},{}],"get-cypress-config-path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCypressConfigPath = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCypressConfigPath = () => {
  const PWD = process.env.PWD;
  const cypressConfigPath = `${PWD}/cypress.json`;
  return _fs.default.existsSync(cypressConfigPath) ? cypressConfigPath : `${PWD}/package.json`;
};

exports.getCypressConfigPath = getCypressConfigPath;
},{}],"merge-cypress-configs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeCypressConfigs = void 0;

var _cypress = _interopRequireDefault(require("../../cypress.json"));

var _getCypressConfigPath = require("./get-cypress-config-path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = require("fs");

const merge = require("deepmerge");

const clone = require("clone-deep");

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
// replace all relative paths or <rootDirs> with PWD
const mergeCypressConfigs = () => new Promise(resolve => {
  const cypressConfig = (0, _getCypressConfigPath.getCypressConfigPath)();
  const isPackageJson = cypressConfig.includes("package.json");
  let mergedConfigs = _cypress.default;

  if (fs.existsSync(cypressConfig)) {
    const projectConfig = JSON.parse(fs.readFileSync(cypressConfig, "utf-8"));
    mergedConfigs = merge(_cypress.default, clone(isPackageJson ? projectConfig.cypress : projectConfig));
  } // provide all of the config options as an object so it can be used in the fork command


  resolve(mergedConfigs);
});

exports.mergeCypressConfigs = mergeCypressConfigs;
},{"../../cypress.json":"../../cypress.json","./get-cypress-config-path":"get-cypress-config-path.js"}],"e2e.js":[function(require,module,exports) {
const fs = require("fs");

const glob = require("glob");

const {
  fork
} = require("child_process");

const {
  log
} = require("@tsw38/custom-logger");

const argv = require("minimist")(process.argv.slice(2));

const {
  mergeCypressConfigs
} = require("./merge-cypress-configs");

const {
  PWD
} = process.env;
const cypressPath = `${PWD}/node_modules/.bin/cypress`;
const ssatPath = `./node_modules/.bin/start-server-and-test`;

const isLocalServer = ({
  baseUrl
}) => /local.+\:\d{4,}/.test(baseUrl);

const configToString = config => Object.entries(config).map(([key, value]) => {
  return `-c${key}=${JSON.stringify(value)}`;
}).join(" ");

const buildFork = async watching => {
  const config = await mergeCypressConfigs();
  let runE2ETests = false;

  if (config.testFiles) {
    runE2ETests = Boolean(glob.sync(`${PWD}/${config.testFiles}`).length);
  } else {
    runE2ETests = Boolean(fs.readdirSync(`${PWD}/${config.integrationFolder}`).length);
  }

  if (!runE2ETests) {
    log(`No E2E tests found ${Boolean(config.testFiles) ? `with pattern: ${config.testFiles}` : `in directory: ${PWD}/${config.integrationFolder}`}`, {
      header: "Otis - E2E Tests"
    });
    return;
  }

  const localServer = isLocalServer(config);
  const mode = watching ? "open" : "run";
  const cypressConfig = `${configToString(config)}`;
  let childProcess;

  if (localServer) {
    childProcess = fork(ssatPath, [argv["start-command"] || "start", (config.baseUrl || "").split(":")[2] || 3000, `${cypressPath} ${mode} ${cypressConfig}`]);
  } else {
    childProcess = fork(cypressPath, [mode, cypressConfig]);
  }

  return new Promise((resolve, reject) => {
    childProcess.on("exit", code => {
      if (code === 1) {
        reject();
      } else {
        log("E2E Tests Passed", {
          type: "success",
          header: "Otis - E2E Tests"
        });
        resolve();
      }
    });
  }).catch(err => {
    log("E2E Tests Failed", {
      type: "error",
      header: "Otis - E2E Tests"
    });
  });
};

const runE2ETests = async () => {
  log("Running E2E Tests", {
    header: "Otis - E2E Tests"
  });
  await buildFork();
};

const runE2ETestsWatch = async () => {
  log("Watching E2E Tests", {
    header: "Otis - E2E Tests"
  });
  await buildFork(true);
};

const showCypressConfig = () => {
  mergeCypressConfigs().then(({
    config
  }) => {
    log(JSON.stringify(config, null, 2), {
      header: "Otis"
    });
  });
};

module.exports = {
  runE2ETests,
  runE2ETestsWatch,
  showCypressConfig
};
},{"./merge-cypress-configs":"merge-cypress-configs.js"}],"help.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const commandLineUsage = require("command-line-usage");

const sections = [{
  header: "OTIS",
  content: "An opinionated testing interface system"
}, {
  header: "Available Commands",
  content: [{
    name: "test",
    summary: "Runs the testing suite"
  }, {
    name: "--help",
    summary: "Seems a bit self explanatory"
  }].map(({
    name,
    summary
  }) => ({
    name,
    summary
  }))
}, {
  header: "Command: 'otis test'",
  optionList: [{
    name: "unit",
    alias: "u",
    typeLabel: "    bool",
    description: "Runs the jest unit tests looking for any .spec.js or .spec.jsx file"
  }, {
    name: "e2e",
    alias: "e",
    typeLabel: "     bool",
    description: "Runs the cypress end to end tests looking for any .e2e.js or .e2e.jsx file"
  }, {
    name: "watch",
    alias: "w",
    typeLabel: "   bool",
    description: "Used in conjunction with the unit/e2e command to run jest/cypress in watch/open mode"
  }, {
    name: "start-command",
    typeLabel: "string",
    description: "(optional) flag to pass a custom start command other than your projects `npm start` for running E2E tests against"
  }]
}, {
  header: "Command: 'otis (-u | -e)'",
  optionList: [{
    name: "config",
    typeLabel: "bool",
    description: "Prints the extended jest/cypress configuration for your tests"
  }]
}];

var _default = () => console.log(commandLineUsage(sections));

exports.default = _default;
},{}],"index.js":[function(require,module,exports) {

"use strict";

var _commands = require("./commands.js");

var _unit = require("./unit");

var _e2e = require("./e2e");

var _help = _interopRequireDefault(require("./help"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  log
} = require("@tsw38/custom-logger");

switch (_commands.SCOPE) {
  case _commands.SCOPES.unit:
    // otis test -u -w
    if (_commands.test && _commands.MODE === _commands.MODES.watch) {
      (0, _unit.runUnitTestsWatch)();
      break;
    } // otis test -u


    if (_commands.test) {
      (0, _unit.runUnitTests)();
      break;
    } // otis -u --config


    if (_commands.showConfig) {
      (0, _unit.showJestConfig)();
      break;
    }

    break;

  case _commands.SCOPES.e2e:
    // otis test -e -w
    if (_commands.test && _commands.MODE === _commands.MODES.watch) {
      (0, _e2e.runE2ETestsWatch)();
      break;
    } // otis test -e


    if (_commands.test) {
      (0, _e2e.runE2ETests)();
      break;
    } // otis -e --config


    if (_commands.showConfig) {
      (0, _e2e.showCypressConfig)();
      break;
    }

  case _commands.SCOPES.none:
  case _commands.SCOPES.both:
  default:
    // otis test
    if (_commands.test) {
      (0, _unit.runUnitTests)().then(errorCode => {
        if (!!errorCode) {
          throw new Error("Unit Tests Failed");
        }

        return;
      }).then(_e2e.runE2ETests).then(errorCode => {
        if (!!errorCode) {
          throw new Error("E2E Tests Failed");
        }

        return;
      }).catch(err => {
        log(err.message || err, {
          type: "error",
          header: "Otis - Error"
        });
      });
      break;
    } // otis --help


    if (_commands.showHelp) {
      (0, _help.default)();
      break;
    }

}
},{"./commands.js":"commands.js","./unit":"unit.js","./e2e":"e2e.js","./help":"help.js"}]},{},["index.js"], null)