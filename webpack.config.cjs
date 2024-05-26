const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
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
            ],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
              ["@babel/plugin-transform-typescript", { isTSX: true }],
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader"],
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
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
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    ...[isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
    new VueLoaderPlugin(),
  ],
  devtool: "source-map",
  performance: {
    maxAssetSize: 1000000, // 1MB
  },
};
