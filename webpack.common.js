const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DEV_MODE = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
    another: path.resolve(__dirname, 'src/another-module.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: DEV_MODE ? '[name].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack demo',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: DEV_MODE ? '[name].css' : '[name].[hash].css',
      chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css',
    })
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
}

module.exports = config
