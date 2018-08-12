const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // new ExtractTextPlugin('styles.css'),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: { removeAll: true } },
    //   canPrint: true
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
  })
  ],
});