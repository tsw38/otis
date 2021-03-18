const commandLineUsage = require("command-line-usage");

const sections = [
  {
    header: "OTIS",
    content: "An opinionated testing interface system",
  },
  {
    header: "Available Commands",
    content: [
      { name: "test", summary: "Runs the testing suite" },
      {
        name: "--help",
        summary: "Seems a bit self explanatory",
      },
    ].map(({ name, summary }) => ({
      name,
      summary,
    })),
  },
  {
    header: "Command: 'otis test'",
    optionList: [
      {
        name: "unit",
        alias: "u",
        typeLabel: "    bool",
        description:
          "Runs the jest unit tests looking for any .spec.js or .spec.jsx file",
      },
      {
        name: "e2e",
        alias: "e",
        typeLabel: "     bool",
        description:
          "Runs the cypress end to end tests looking for any .e2e.js or .e2e.jsx file",
      },
      {
        name: "watch",
        alias: "w",
        typeLabel: "   bool",
        description:
          "Used in conjunction with the unit/e2e command to run jest/cypress in watch/open mode",
      },
      {
        name: "start-command",
        typeLabel: "string",
        description:
          "(optional) flag to pass a custom start command other than your projects `npm start` for running E2E tests against",
      },
    ],
  },
  {
    header: "Command: 'otis -u'",
    optionList: [
      {
        name: "only-related",
        alias: "r",
        typeLabel: "bool",
        description:
          "Finds and runs only the related tests for the code changes",
      },
    ],
  },
  {
    header: "Command: 'otis (-u | -e)'",
    optionList: [
      {
        name: "config",
        typeLabel: "bool",
        description:
          "Prints the extended jest/cypress configuration for your tests",
      },
    ],
  },
];

const help = () => console.log(commandLineUsage(sections));

module.exports = {
  help,
};
