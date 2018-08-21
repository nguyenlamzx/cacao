const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const pkg = require('./package');

let project = {
  dev,
  root: () => __dirname,
  src: (pathString = '.') => {
    return path.resolve(
      pkg.directories.source, pathString
    );
  },
  dist: (pathString = '.') => {
    return path.resolve(
      pkg.directories.dist, pathString
    );
  },
  static: (pathString = '.') => {
    return path.resolve(
      pkg.directories.static, pathString
    );
  },
  context: require('require-context'),
};

module.exports = project;
