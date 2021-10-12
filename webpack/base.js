const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const { CleanWebpackPlugin }  = require("clean-webpack-plugin");

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  watch: true,
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run copy', 'npm run start:server']
    }),
  ],
};
