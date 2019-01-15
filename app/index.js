import path from 'path';
import express from 'express';
import morganDebug from 'morgan-debug';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import helmet from 'helmet';
import VError from 'verror';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';

import Routes from '@server/routes';
import config from '@config';
import Log from '@tools/log';

const errLog = Log('error');
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
import './passport';

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
  app.get('/', landing);
}

app.use('/auth', Routes.Auth);
// app.use('/api', Routes.Posts);
// app.use('/api', Routes.Authors);
// app.use('/api', Routes.Categories);

/**
 * app.use('/protected-endpoint', passport.authenticate('jwt', { session: false }, Routes))
 */

// error-handling routes
app.use('/fail', forceFailure);
app.use(pageNotFound);
app.use(serverError);

function landing(req, res) {
  return res.sendFile(__dirname + '/dist/index.html');
}

function forceFailure(req, res, next) {
  const err = new VError('Intentionally Triggered Error');
  next(err);
}

function pageNotFound(req, res, next) {
  const err = new VError('Not Found');
  err.status = 404;
  next(err);
}

function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errLog(error.stack);
  return res.sendStatus(500);
}
