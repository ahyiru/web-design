const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const rimraf = require('rimraf');

const CompressionPlugin = require('compression-webpack-plugin');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const {GenerateSW}=require('workbox-webpack-plugin');

const webpackConfig = require('./webpack.config');

const {appName,PRD_ROOT_DIR,BUILD_DIR}=require('../configs');

const rootDir=['/','./'].includes(PRD_ROOT_DIR)?PRD_ROOT_DIR:`${PRD_ROOT_DIR}/`;

const app=path.resolve(__dirname,`../${appName}`);
const build=path.resolve(app,BUILD_DIR);

rimraf(build,err=>console.log(err));

const postcssOptions={
  stage: 0,
  features: {
    'nesting-rules': true,
  },
  // autoprefixer: { grid: true }
  browsers: 'last 2 versions',
  importFrom:[
    // './playground/src/layoutOpt/global.css',
    // './configs/themeCfg.js',
    ()=>{
      const environmentVariables={
        '--viewport-1':'1200px',
      };
      return {environmentVariables};
    },
  ],
};

const plugins=[
  new MiniCssExtractPlugin({
    filename:'css/[name]_[contenthash:8].css',
    chunkFilename:'css/[id]_[name]_[contenthash:8].css',
    // publicPath:'../',
  }),
  new webpack.DefinePlugin({
    'process.env':{
      // NODE_ENV:JSON.stringify('production'),
      isDev:false,
    },
    EMAIL:JSON.stringify('ah.yiru@gmail.com'),
    VERSION:JSON.stringify('0.0.x'),
  }),
  new GenerateSW({
    // importWorkboxFrom: 'local',
    cacheId: 'demo-pwa',
    clientsClaim: true,
    skipWaiting: true,
  }),
  /* new CompressionPlugin({
    test: /\.(js|css)(\?.*)?$/i,
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }), */
];

const {ANALYZE}=process.env;

if(ANALYZE){
  plugins.push(new BundleAnalyzerPlugin());
}

const prodConfig=merge(webpackConfig, {
  mode:'production',
  // devtool:'cheap-module-source-map',
  output:{
    path:build,
    publicPath:rootDir,
  },
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin({
        // cache: true,
        parallel: true,
        // sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console:true,
          },
          mangle: true,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset:['default',{
            discardComments:{removeAll:true},
            // calc: false,
            // normalizePositions: false,
          }],
        },
      }),
    ],
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              // publicPath: '../',
            },
          },
          /* {
            loader:'isomorphic-style-loader',
          }, */
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules: {
                mode:'global',
                localIdentName:'[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins:()=>[
                  postcssPresetEnv(postcssOptions),
                ],
              },
            },
          },
        ],
        // exclude: /components/,
      },
      {
        test:/\.less$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              // publicPath: '../',
            },
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules: {
                mode:'global',
                localIdentName:'[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins:()=>[
                  postcssPresetEnv(postcssOptions),
                ],
                /* plugins:[
                  'postcss-preset-env',
                  {
                    // Options
                  },
                ], */
              },
            },
          },
          {
            loader:'less-loader',
            options:{
              lessOptions:{
                javascriptEnabled:true,
              },
            },
          },
        ],
        // exclude: /components/,
      },
    ],
  },
  plugins,
});

module.exports=prodConfig;


