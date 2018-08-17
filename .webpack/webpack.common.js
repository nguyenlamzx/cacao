const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const project = require('../project');

module.exports = {
  entry: {
    polyfills: project.src('polyfills.js'),
    app: project.src('app.js'),
  },
  plugins: [
    new CleanWebpackPlugin([
      project.dist()
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast 
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    
    // Friendly webpack errors
    new FriendlyErrorsWebpackPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: project.dist(),
    publicPath: './',
  },
  resolve: {
    extensions: ['.hbs', '.html', '.ts', '.js', '.yaml', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.js$/,
        include: project.src(),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          project.dev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
              implementation: require('node-sass'),
              fiber: require('fibers'),
            }
          },
        ],
      },
    ],
  },
};