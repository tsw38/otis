const { execSync } = require("child_process");
const { log } = require("@tsw38/custom-logger");

const { mergeCypressConfigs } = require("./merge-cypress-configs");

const { PWD } = process.env;

const binPath = `${PWD}/node_modules/@tsw38/otis/node_modules/.bin`;

const cypressPath = `${binPath}/cypress`;
const concurrentlyPath = `${binPath}/concurrently`;

const isLocalServer = ({ baseUrl }) => /local(host)?\:\d{4,}/.test(baseUrl);

const configToString = (config) =>
  Object.entries(config)
    .map(([key, value]) => {
      return `${key}=${JSON.stringify(value)}`;
    })
    .join(",");

const buildFork = (watching) =>
  mergeCypressConfigs().then((config) => {
    const localServer = isLocalServer(config);

    const cypressArgs = `"${cypressPath} ${
      watching ? "open" : "run"
    } -c${configToString(config)}"`;

    const arguments = [
      ...(localServer
        ? [
            concurrentlyPath,
            '"npm start"',
            cypressArgs,
            "--success first --kill-others",
          ]
        : [cypressArgs]),
    ];

    execSync(arguments.join(" "));
  });

const runE2ETests = () => {
  log("Running E2E Tests", {
    header: "Otis - E2E Tests",
  });
  buildFork();
};

const runE2ETestsWatch = () => {
  log("Watching E2E Tests", {
    header: "Otis - E2E Tests",
  });
  buildFork(true);
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
