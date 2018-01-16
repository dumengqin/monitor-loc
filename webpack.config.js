var webpack = require('webpack')
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
//	devtool: "source-map",
	entry: './app/main.js',
	output: {
		path: __dirname + '/build',
		filename: 'build.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style', 'css!less')
		},{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}, {
                test: /\.(ttf|svg|eot|woff|woff2|jpg|png|gif)/,
                loader: "url-loader"
            }]
	},
	devServer: {
		contentBase: './build'
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	externals: {
		'bmapapi': "'//api.map.baidu.com/api?v=2.0&ak=6cc7e56171c009dfd378f63ba0f35f1e'"
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: "jquery",
			"window.jQuery": "jquery",
			IScroll: "iscroll"
		}),
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
	]
}