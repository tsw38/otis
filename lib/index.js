const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { build, fake } = require("@jackfranklin/test-data-bot");
const userEvent = require("@testing-library/user-event").default;
const {
  advanceTo,
  advanceBy,
  clear: clearDateMock,
} = require("jest-date-mock");
const { LocalStorageMock } = require("@react-mock/localstorage");
const {
  act,
  render,
  screen,
  waitFor,
  cleanup,
} = require("@testing-library/react");

module.exports = {
  act,
  rest,
  fake,
  render,
  screen,
  cleanup,
  waitFor,
  userEvent,
  advanceTo,
  advanceBy,
  setupServer,
  clearDateMock,
  LocalStorageMock,
  buildFakeModel: build,
};
