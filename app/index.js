const path = require('path');
const express = require('express');
const morganDebug = require('morgan-debug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const helmet = require('helmet');
const VError = require('verror');

/* Why is this commented out?*/
// const log = require('@tools/log')();
const errLog = require('@tools/log')('error');

/* Is @config pulled from cache or reinitialized by this? */
const config = require('@config');
// const Routes = require('@server/routes');

const webpackConfig = require('@root/webpack.config');

/**
 * Variables and Constants
 */

const isProd = config.env === 'production';
const app = (module.exports = express());

/**
 * Express/Passport Configuration
 */

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

require('./passport');
// Load Dev Middleware if in dev mode, serve compiled assets otherwise
if (!isProd) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      reload: true,
      stats: 'errors-only',
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
} else {
  // TODO: Production build task
  app.get('/', landing);
}

// TODO: Add API Routes

// Load API Routes
// app.use('/auth', Routes.Auth);
// app.use('/api', Routes.Posts);
// app.use('/api', Routes.Authors);
// app.use('/api', Routes.Categories);

/**
 * app.use('/protected-endpoint', passport.authenticate('jwt', { session: false }, Routes))
 */

/**
 * Error Handling Routes
 */

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

/* eslint-disable-next-line no-unused-vars */
function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errLog(error.stack);
  return res.sendStatus(500);
}

// FIXME: 500 error after missing favicon request. I think I need a wildcard handler for all non-API routes and the core files (index.html and bundle.js)
