require('@babel/register');
require('@babel/polyfill');
require('module-alias/register');
require('@app/utils');

module.exports = require('@config').webpack;
