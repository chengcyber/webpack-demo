const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

const config = merge(commonConfig, {
  mode: 'development',
  // might use bundle-buddy to analyze duplicate
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: 8000,
    hot: true,
    proxy: {
      // {
      //   context: [
      //     '/',
      //     '/foo',
      //   ],
      //   target: 'http://localhost:3000',
      // },
      '**': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})

module.exports = config
