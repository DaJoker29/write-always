import mongoose from 'mongoose';
import VError from 'verror';
import config from '@config';
import Log from '@tools/log';

const log = Log('db');
const {
  env: { db }
} = config;

log(`Database: ${db}`);
mongoose.connect(
  db,
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection.on('error', err => {
  if (err) throw new VError(err, 'Problem connecting to database.');
});

mongoose.connection.on('disconnected', () => {
  log('Disconnected from database.');
});

mongoose.connection.on('connected', () => {
  log('Connected to database.');
});

export default mongoose.connection;
