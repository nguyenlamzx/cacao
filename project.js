const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const package = require('./package');

let project = {
  dev,
  src: (pathString = __dirname) => {
    return path.resolve(
      path.join(package.directories.source, pathString)
    );
  },
  dist: (pathString = __dirname) => {
    return path.resolve(
      path.join(package.directories.dist, pathString)
    );
  },
  static: (pathString = __dirname) => {
    return path.resolve(
      path.join(package.directories.static, pathString)
    );
  },
};

module.exports = project;
