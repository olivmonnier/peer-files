const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = process.envPORT || 3000;

const APP_DIR = path.resolve(__dirname, 'src/js');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const VENDOR_LIBS = [
  'react', 'react-dom', 'blob-util', 'bluebird', 'lodash', 'pako', 'reflux', 'jquery', 'semantic-ui-css'
]

module.exports = {
  entry: {
    bundle: APP_DIR + '/main.js',
    vendor: VENDOR_LIBS
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }))
      },
      {
        test: /\.(eot|png|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new htmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'style.[contenthash:8].css',
    }),
  ],
  devServer: {
    inline: true,
    stats: 'minimal',
    open: true, // open default browser while launching
    contentBase: './src/',
    historyApiFallback: true, // means the index.html page will likely have to be served in place of any 404 responses. Fallback for SPAs.
    port: port
  }
};