const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const theme = require('./theme')
const tsGraphqlTransformer = require('ts-transform-graphql-tag').getTransformer

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
    /**
     * DO NOT use hash, chunkhash in dev mode, see
     * https://github.com/webpack/webpack-dev-server/issues/377
     * https://github.com/webpack/webpack/issues/2393
     */
    filename: DEV_MODE ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: DEV_MODE ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "graphql", "gql"],
    plugins: [
      new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
    ],
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
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: [
          // see .babelrc and .browserslistrc
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsGraphqlTransformer()
                ],
              }),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // enforce: 'pre',
      },
      {
        test: /\.less$/,
        use: [
          DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          // see postcss.config.js and .browserslistrc
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(gql|graphql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
        enforce: 'pre',
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
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
