require('module-alias/register');
require('@app/utils');

const path = require('path');
const {
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('@app/config');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * Common Configuration
 */

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

/**
 * Production Configuration
 */

const production = merge({
  mode: 'production',
  devtool: 'sourcemap'
});

/**
 * Development Configuration
 */

const development = merge({
  entry: ['webpack-hot-middleware/client', '@client/index.js'],
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
});

module.exports = merge(
  common,
  process.env.NODE_ENV === 'production' ? production : development
);
