const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const {ESBuildMinifyPlugin} = require('esbuild-loader');

const CopyFileWebpackPlugin = require('@huxy/copy-file-webpack-plugin');

// const CompressionPlugin = require('compression-webpack-plugin');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const {GenerateSW} = require('workbox-webpack-plugin');

const webpackConfig = require('./webpack.config');

const fixPath = require('./utils');

const {appName, PRD_ROOT_DIR, BUILD_DIR, PUBLIC_DIR, PROXY, defProject} = require('../configs');

const rootDir = fixPath(`${PRD_ROOT_DIR}/`);

const app = path.resolve(__dirname, `../${appName}`);
const publics = path.resolve(app, PUBLIC_DIR || '../public');
const build = path.resolve(app, BUILD_DIR);

const frameChunks =
  appName === 'vue'
    ? {
      vue: {
        idHint: 'vue',
        test: /[\\/]node_modules[\\/]vue[\\/]/,
        enforce: true,
        priority: 15,
      },
    }
    : {
      react: {
        idHint: 'react',
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        enforce: true,
        priority: 15,
      },
    };

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000,
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name]_[contenthash:8].css',
    chunkFilename: 'css/[id]_[name]_[contenthash:8].css',
    // publicPath:'../',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      configs: JSON.stringify({
        browserRouter: true,
        basepath: PRD_ROOT_DIR ?? '',
        PROXY,
        defProject,
        buildTime: +new Date(),
      }),
    },
    EMAIL: JSON.stringify('ah.yiru@gmail.com'),
    VERSION: JSON.stringify('1.5.x'),
  }),
  new GenerateSW({
    // importWorkboxFrom: 'local',
    cacheId: 'huxy-pwa',
    clientsClaim: true,
    skipWaiting: true,
  }),
  new CopyFileWebpackPlugin([
    // {
    //   from:path.resolve(publics,'src'),
    //   to:path.resolve(app,`${BUILD_DIR}/src`),
    // },
    // {
    //   from:path.resolve(publics,'manifest.json'),
    //   to:path.resolve(app,`${BUILD_DIR}/manifest.json`),
    // },
    {
      from: path.resolve(publics, 'robots.txt'),
      to: path.resolve(app, `${BUILD_DIR}/robots.txt`),
    },
  ]),
  /* new CompressionPlugin({
    test: /\.(js|css)(\?.*)?$/i,
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }), */
];

const {ANALYZE} = process.env;

if (ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

const prodConfig = merge(webpackConfig, {
  mode: 'production',
  // devtool:'nosources-source-map',
  output: {
    clean: true,
    path: build,
    publicPath: rootDir,
    filename: 'js/[name]_[contenthash:8].js',
    chunkFilename: 'js/[name]_[chunkhash:8].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all', //'async','initial'
      // minSize:0,
      minSize: {
        javascript: 5000,
        style: 5000,
      },
      maxSize: {
        javascript: 500000,
        style: 500000,
      },
      minChunks: 2,
      maxInitialRequests: 10,
      maxAsyncRequests: 10,
      // automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          // chunks:'initial',
          // minSize:30000,
          idHint: 'commons',
          test: app,
          priority: 5,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          // chunks:'initial',
          idHint: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          priority: 10,
        },
        ...frameChunks,
        echarts: {
          idHint: 'echarts',
          chunks: 'all',
          priority: 20,
          test: ({context}) => context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0),
        },
        three: {
          idHint: 'three',
          chunks: 'all',
          priority: 25,
          test: ({context}) => context && context.indexOf('three') >= 0,
        },
        antd: {
          idHint: 'antd',
          chunks: 'all',
          priority: 30,
          test: ({context}) => context && (context.indexOf('@ant-design') >= 0 || context.indexOf('antd') >= 0),
        },
      },
    },
    minimizer: [
      /* new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
          parse: {},
          mangle: true,
          module: false,
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {removeAll: true},
              // calc: false,
              // normalizePositions: false,
            },
          ],
        },
      }), */
      new ESBuildMinifyPlugin({
        target: 'es2018',
        css: true,
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        legalComments: 'none',
      }),
    ],
    minimize: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: false,
    sideEffects: true,
    runtimeChunk: false,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
            },
          },
          /* {
            loader:'isomorphic-style-loader',
          }, */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'global',
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {},
          },
        ],
        // exclude: /components/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'global',
                localIdentName: '[hash:base64:5]',
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
  plugins,
});

module.exports = prodConfig;
