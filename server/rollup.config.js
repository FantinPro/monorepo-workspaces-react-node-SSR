import run from "@rollup/plugin-run";
import babel from "@rollup/plugin-babel";
import {external} from "@aminnairi/rollup-plugin-external";
import {terser} from "rollup-plugin-terser";

export default {
  input: "index.jsx",
  plugins: [
    external(),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-react"
      ]
    }),
    process.env.NODE_ENV === "development" && run(),
    process.env.NODE_ENV === "production" && terser()
  ],
  output: {
    file: "../build/server/index.js",
    format: "esm"
  }
}
