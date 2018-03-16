const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const dist = path.join(__dirname, "dist");

module.exports = {
	mode: 'development',
	entry: {
		filename: ['./src/app.js', './src/scss/index.scss']
	},
	output: {
		path: dist,
		filename: 'app.bundle.js'
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}

			},
			{
				test: /\.html$/,
				use: [{
					loader: "html-loader",
					options: {
						minimize: true
					}
				}]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./src/index.html"
		}),
		new ExtractTextPlugin('style.css')
	]
};