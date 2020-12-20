const commandLineUsage = require("command-line-usage");

const sections = [
  {
    header: "OTIS",
    content: "An opinionated testing interface system",
  },
  {
    header: "otis test",
    optionList: [
      {
        name: "unit",
        alias: "u",
        typeLabel: "  string",
        description:
          "Runs the jest unit tests looking for any .spec.js or .spec.jsx file",
      },
      {
        name: "e2e",
        alias: "e",
        typeLabel: "   string",
        description:
          "Runs the cypress end to end tests looking for any .e2e.js or .e2e.jsx file",
      },
      {
        name: "watch",
        alias: "w",
        typeLabel: " string",
        description:
          "Used in conjunction with the unit/e2e command to run jest/cypress in watch/open mode",
      },
      {
        name: "showConfig",
        typeLabel: "string",
        description:
          "prints out the extended jest configuration for your tests",
      },
    ],
  },
];
export default () => console.log(commandLineUsage(sections));
