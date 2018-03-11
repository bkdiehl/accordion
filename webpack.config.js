// const webpack = require('webpack');
// const nodeEnv = process.env.NODE_ENV || 'production';
// const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
// const path = require('path');

// const dist = path.join(__dirname, "dist");

// module.exports = {
//     devtool: 'source-map',
//     mode: 'production',
//     entry: {
//         filename: './app.js'
//     },
//     output: {
//         path: dist,
//         filename: 'app.bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//             }
//         ]
//     },
//     plugins: [
//         //uglify js
//         new webpackUglifyJsPlugin({
//             cacheFolder: dist,
//             debug: true,
//             minimize: true,
//             sourceMap: true,
//             output: {
//                 comments:false
//             },
//             compressor: {
//                 warnings:false
//             }
//         }),
//         //env plugin
//         // new webpack.DefinePlugin({
//         //     'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
//         // })
//     ]
// }

const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const dist = path.join(__dirname, "dist");

module.exports = {
    entry: {
        filename: './app.js'
    },
    output: {
        path: dist,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ]
};