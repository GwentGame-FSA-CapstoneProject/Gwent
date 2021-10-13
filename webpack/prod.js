const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports = merge(base, {
  mode: "production",
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run copy']
    }),
  ],
});
