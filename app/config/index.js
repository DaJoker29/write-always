import dotenv from 'dotenv';
import pkg from '@root/package.json';
import Log from '@tools/log';
import VError from 'verror';
import Webpack from './webpack';
import production from './production';
import development from './development';
import test from './test';

dotenv.config();

const log = Log('config');

const app = {
  name: process.env.APP_NAME || pkg.name,
  description: process.env.APP_DESC || pkg.description,
  tagline: process.env.APP_TAGLINE || 'Go confidently...',
  'theme-color': process.env.APP_THEME_COLOR || '#481b1b',
  fbAppID: process.env.FB_APP_ID,
  fbAppVersion: process.env.FB_APP_VERS
};

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
