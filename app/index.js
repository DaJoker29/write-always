const path = require('path');
const express = require('express');
const morganDebug = require('morgan-debug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const helmet = require('helmet');
const VError = require('verror');

const log = require('@tools/log')();
const errLog = require('@tools/log')('error');
const wpLog = require('@tools/log')('webpack');

const config = require('@config');
const Routes = require('@server/routes'); // use destructuring here

const webpackConfig = require('@root/webpack.config');

const isProd = config.env === 'production';
const app = (module.exports = express());

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
app.use(passport.initialize());

// configure passport
require('./passport');

if (!isProd) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: webpackConfig.output.publicPath
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

// app.use('/auth', Routes.Auth);
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
