const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	entry: {
		'public-favorite-share': path.join(__dirname, 'src', 'publicFavoriteShare.js'),
	},
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /src\/.*\.(js|vue)$/,
				enforce: 'pre',
				loader: 'eslint-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'@babel/plugin-syntax-dynamic-import',
							'@babel/plugin-proposal-object-rest-spread',
						],
						presets: ['@babel/preset-env'],
					},
				},
				exclude: /node_modules\/(?!(p-limit|p-defer|p-queue|p-try|cdav-library))/,
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '../img',
					publicPath: '/apps/maps/img/',
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			$appVersion: JSON.stringify(require('./package.json').version),
		}),
		new StyleLintPlugin({
			files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
		}),
	],
	resolve: {
		extensions: ['*', '.js', '.vue', '.json'],
	},
}
