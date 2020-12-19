const { rest } = require("msw");
const { setupServer } = require("msw/node");
const userEvent = require("@testing-library/user-event");
const testDataBot = require("@jackfranklin/test-data-bot");
const { LocalStorageMock } = require("@react-mock/localstorage");
const { render, screen, waitFor } = require("@testing-library/react");

module.exports = {
  rest,
  render,
  screen,
  waitFor,
  userEvent,
  setupServer,
  ...testDataBot,
  LocalStorageMock,
};
