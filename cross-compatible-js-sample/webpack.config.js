const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const JsonPostProcessPlugin = require("json-post-process-webpack-plugin");
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
      photoshop: "commonjs2 photoshop",
      application: "commonjs2 application",
      scenegraph: "commonjs2 scenegraph"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
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
      }),
      new JsonPostProcessPlugin({
        matchers: [{
          matcher: /^manifest.json$/,
          action: manifest => {
            if (Array.isArray(manifest.host)) {
              const host = manifest.host.find(host => host.app === env.mode);

              if (host) {
                manifest.host = host;
              }
            }

            return manifest;
          }
        }]
      })
    ],
    watchOptions: {
      ignored: /node_modules/
    },
  };
};
