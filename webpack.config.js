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
		filename: ['./app.js', './scss/index.scss']
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
					loader: "babel-loader"
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
			// {
			// 	test: /\.(scss|css)$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		{
			// 			loader: "css-loader",
			// 			options: {
			// 				minimize: {
			// 					safe: true
			// 				}
			// 			}
			// 		},
			// 		{
			// 			loader: "postcss-loader",
			// 			options: {
			// 				autoprefixer: {
			// 					browsers: ["last 2 versions"]
			// 				},
			// 				plugins: () => [
			// 					autoprefixer
			// 				]
			// 			},
			// 		},
			// 		{
			// 			loader: "sass-loader",
			// 			options: {}
			// 		}
			// 	]
			// },
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebPackPlugin({
			template: "./index.html",
			filename: "./index.html"
		}),
		new ExtractTextPlugin('style.css')
		// new MiniCssExtractPlugin({
		// 	// Options similar to the same options in webpackOptions.output
		// 	// both options are optional
		// 	filename: "[name].css",
		// 	chunkFilename: "[id].css"
		//   })
	]
};