const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge({}, base, {
  body: {
    blocks: [
      'hello',
      'hello',
      'hello',
      'hello',
      {
        component: 'components/banner',
        data: {
          title: 'Hello',
        },
      },
    ],
  },
});
