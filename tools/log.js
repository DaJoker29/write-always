require('module-alias/register');
const path = require('path');
const callsite = require('callsite');
const debug = require('debug');
const pkg = require('@root/package.json');

module.exports = namespace => {
  if (namespace) {
    return debug(`${pkg.name}-${namespace}`);
  }
  const stack = callsite();
  const file = stack[1].getFileName();
  const filename = file.slice(file.lastIndexOf('/') + 1, -3).replace(/_/g, '-');
  const home = `${path.resolve(__dirname, '..')}`;
  const dir = path.dirname(file);
  const parents = dir
    .replace(home, '')
    .replace(/^\//g, '')
    .replace(/\//g, '-');

  // Project Entry Point
  if (filename === 'index' && dir === home) {
    return debug(`${pkg.name}`);
  }
  if (filename === 'index') {
    return debug(`${pkg.name}-${parents}`);
  }
  return debug(`${pkg.name}-${parents}-${filename}`);
};
