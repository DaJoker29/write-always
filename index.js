require('module-alias/register');
require('@babel/register');
require('@babel/polyfill');
const http = require('http');
const log = require('@tools/log')();
const error = require('@tools/log')('error');
const VError = require('verror');
require('@app/utils');

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

const config = require('@config');
const db = require('@app/db_connect');
const app = require('@app');

/**
 * Create/Launch Server
 */

const server = http.createServer(app);

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
