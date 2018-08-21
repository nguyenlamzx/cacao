const project = require('../project');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({
  title = "Default title",
  filename = 'index.html',
  // template = project.src('views/index.hbs'),
} = {}) => (
  new HtmlWebpackPlugin({
    title,
    filename,
    // template,
    alwaysWriteToDisk: true,
  })
);
