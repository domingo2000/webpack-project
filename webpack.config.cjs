const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const FaviconWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const WorkboxPlugin = require("workbox-webpack-plugin");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js|ts|tsx|jsx$/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015",
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.scss|css$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: isDevelopment ? "expanded" : "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
    new HTMLWebpackPlugin({
      title: "Vue 3 + React + TypeScript + SCSS + Webpack 5 + PWA",
      template: "./public/index.html",
    }),
    new FaviconWebpackPlugin({
      logo: "./public/logo.png",
      logoMaskable: "./public/maskable-icon.png",
      inject: true,
      favicons: {
        appName: "WebpackApp",
        appDescription: "Vue 3 + React + TypeScript + SCSS + Webpack 5 + PWA",
        start_url: "/webpack-project/",
      },
    }),
    ...[
      !isDevelopment &&
        new WorkboxPlugin.GenerateSW({
          // these options encourage the ServiceWorkers to get in there fast
          // and not allow any straggling "old" SWs to hang around
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: new RegExp("https://jsonplaceholder.typicode.com"),
              handler: "NetworkFirst",
            },
          ],
        }),
    ].filter(Boolean),
    ...[isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
    ...[!isDevelopment && new MiniCssExtractPlugin()].filter(Boolean),
    new VueLoaderPlugin(),
    ...[!isDevelopment && new CompressionPlugin()].filter(Boolean),
  ],
  devtool: "source-map",
};
