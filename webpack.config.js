require('module-alias/register');
require('@app/utils');
require('dotenv').config();

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('@app/config');

const common = merge({
  entry: './app/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.appName
    })
  ]
});

const production = merge({
  mode: 'production',
  devtool: 'sourcemap'
});

const development = merge({
  mode: 'development',
  devtool: 'inline-source-map'
});

module.exports = merge(
  common,
  process.env.NODE_ENV === 'production' ? production : development
);
