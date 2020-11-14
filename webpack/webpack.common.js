const __PATH = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    assetModuleFilename: 'assets/[name][ext]'
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true
        }
      },

      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'sass-loader',
            options: {
              // sassOptions: {
              //   precision:    8,
              //   outputStyle:  'nested',
              // }
            }
          }
        ]
      }

    ],
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
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
}