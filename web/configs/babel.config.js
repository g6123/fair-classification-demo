const browsers = require('./browserslist.config');

module.exports = {
  presets: [
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: { browsers },
        spec: false,
        loose: true,
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
        useBuiltIns: true,
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ],
};
