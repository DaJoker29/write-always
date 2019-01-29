import { createServer } from 'http';
import VError from 'verror';

import config from '@config';
import db from '@server/db_connect';
import Server from '@server';
import Log from '@tools/log';

const log = Log();
const error = Log('error');

const server = createServer(Server);

server.on('error', onError);
server.on('listening', onListen);
db.on('connected', launchServer);

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('SIGUSR2', gracefulExit);
process.on('uncaughtException', uncaughtException);

function launchServer() {
  log(`Launching server in ${config.env.mode} mode`);
  server.listen(config.env.port);
}

function uncaughtException(err) {
  error(`Error: ${err.message}`);
  gracefulExit(1);
}

function onError(e) {
  error(new VError(e, 'Problem launching server'));
}

function onListen() {
  log(`${config.app.name} has spun up @ http://localhost:${config.env.port}`);
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
