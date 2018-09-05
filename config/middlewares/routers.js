/* eslint-disable import/no-dynamic-require */

const paths = require('../paths');
const merge = require('webpack-merge');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const baseData = require(paths.resolvePageData(paths.defaultPage)).base;
const pageExtensions = /\.h[(tml)(bs)]+$/i;

function isPage(pathReq, dataPath) {
  return pageExtensions.test(pathReq) && checkRequiredFiles([dataPath]);
}

module.exports = function createPageRoutersMiddleware() {
  return function pageRoutersMiddleware(req, res, next) {
    const pathReq = req.path;
    const dataPath = paths.resolvePageData(pathReq.replace(pageExtensions, ''));
    if (!isPage(pathReq, dataPath)) {
      return next();
    }
    const { body, query } = req;
    // eslint-disable-next-line
    res.locals = merge(res.locals, { body, query }, baseData, require(dataPath));
    console.log('pageRoutersMiddleware', dataPath, res.locals);
    return res.render(paths.appHtml, res.locals, () => next());
  };
};
