const { NODE_ENV = 'development' } = process.env;

module.exports =
  NODE_ENV === 'production' ? 'last 2 versions' : ['Firefox', 'Chrome'].map(browser => `last 1 ${browser} version`);
