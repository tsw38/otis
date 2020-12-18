const { rest } = require("msw");
const { setupServer } = require("msw/node");
const userEvent = require("@testing-library/user-event");
const testDataBot = require("@jackfranklin/test-data-bot");
const { render, screen, waitFor } = require("@testing-library/react");

const jestChain = require("./jest-chain.js");
const presetEnv = require("./preset-env.js");
const globalSetup = require("./global-setup.js");
const presetReact = require("./preset-react.js");
const mapToString = require("./map-to-string.js");
const jestExtended = require("./jest-extended.js");
const jestDateMock = require("./jest-date-mock.js");
const rtlExtendExpect = require("./rtl-extend-expect.js");
const thresholdRatchet = require("./threshold-ratchet.js");
const identityObjProxy = require("./identity-obj-proxy.js");
const pluginTransformReactJSX = require("./plugin-transform-react-jsx.js");

module.exports = {
  rest,
  render,
  screen,
  waitFor,
  userEvent,
  jestChain,
  presetEnv,
  setupServer,
  mapToString,
  globalSetup,
  presetReact,
  jestDateMock,
  jestExtended,
  ...testDataBot,
  rtlExtendExpect,
  thresholdRatchet,
  identityObjProxy,
  pluginTransformReactJSX,
};
