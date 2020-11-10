const __PATH        = require('./paths');
const { merge }     = require('webpack-merge');
const common        = require('./webpack.common.js');
const TerserPlugin  = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode:     'production',
  devtool:  'source-map',

  output: {
    path:           __PATH.build,
    publicPath:     '/',
    filename:       '[name].umd.js',
    library:        '[name]',
    libraryTarget:  'umd',
  },

  optimization: {
    minimize:   false,
    // minimizer:  [ new TerserPlugin() ],
  },
})
