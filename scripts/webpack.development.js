const webpack = require('webpack');
const {merge} = require('webpack-merge');
const postcssPresetEnv = require('postcss-preset-env');
// const {GenerateSW}=require('workbox-webpack-plugin');
const webpackConfig = require('./webpack.config');

const postcssOptions={
  stage: 0,
  features: {
    'nesting-rules':true,
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

const devConfig=merge(webpackConfig,{
  mode:'development',
  devtool:'eval-cheap-module-source-map',
  target:'web',
  entry:{
    app:['webpack-hot-middleware/client?reload=true'],
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
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
        ],
        // include:[/node_modules/],
        // exclude:[/node_modules/],
      },
      {
        test:/\.less$/,
        use: [
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // execute:true,
              postcssOptions:{
                // parser:'postcss-js',//'sugarss',
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
        // exclude:[/node_modules/],
      },
      /* {
        test:/\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:2,
            },
          },
          {
            loader:'sass-loader',
            options:{
              implementation: require('sass'),
              sassOptions:{
                indentWidth:2,
              },
              additionalData:(content, loaderContext) =>{
                if(loaderContext.resourcePath.endsWith('app/styles/index.scss')) {
                  return content;
                }
                return `@import '~@app/styles/index.scss';${content};`;
              },
            },
          },
        ],
      }, */
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        // NODE_ENV:JSON.stringify('development'),
        isDev:true,
      },
      EMAIL:JSON.stringify('ah.yiru@gmail.com'),
      VERSION:JSON.stringify('0.0.x'),
    }),
    /*new GenerateSW({
      // include: [/\.html$/, /\.js$/, /\.css$/],
      // exclude: '/node_modules/',
      // swDest: 'service-worker.js',
      // swDest:path.join(configs.BUILD_DIR, 'js/sw.js'),
      // navigateFallback: '/index.html', // SPA fallback
      // globDirectory:configs.BUILD_DIR,
      // importsDirectory: '/',
      // importWorkboxFrom: 'local',
      cacheId: 'demo-pwa',
      clientsClaim: true,
      skipWaiting: true,
    }),*/
  ],
});

module.exports=devConfig;
