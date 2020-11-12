const __PATH    = require('./paths');
const { merge } = require('webpack-merge');
const common    = require('./webpack.common.js');
const RemovePlugin = require('remove-files-webpack-plugin');


module.exports = {
  mode:     'production',
  // devtool:  'source-map',
  devtool:  false,

  entry: {
    css: __PATH.src + '/index.css.ts'
  },

  output: {
    path:           __PATH.dev,
    publicPath:     '/',
    filename:       '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              // context: './',
              outputPath: 'themes',
              // publicPath: __PATH.build + '/themes'
            }
          }, {
            loader: 'extract-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders:  1,
              sourceMap:      true,
            }
          }, {
            loader: 'sass-loader',
          }
        ]
      }

    ]
  },

  plugins: [
    new RemovePlugin({
      before: {
        // parameters for "before normal compilation" stage.
      },
      watch: {
        // parameters for "before watch compilation" stage.
      },
      after: {
        // parameters for "after normal and watch compilation" stage.
        include: [
          // __PATH.dev + '/css.js',
          // __PATH.dev + '/css.js.map',
        ]
      }
    })
  ],

  experiments: {
    asset: true,
  },


  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },


  resolve: {
    extensions: ['.ts', '.js', '.scss', '.json']
  }
};