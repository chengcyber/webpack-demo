const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const DEV_MODE = process.env.NODE_ENV !== 'production'
const BUNDLE_ANALYZER = process.env.BUNDLE_ANALYZER === '1'

const bundleAnalyzerConfig = {
  analyzerMode: BUNDLE_ANALYZER ? 'server' : 'disabled',
}

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
      template: 'src/index.html',
      templateParameters: {
        title: 'Webpack Demo',
      },
    }),
    new webpack.DefinePlugin({
      SOME_PARAM: JSON.stringify('foo'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: DEV_MODE ? '[name].css' : '[name].[hash].css',
      chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css',
    })
    new BundleAnalyzerPlugin(bundleAnalyzerConfig),
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
