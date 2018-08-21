module.exports = function() {
  const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
  const weblog = require('webpack-log')({ name: __filename });
  const project = require('../project');
  const pageCreate = require('./page-creator');
  const extRegExp = /\.(js|json|jsonc|yml|yaml)$/;
  const dupPages = {};

  const pages = project.context(
    project.src('views/pages/'), true, extRegExp
  ).keys().filter(page => {
    const pageName = page.replace(extRegExp, '.html');
    if (dupPages[pageName]) {
      dupPages[pageName].push(page);
      return false;
    }
    dupPages[pageName] = [page];
    return true;
  });

  Object.entries(dupPages).forEach(([pageName, pagePaths]) => {
    if (pagePaths.length < 2) {
      return true;
    }
    weblog.info(`[Duplicated - ${pagePaths.length}] page - ${pageName}`);
    pagePaths.map(pagePath => weblog.info(`${pagePath}`));
  });

  return pages.map((key) => {
    const pageData = require(project.src('views/pages/' + key));
    return pageCreate(Object.assign(pageData, {
      filename: key.replace(extRegExp, '.html'),
    }));
  });
};
