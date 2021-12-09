var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./app/scripts/main.js"],
  output: {
    publicPath: "/",
    filename: "index_bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "app/index.html",
    }),
  ],
};
