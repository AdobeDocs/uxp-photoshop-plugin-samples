const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
  entry: ['babel-polyfill', './js/index.js'],
  devtool: false,
  resolve: {
    extensions: ['.mjs', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: {
    uxp: 'commonjs2 uxp',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      TextDecoder: ['text-encoding', 'TextDecoder'],
      TextEncoder: ['text-encoding', 'TextEncoder'],
    }),

    new CopyPlugin({
      patterns: ['plugin'],
    }),

    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '.'),
      outName: 'uxp_wasm',
      extraArgs: '--target web',
    }),

    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['npm run inlinewasm'],
        blocking: true,
        parallel: false,
      },
    }),
  ],
};
