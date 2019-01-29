#!/usr/bin/env node

require('module-alias/register');
require('@babel/register');
require('@babel/polyfill');
require('@app/utils');

module.exports = require('./cli-core');
