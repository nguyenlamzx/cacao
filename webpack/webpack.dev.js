const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: './app/static/',
    hot: true,
    overlay: true,
    // noInfo: true,
    before(app) {
      app.get('/', (req, res) => {
        res.send(fs.readFileSync(path.resolve('./app/index.html'), 'utf-8'));
      });
    },
  }
});