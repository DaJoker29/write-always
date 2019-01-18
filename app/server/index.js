import path from 'path';
import express from 'express';
import morganDebug from 'morgan-debug';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';

import { updateLastLogin } from '@server/middleware/user';
import Errors from '@server/middleware/errors';
import Routes from '@server/routes';
import config from '@config';
import Log from '@tools/log';

const wpLog = Log('webpack');

const isProd = config.env === 'production';
const app = express();

export default app;

// configure express
app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  '/.well-known',
  express.static(path.join(__dirname, '.well-known'), { dotfiles: 'allow' })
);
app.use(morganDebug(`${config.pkg.name}-morgan`, isProd ? 'combined' : 'dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(helmet());
app.use(history());
app.use(passport.initialize());

// configure passport
import auth from './authentication';

if (!isProd) {
  const compiler = webpack(config.webpack);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: config.webpack.output.publicPath
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true, // test this line because I'm not sure it does anything.
      log: wpLog
    })
  );
} else {
  // serve compiled assets in production mode
  app.get('/', function(req, res) {
    return res.sendFile(__dirname + '/dist/index.html');
  });
}

app.use('/auth', auth);
app.use('/api', updateLastLogin, Routes());
app.use(Errors());
