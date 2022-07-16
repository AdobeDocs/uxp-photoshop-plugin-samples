const {
  VueLoaderPlugin
} = require("vue-loader");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: "eval-cheap-module-source-map",
  externals: {
    uxp: "commonjs2 uxp",
    photoshop: "commonjs2 photoshop",
    os: "commonjs2 os",
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin(["plugin"], {
      copyUnmodified: true,
    }),
  ],
};