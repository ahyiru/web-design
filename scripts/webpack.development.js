const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const DeadCodePlugin = require('webpack-deadcode-plugin');
const OpenBrowserWebpackPlugin = require('@huxy/open-browser-webpack-plugin');

const webpackConfig = require('./webpack.config');

const {HOST, PORT, appName, DEV_ROOT_DIR, PROXY, defProject} = require('../configs');

const app = path.resolve(__dirname, `../${appName}`);

const devConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  entry: {
    app: ['webpack-hot-middleware/client?reload=true'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'global',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {},
          },
        ],
        // include:[app],
        // exclude:[/node_modules/],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'global',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {},
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
        // exclude:[/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        configs: JSON.stringify({
          browserRouter: false,
          basepath: DEV_ROOT_DIR ?? '',
          PROXY,
          defProject,
          buildTime: +new Date(),
        }),
      },
      EMAIL: JSON.stringify('ah.yiru@gmail.com'),
      VERSION: JSON.stringify('1.5.x'),
    }),
    new OpenBrowserWebpackPlugin({target: `${HOST || 'http://localhost'}:${PORT}`}),
    new DeadCodePlugin({
      patterns: [`${app}/**/*.(js|jsx|css|less|json|png|jpg|jpeg)`, '../commons/**/*.(js|jsx|css|less|json|png|jpg|jpeg)'],
      exclude: ['**/node_modules/**', '**/build/**', '**/draft/**'],
      log: 'none',
      exportJSON: app,
    }),
  ],
});

module.exports = devConfig;
