const paths = require('../paths');
const merge = require('webpack-merge');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const baseData = require(paths.resolvePageData(paths.defaultPage)).base;

function isNotPage(pathReq, dataPath) {
  return (
    pathReq.startsWith('/static') ||
    pathReq.endsWith('.hot-update.json') ||
    pathReq.endsWith('favicon.ico') ||
    pathReq.endsWith('manifest.json') ||
    !checkRequiredFiles([dataPath])
  );
}

module.exports = function createPageRoutersMiddleware() {
  return function pageRoutersMiddleware(req, res, next) {
    console.log('pageRoutersMiddleware', req.path);
    const pathReq = req.path;
    const dataPath = paths.resolvePageData(pathReq);
    if (isNotPage(pathReq, dataPath)) {
      return next();
    }
    res.locals = merge(res.locals, ({ body, query } = req), baseData, require(dataPath));
    console.log('locals', res.locals)
    return res.render(paths.appHtml, () => next());
  };
};
