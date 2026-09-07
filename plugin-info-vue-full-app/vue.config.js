const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: ["plugin"]
      })
    ]
  },
  chainWebpack: config => {
    config.externals({
      ...config.get("externals"),
      uxp: "commonjs2 uxp",
      os: "commonjs2 os"
    });
  }
};
