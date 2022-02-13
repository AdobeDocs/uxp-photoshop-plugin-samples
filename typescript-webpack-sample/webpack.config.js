const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
        photoshop: 'commonjs2 photoshop',
        uxp: 'commonjs2 uxp',
        os: 'commonjs2 os',
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
