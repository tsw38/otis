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
exports.unitTestWatch = exports.unitTest = exports.test = void 0;

const argv = require("minimist")(process.argv.slice(2));

const availableArgs = {
  test: "test"
};
const availableOptions = {
  e2e: ["-e", "--e2e"],
  unit: ["-u", "--unit"],
  watch: ["-w", "--watch"]
};

const findMatchingOption = option => argv[option.replace(/\-/g, "")];

const test = argv._.includes(availableArgs.test);

exports.test = test;
const runE2E = availableOptions.e2e.some(findMatchingOption);
const runUnit = availableOptions.unit.some(findMatchingOption);
const runWatch = availableOptions.watch.some(findMatchingOption);
const unitTest = test && runUnit && !runWatch;
exports.unitTest = unitTest;
const unitTestWatch = test && runUnit && runWatch;
exports.unitTestWatch = unitTestWatch;
},{}],"../../jest.config.json":[function(require,module,exports) {
module.exports = {
  "clearMocks": true,
  "resetMocks": true,
  "moduleDirectories": ["node_modules", "<rootDir>/src", "<rootDir>/src/js", "<rootDir>/__test__", "<rootDir"],
  "moduleFileExtensions": ["js", "jsx", "json"],
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
},{}],"get-jest-config.js":[function(require,module,exports) {
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

var _getJestConfig = require("./get-jest-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = require("fs");

const merge = require("deepmerge");

const clone = require("clone-deep");

/**
 * writes a merge jest config into temporary scratch
 * @returns void
 */
const mergeJestConfigs = () => {
  const jestConfig = (0, _getJestConfig.getJestConfig)();
  const isPackageJson = jestConfig.includes("package.json");

  if (fs.existsSync(jestConfig)) {
    const projectConfig = JSON.parse(fs.readFileSync(jestConfig, "utf-8"));
    const mergedConfigs = merge(_jestConfig.default, { ...clone(isPackageJson ? projectConfig.jest : projectConfig),
      rootDir: process.env.PWD
    });
    fs.writeFileSync(`${process.env.TMPDIR}/jest.config.json`, JSON.stringify(mergedConfigs), "utf-8");
  }
};

exports.mergeJestConfigs = mergeJestConfigs;
},{"../../jest.config.json":"../../jest.config.json","./get-jest-config":"get-jest-config.js"}],"unit.js":[function(require,module,exports) {
const {
  fork
} = require("child_process");

const log = require("@tsw38/custom-logger");

const {
  mergeJestConfigs
} = require("./merge-jest-configs");

const Log = new log({
  header: "Otis - Unit Tests"
}).log;

const buildFork = watching => new Promise(resolve => {
  resolve(mergeJestConfigs());
}).then(() => fork("node_modules/.bin/jest", [watching ? "--watch" : "--coverage", `--config=${process.env.TMPDIR}jest.config.json`], {
  env: { ...process.env,
    NODE_ENV: "test",
    JEST_TEST: true,
    ...(watching ? {
      DEBUG_PRINT_LIMIT: -1
    } : {})
  }
}));

const runUnitTests = () => {
  Log("Running Unit Tests");
  buildFork();
};

const runUnitTestsWatch = () => {
  Log("Watching Unit Tests");
  buildFork(true);
};

module.exports = {
  runUnitTests,
  runUnitTestsWatch
};
},{"./merge-jest-configs":"merge-jest-configs.js"}],"index.js":[function(require,module,exports) {

"use strict";

var _commands = require("./commands.js");

var _unit = require("./unit");

if (_commands.unitTest) {
  (0, _unit.runUnitTests)();
}

if (_commands.unitTestWatch) {
  (0, _unit.runUnitTestsWatch)();
}
},{"./commands.js":"commands.js","./unit":"unit.js"}]},{},["index.js"], null)