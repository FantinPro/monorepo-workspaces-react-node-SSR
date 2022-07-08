import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import remove from "rollup-plugin-delete";

export default {
  input: "index.jsx",
  plugins: [
    remove({
      force: true,
      targets: [
        "../build/client/**/*"
      ]
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-react"
      ]
    }),
    commonjs()
  ],
  output: {
    file: "../build/client/index.js",
    format: "esm"
  }
}
