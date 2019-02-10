import path from 'path';
import {
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

/**
 * Common Configuration
 */

export default function(config) {
  const common = merge({
    entry: './app/client/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: config.pkg._moduleAliases || {}
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            process.env.NODE_ENV !== 'production'
              ? 'vue-style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.bundle\.js$/,
          exclude: /node_modules/,
          loader: 'bundle-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '..'),
        verbose: false
      }),
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
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
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

  return merge(
    common,
    process.env.NODE_ENV === 'development' ? development : production
  );
}
