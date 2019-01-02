require('module-alias/register');
require('@app/utils');
require('dotenv').config();

const path = require('path');
const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('@app/config');
const { VueLoaderPlugin } = require('vue-loader');

const common = merge({
  entry: './app/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.pkg._moduleAliases || {}
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
      title: `${config.app.name} - ${config.app.tagline}`,
      meta: {
        description: config.app.description,
        viewport: 'width=device-width, initial-scale=1',
        'theme-color': config.app.themeColor
      }
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      'process.env': {
        SITE_CONFIG: JSON.stringify(config)
      }
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
