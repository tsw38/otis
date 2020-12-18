const render = require("./render.js");
const server = require("./server.js");
const presetEnv = require("./preset-env.js");
const mapToString = require("./map-to-string.js");
const presetReact = require("./preset-react.js");
const extendExpect = require("./extend-expect.js");
const thresholdRatchet = require("./threshold-ratchet.js");
const pluginTransformReactJSX = require("./plugin-transform-react-jsx.js");

module.exports = {
  ...render,
  server,
  presetEnv,
  mapToString,
  presetReact,
  extendExpect,
  thresholdRatchet,
  pluginTransformReactJSX,
};
