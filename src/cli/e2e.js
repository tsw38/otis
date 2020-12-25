const fs = require("fs");
const glob = require("glob");
const { fork } = require("child_process");
const { log } = require("@tsw38/custom-logger");
const argv = require("minimist")(process.argv.slice(2));

const { mergeCypressConfigs } = require("./merge-cypress-configs");

const { PWD } = process.env;

const binPath = `${PWD}/node_modules/@tsw38/otis/node_modules/.bin`;
const cypressPath = `${binPath}/cypress`;
const ssatPath = `./node_modules/@tsw38/otis/node_modules/.bin/start-server-and-test`;

const isLocalServer = ({ baseUrl }) => /local.+\:\d{4,}/.test(baseUrl);

const configToString = (config) =>
  Object.entries(config)
    .map(([key, value]) => {
      return `-c${key}=${JSON.stringify(value)}`;
    })
    .join(" ");

const buildFork = async (watching) => {
  const config = await mergeCypressConfigs();
  let runE2ETests = false;

  if (config.testFiles) {
    runE2ETests = Boolean(glob.sync(`${PWD}/${config.testFiles}`).length);
  } else {
    runE2ETests = Boolean(
      fs.readdirSync(`${PWD}/${config.integrationFolder}`).length
    );
  }

  if (!runE2ETests) {
    log(
      `No E2E tests found ${
        Boolean(config.testFiles)
          ? `with pattern: ${config.testFiles}`
          : `in directory: ${PWD}/${config.integrationFolder}`
      }`,
      {
        header: "Otis - E2E Tests",
      }
    );
    return;
  }

  const localServer = isLocalServer(config);
  const mode = watching ? "open" : "run";
  const cypressConfig = `${configToString(config)}`;

  let childProcess;

  if (localServer) {
    childProcess = fork(ssatPath, [
      argv["start-command"] || "start",
      (config.baseUrl || "").split(":")[2] || 3000,
      `${cypressPath} ${mode} ${cypressConfig}`,
    ]);
  } else {
    childProcess = fork(cypressPath, [mode, cypressConfig]);
  }
  return new Promise((resolve, reject) => {
    childProcess.on("exit", (code) => {
      if (code === 1) {
        reject();
      } else {
        log("E2E Tests Passed", {
          type: "success",
          header: "Otis - E2E Tests",
        });
        resolve();
      }
    });
  }).catch((err) => {
    log("E2E Tests Failed", {
      type: "error",
      header: "Otis - E2E Tests",
    });
  });
};

const runE2ETests = async () => {
  log("Running E2E Tests", {
    header: "Otis - E2E Tests",
  });
  await buildFork();
};

const runE2ETestsWatch = async () => {
  log("Watching E2E Tests", {
    header: "Otis - E2E Tests",
  });
  await buildFork(true);
};

const showCypressConfig = () => {
  mergeCypressConfigs().then(({ config }) => {
    log(JSON.stringify(config, null, 2), {
      header: "Otis",
    });
  });
};

module.exports = {
  runE2ETests,
  runE2ETestsWatch,
  showCypressConfig,
};
