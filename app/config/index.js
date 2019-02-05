import merge from 'deepmerge';
import pkg from '@root/package.json';
import Log from '@tools/log';
import options from '@root/config';
import VError from 'verror';
import defaults from './defaults';
import Webpack from './webpack';
import production from './production';
import development from './development';
import test from './test';

const log = Log('config');

const app = merge.all([
  JSON.parse(JSON.stringify(defaults)),
  JSON.parse(JSON.stringify(options))
]);

let env;
switch (process.env.NODE_ENV) {
  case 'test':
    env = test;
    break;
  case 'production':
    env = production;
    break;
  case 'development':
    env = development;
    break;
  default:
    throw new VError('NODE_ENV not set');
}

const webpack = Webpack(Object.assign({ pkg, app }));

const config = Object.assign({ env }, { pkg }, { app }, { webpack });

log(`Application Name: ${config.app.name}`);
log(`Package Name: ${config.pkg.name}`);
log(`Mode: ${config.env.mode}`);
log(`Version: ${config.pkg.version}`);
log(`Author: ${config.pkg.author}`);
log(`Repo: ${config.pkg.repository.url}`);

if (app.fbAppID && app.fbAppVersion) {
  log('API Found: Facebook');
} else {
  throw new VError("Can't find Facebook App ID or Version.");
}

export default config;
