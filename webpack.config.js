const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
    library: "MyLibrary",
    globalObject: "this",
    library: {
      name: "MyLibrary",
      type: "umd",
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      }
    ],
  },
  resolve : {
    extensions: [".ts", ".js", ".txt"],
  },
  devtool: "source-map",
};
