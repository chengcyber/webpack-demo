const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

const config = merge.smart(commonConfig, {
  mode: 'production',
  plugins: [
  ],
})

module.exports = config
