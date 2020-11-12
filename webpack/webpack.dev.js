const __PATH    = require('./paths');
const { merge } = require('webpack-merge');
const common    = require('./webpack.common.js');

module.exports = merge(common, {
  mode:     'development',
  devtool:  'source-map',

  entry: {
    Modal: __PATH.src + '/index.dev.ts',
  },

  output: {
    path:           __PATH.dev,
    publicPath:     '/',
    filename:       '[name].dev.js',
    chunkFilename:  'js/chunks/[name]-[id].js',
  }
})
