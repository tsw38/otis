import path from "path";
import pkg from "../package.json";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import executable from "rollup-plugin-executable";
import resolve from "@rollup/plugin-node-resolve";
import shebang from "rollup-plugin-preserve-shebang";
import external from "rollup-plugin-peer-deps-external";

const extensions = [".json", ".jsx", ".js", ".ts", ".tsx"];

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
    executable(),
    json(),
    alias({
      resolve: extensions,
      entries: {
        cli: path.resolve(CWD, "./src/cli"),
      },
    }),
    babel({
      ...pkg.babel,
      babelHelpers: "inline",
      exclude: "node_modules/**",
      plugins: ["@babel/plugin-proposal-class-properties"],
    }),
    external(),
    resolve({
      extensions,
      dedupe: [pkg.name],
      // preferBuiltins: false,
    }),
    commonjs({
      extensions,
    }),
    terser(),
  ],
};
