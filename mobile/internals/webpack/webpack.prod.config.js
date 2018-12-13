const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const featurePath = require("./webpack.paths");
const branch = require('git-branch');

module.exports = (pageName) => {
  return {
    entry: {
      [pageName]: featurePath[pageName]
    },
    output: {
      filename: '[name]/[name].js',
      chunkFilename: pageName + '/[name].OD[chunkhash].chunk.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        },
        sourceMap: false
      }),
      new ExtractTextPlugin({
        filename: '[name]/common.css',
        allChunks: true,
      }),
      new OptimizeCssAssetsPlugin(),
      new webpack.BannerPlugin('© 2017 Verizon Wireless - Build ' + new Date() +
        '\tBranch: ' + branch.sync()),
      new webpack.optimize.OccurrenceOrderPlugin(true),
    ],
    devtool: 'source-map'
  }
};
