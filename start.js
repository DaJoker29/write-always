import https from 'https';
import http from 'http';
import { readFileSync } from 'fs';
import VError from 'verror';
import Server from '@server';

import config from '@config';
import db from '@server/db_connect';
import Log from '@tools/log';
import webpack from 'webpack';

const log = Log();
const error = Log('error');

db.on('connected', function() {
  log(`${config.env.mode.toUpperCase()} BUILD`);
  if (config.env.mode === 'development') {
    const credentials = {
      key: readFileSync('./key.pem'),
      cert: readFileSync('./cert.pem')
    };
    const server = https.createServer(credentials, Server());
    launchServer(server);
  } else {
    const compiler = webpack(config.webpack);

    // Launch server after bundling
    compiler.run(async (err, stats) => {
      if (err) {
        error(err);
        if (err.details) {
          error(err.details);
        }
        return;
      }
      log('Asset bundle compiled successfully');

      const info = stats.toJson();

      if (stats.hasErrors()) {
        error(info.errors);
      }

      if (stats.hasWarnings()) {
        log(info.warnings);
      }

      const server = http.createServer(Server());
      launchServer(server);
    });
  }
});

function launchServer(server) {
  log(`Launching server in ${config.env.mode} mode`);
  server.listen(config.env.port);
  server.on('error', onError);
  server.on('listening', onListen);
}

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('SIGUSR2', gracefulExit);
process.on('uncaughtException', uncaughtException);

function uncaughtException(err) {
  error(`Error: ${err.message}`);
  gracefulExit(1);
}

function onError(e) {
  error(new VError(e, 'Problem launching server'));
}

function onListen() {
  log(
    `${config.app.name} has spun up @ http${
      config.env.mode === 'production' ? '' : 's'
    }://localhost:${config.env.port}`
  );
}

function gracefulExit(code = 0) {
  log(
    code === 0
      ? 'App is settling DOWN'
      : 'App has CRASHED in a whirl of fire...'
  );

  try {
    typeof db;
    log('Disconnecting from database');
  } catch (e) {
    process.exit(code);
  }

  return db.close(() => {
    process.exit(code);
  });
}
