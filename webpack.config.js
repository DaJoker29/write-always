require('module-alias/register');
require('@app/utils');
require('dotenv').config();

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('@app/config');
const { VueLoaderPlugin } = require('vue-loader');

// TODO: Pass Config into view package using process.env.config

const common = merge({
  entry: './app/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.appName
    }),
    new VueLoaderPlugin()
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
