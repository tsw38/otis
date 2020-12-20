const { rest } = require("msw");
const { setupServer } = require("msw/node");
const testDataBot = require("@jackfranklin/test-data-bot");
const userEvent = require("@testing-library/user-event").default;
const {
  advanceTo,
  advanceBy,
  clear: clearDateMock,
} = require("jest-date-mock");
const { LocalStorageMock } = require("@react-mock/localstorage");
const { render, screen, waitFor, cleanup } = require("@testing-library/react");

module.exports = {
  rest,
  render,
  screen,
  cleanup,
  waitFor,
  userEvent,
  setupServer,
  testDataBot,
  LocalStorageMock,
  advanceTo,
  advanceBy,
  clearDateMock,
};
