const path = require('path');
const pkg = require('../package.json');
const packageVersion = pkg.version;

const isDEV = process.env.NODE_ENV !== 'production';
const resolve = (...args) => path.join(__dirname, '../', ...args);
const envVars = {
  __VERSION__: packageVersion,
  __DEV__: isDEV,
};

module.exports = {
  isDEV,
  resolve,
  envVars,
  packageVersion,
};

