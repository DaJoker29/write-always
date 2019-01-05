const log = require('@tools/log')('config');

const merge = require('deepmerge');
const VError = require('verror');
const pkg = require('@root/package.json');
const defaults = require('./defaults');

let options;

try {
  // eslint-disable-next-line global-require
  options = require('@root/config.js');
} catch (e) {
  throw new VError(e.message);
}

const env =
  process.env.NODE_ENV === 'production'
    ? require('./production')
    : require('./development');

const app = merge.all([
  JSON.parse(JSON.stringify(defaults)),
  JSON.parse(JSON.stringify(options))
]);

const config = (module.exports = Object.assign(env, { pkg }, { app }));

log(`Application Name: ${config.app.name}`);
log(`Package Name: ${config.pkg.name}`);
log(`Mode: ${config.env}`);
log(`Version: ${config.pkg.version}`);
log(`Author: ${config.pkg.author}`);
log(`Repo: ${config.pkg.repository.url}`);
