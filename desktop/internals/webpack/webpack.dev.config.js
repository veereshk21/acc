// Important modules this config uses

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const featurePath = require("./webpack.paths");

module.exports = function (pageName) {
  return {
    entry:{
      [pageName]: featurePath[pageName]
    },
    output: {
      filename: '[name]/[name].js',
      chunkFilename: pageName+'/[name].OD[chunkhash].chunk.js'
    },
    plugins: [
      //new webpack.optimize.LimitChunkCountPlugin({maxChunks:1}),
      //new webpack.optimize.CommonsChunkPlugin({minChunks:1, children: true}),
      new ExtractTextPlugin({
        filename: "[name]/common.css",
        allChunks: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ],
    devtool: 'source-map'
  };
};
