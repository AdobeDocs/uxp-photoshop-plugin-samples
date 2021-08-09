const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  return {
    entry: "./src/index.js",
    resolve: {
      extensions: [".js"]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js"
    },
    devtool: false,
    externals: {
      uxp: "commonjs2 uxp",
      photoshop: "commonjs2 photoshop"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new CopyPlugin({
        patterns: ["plugin"]
      })
    ],
    watchOptions: {
      ignored: /node_modules/
    },
  };
};
