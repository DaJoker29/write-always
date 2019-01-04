const mongoose = require('mongoose');
const log = require('@tools/log')();
const VError = require('verror');
const { db } = require('@config');

log(`Connecting to database: ${db}`);
mongoose.connect(
  db,
  { useNewUrlParser: true }
  // TODO: Look into MongoDB new URL Parser to avoid deprecated syntax
);

mongoose.connection.on('error', err => {
  if (err) throw new VError(err, 'Problem connecting to database.');
});

mongoose.connection.on('disconnected', () => {
  log('Disconnected from database.');
});

mongoose.connection.on('connected', () => {
  log('Successfully connected to database.');
});

module.exports = mongoose.connection;
