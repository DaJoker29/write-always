import 'module-alias/register';
import '@app/utils';

import { createServer } from 'http';
import Log from '@tools/log';
import VError from 'verror';

const log = Log();
const error = Log('error');

/**
 * Termination and Exit handling
 */

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('SIGUSR2', gracefulExit);
process.on('uncaughtException', err => {
  error(`Error: ${err.message}`);
  gracefulExit(1);
});

/**
 * Load config and app
 */

import config from '@config';
import db from '@app/db_connect';
import app from '@app';

/**
 * Create/Launch Server
 */

const server = createServer(app);

server.on('error', onError);
server.on('listening', onListen);
db.on('connected', launchServer);

/**
 * Event Handlers
 */

function launchServer() {
  log(`Launching server in ${config.env} mode`);
  server.listen(config.port);
}

function onError(e) {
  console.error(new VError(e, 'Problem launching server'));
}

function onListen() {
  log(`${config.app.name} has spun up @ http://localhost:${config.port}`);
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
