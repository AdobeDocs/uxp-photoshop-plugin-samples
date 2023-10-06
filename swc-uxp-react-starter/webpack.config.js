/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { resolve } from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { aliases } from "@swc-uxp-wrappers/utils";
import webpack from "webpack";

/**
 * === Copy static files configuration
 */
const copyStatics = {
  patterns: [
    {
      from: "manifest.json",
      context: resolve("./"),
      to: resolve("dist"),
    },
  ],
};

const shared = {
  output: {
    path: resolve("dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
    }),
    new CopyWebpackPlugin(copyStatics),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
    // This is required for the spectrum web component to properly work in UXP
    alias: aliases,
  },
};

export default shared;
