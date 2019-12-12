const { isDEV, resolve, envVars } = require('./utils');
const webpack = require('webpack');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const baseConfig = {
  context: resolve(''),
  entry: {
    test: resolve('src/index.tsx'),
  },
  output: {
    path: resolve('dist'),
    library: 'test',
    libraryTarget: 'umd',
    auxiliaryComment: 'test',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // filename: isDEV ? '[name].js' : '[name].[chunkhash].js',
    // chunkFilename: isDEV ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     /*configFile: "./path/to/tsconfig.json" */
    //   }),
    // ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.EnvironmentPlugin(envVars),
  ],
};

module.exports = baseConfig;


