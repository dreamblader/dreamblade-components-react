import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

const config = {
  input: "src/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ exclude: "node_modules/**", presets: ["@babel/preset-react"] }),
    postcss({ plugins: [], minimize: true }),
    resolve(),
    commonjs(),
    external(),
    terser(),
  ],
};

export default [config];
