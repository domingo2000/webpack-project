const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
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
    ...[isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
  ],
  devtool: "source-map",
  performance: {
    maxAssetSize: 1000000, // 1MB
  },
};
