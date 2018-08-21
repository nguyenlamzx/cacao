const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require('../project');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new NpmInstallPlugin(),
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    publicPath: '/',
    contentBase: project.static(),
    hot: true,
    inline: true,
    overlay: true,
    // noInfo: true,
    before(app) {
      app.get('/', (req, res) => {
        // res.render(project.src('views/index.html'));
        res.send(fs.readFileSync(project.src('index.html'), 'utf-8'));
      });
    },
  },
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json')
});
