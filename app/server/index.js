import path from 'path';
import express from 'express';
import morganDebug from 'morgan-debug';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import helmet from 'helmet';
import webpack from 'webpack';
import VError from 'verror';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';

import { updateLastLogin } from '@server/middleware/user';
import asyncHandler from '@server/middleware/async';
import Routes from '@server/routes';
import config from '@config';
import Log from '@tools/log';
import { AuthRoutes, initAuth } from './authentication';

const wpLog = Log('webpack');
const historyLog = Log('history');
const errLog = Log('error');

export default function() {
  const app = express();
  const isDev = config.env.mode === 'development';
  const isProd = config.env.mode === 'production';

  const fromRegex = /\/*\/[a-zA-Z0-9_~.]*\.(js|css|js\.map)/;
  const toRegex = /[a-zA-Z0-9_-~.]+\.(js|css|js\.map)$/;

  const historyConfig = {
    logger: historyLog,
    rewrites: [
      {
        from: fromRegex,
        to: context => '/' + context.parsedUrl.pathname.match(toRegex)[0]
      }
    ]
  };

  const staticMiddleware = express.static(path.join(__dirname, '../dist'));
  const wellKnownPath = express.static(path.join(__dirname, '.well-known'), {
    dotfiles: 'allow'
  });

  // Static Middleware
  app.use(staticMiddleware);
  app.use('/.well-known', wellKnownPath);

  // Debug
  const debugLabel = `${config.pkg.name}-morgan`;
  const debugFormat = isProd ? 'combined' : 'dev';

  app.use(morganDebug(debugLabel, debugFormat));

  // Parsing / Headers
  app.use(bodyParser.urlencoded({ extended: 'true' }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(helmet());

  // Connect History API
  app.use(history(historyConfig));
  app.use(staticMiddleware);

  // Authethentication
  app.use(passport.initialize());
  initAuth();

  // Webpack Middleware (Dev Only)
  if (isDev) {
    wpLog('Configuring Webpack Dev Middleware');
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
  }

  // Add Routes
  app.use('/auth', AuthRoutes);
  app.use('/api', asyncHandler(updateLastLogin), Routes());
  app.use(serverError);

  return app;
}

function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errLog(error.stack);
  return res.sendStatus(500);
}
