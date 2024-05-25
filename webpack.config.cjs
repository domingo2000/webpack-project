const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
          jsx: "automatic",
        },
      },
      {
        test: /\.txt|html$/,
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".txt", ".tsx"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devtool: "source-map",
  performance: {
    maxAssetSize: 1000000, // 1MB
  },
};
