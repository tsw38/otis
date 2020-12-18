const render = require("./render.js");
const server = require("./server.js");
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
  ...render,
  server,
  jestChain,
  presetEnv,
  mapToString,
  globalSetup,
  presetReact,
  jestDateMock,
  jestExtended,
  rtlExtendExpect,
  thresholdRatchet,
  identityObjProxy,
  pluginTransformReactJSX,
};
