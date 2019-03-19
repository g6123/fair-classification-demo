const path = require('path');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const browsers = require('./browserslist.config');

const { NODE_ENV = 'development' } = process.env;
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers,
      features: {
        'nesting-rules': true,
      },
      importFrom: [path.resolve(PROJECT_ROOT, 'src', '_variables.css')],
    }),
    ...(NODE_ENV === 'production' ? [cssnano(['default', { discardComments: { removeAll: true } }])] : []),
  ],
};
