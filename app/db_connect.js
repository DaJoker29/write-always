const mongoose = require('mongoose');
const log = require('@tools/log')('db');
const VError = require('verror');
const { db } = require('@config');

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

module.exports = mongoose.connection;
