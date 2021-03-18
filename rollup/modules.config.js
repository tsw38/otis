import fs from "fs";
import pkg from "../package.json";

import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import visualizer from "rollup-plugin-visualizer";
import external from "rollup-plugin-peer-deps-external";

import updateGitIgnore from "./scripts/update-gitignore";

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

const modulesPath = `${CWD}/src/modules`;

const fileNames = fs.readdirSync(modulesPath);
updateGitIgnore(fileNames);

const files = fileNames.map((file) => {
  return {
    onwarn: handleConsoles,
    input: `${modulesPath}/${file}`,
    output: {
      format: "cjs",
      sourcemap: true,
      exports: "auto",
      file: `${CWD}/${file}`,
    },
    plugins: [
      alias({
        resolve: extensions,
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
        preferBuiltins: false,
      }),
      commonjs({
        extensions,
      }),
      process.env.NODE_ENV !== "development" && terser(),
      visualizer({
        gzipSize: true,
        filename: `rollup/stats/${file.split(".")[0]}/index.html`,
        title: `${file.split(".")[0].toUpperCase()} Rollup Visualizer`,
      }),
    ],
  };
});

export default files;
