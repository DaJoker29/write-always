import merge from 'deepmerge';
import pkg from '@root/package.json';
import Log from '@tools/log';
import options from '@root/config';
import defaults from './defaults';
import Webpack from './webpack';
import production from './production';
import development from './development';

const log = Log('config');

const app = merge.all([
  JSON.parse(JSON.stringify(defaults)),
  JSON.parse(JSON.stringify(options))
]);

const webpack = Webpack(Object.assign({ pkg, app }));

const config = Object.assign(
  { env: process.env.NODE_ENV === 'production' ? production : development },
  { pkg },
  { app },
  { webpack }
);

log(`Application Name: ${config.app.name}`);
log(`Package Name: ${config.pkg.name}`);
log(`Mode: ${config.env.mode}`);
log(`Version: ${config.pkg.version}`);
log(`Author: ${config.pkg.author}`);
log(`Repo: ${config.pkg.repository.url}`);

export default config;
