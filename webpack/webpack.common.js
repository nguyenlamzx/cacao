const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    polyfills: './app/polyfills.js',
    app: './app/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     config: {
          //       path: './webpack/',
          //     },
          //   },
          // },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("node-sass"),
              fiber: require('fibers'),
            }
          },
        ],
      },
    ]
  },
};