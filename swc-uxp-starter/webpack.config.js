/**************************************************************************
 *  ADOBE CONFIDENTIAL
 *
 *  Copyright 2023 Adobe
 *  All Rights Reserved.
 *
 *  NOTICE:  All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 *  Dissemination of this information or reproduction of this material
 *  is strictly forbidden unless prior written permission is obtained
 *  from Adobe.
 ***************************************************************************/

'use strict';

import { join, resolve } from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';
import { aliases } from "@swc-uxp-wrappers/utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ENV = process.argv.find((arg) => arg.includes('NODE_ENV=production'))
    ? 'production'
    : 'development';
const IS_DEV = ENV === 'development';

const IS_DEV_SERVER = process.argv.find((arg) =>
    arg.includes('webpack-dev-server')
);
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('dist') : resolve('dist');

/**
 * === Copy static files configuration
 */
const copyStatics = {
    patterns: [
        {
            from: 'index.html',
            context: resolve('./src'),
            to: OUTPUT_PATH,
        },
        {
            from: 'manifest.json',
            context: resolve('./'),
            to: OUTPUT_PATH,
        },
    ],
};

/**
 * Plugin configuration
 */
const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(copyStatics),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
];

function srcPath(subdir) {
    return join(__dirname, 'src', subdir);
}

const shared = (env) => {
    if (!IS_DEV_SERVER) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: '../report/report.html',
                statsFilename: '../report/stats.json',
                generateStatsFile: true,
                statsOptions: {
                    chunkModules: true,
                    children: false,
                    source: false,
                },
            })
        );
    }

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: { importLoaders: 1 },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: (loader) => [
                        require('postcss-import')({
                            root: loader.resourcePath,
                        }),
                        require('postcss-preset-env')({
                            browsers: 'last 2 versions',
                        }),
                        ...(IS_DEV ? [] : [require('cssnano')()]),
                    ],
                },
            },
        },
    ];

    return {
        entry: {
            index: './src/index.js',
        },
        devtool: 'cheap-module-source-map',
        mode: ENV,
        output: {
            path: OUTPUT_PATH,
            filename: '[name].js',
            publicPath: '',
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, ...cssLoaders],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json'],
            alias: aliases,
        },
        plugins,
        devServer: {
            compress: true,
            port: 3000,
            host: '0.0.0.0',
        },
    };
};

export default (env = {}) => {
    return [shared(env)];
};
