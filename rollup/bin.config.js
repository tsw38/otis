import pkg from "../package.json";
import babel from "rollup-plugin-babel";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import shebang from "rollup-plugin-preserve-shebang";
import external from "rollup-plugin-peer-deps-external";

const extensions = [".jsx", ".js", ".ts", ".tsx", ".json"];

const handleConsoles = (warning, log) => {
  const ignoreCodeList = [
    "CIRCULAR_DEPENDENCY",
    "NAMESPACE_CONFLICT",
    "UNRESOLVED_IMPORT",
  ];

  if (!ignoreCodeList.includes(warning.code)) {
    log(warning);
  }
};

const CWD = process.cwd();

export default {
  onwarn: handleConsoles,
  input: `${CWD}/src/cli/index.js`,
  output: {
    format: "cjs",
    sourcemap: true,
    exports: "auto",
    file: `${CWD}/bin/index.js`,
  },
  plugins: [
    shebang(),
    alias({
      resolve: extensions,
    }),
    babel({
      ...pkg.babel,
      runtimeHelpers: true,
      exclude: "node_modules/**",
      plugins: ["@babel/plugin-proposal-class-properties"],
    }),
    external(),
    resolve({
      extensions,
      dedupe: [pkg.name],
      preferBuiltins: false,
    }),
    commonjs({
      extensions,
      namedExports: {
        "node_modules/lz-string/libs/lz-string.js": [
          "compressToEncodedURIComponent",
        ],
        "node_modules/jest-date-mock/lib/index.js": [
          "advanceTo",
          "advanceBy",
          "clear",
        ],
      },
    }),
    terser(),
  ],
};
