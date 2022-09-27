const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const fixPath = require('./utils');

const {appName, projectName, PUBLIC_DIR, BUILD_DIR, DEV_ROOT_DIR} = require('../configs');

const rootDir = fixPath(`${DEV_ROOT_DIR}/`);

const app = path.resolve(__dirname, `../${appName}`);
const publics = path.resolve(app, PUBLIC_DIR || '../public');

const frame = appName === 'vue' ? {uiframe: ['vue']} : {uiframe: ['react', 'react-dom']};

const entry = {
  app: [path.resolve(app, 'index.jsx')],
  ...frame,
};
const templ = path.resolve(publics, 'index.html');
const icon = path.resolve(publics, 'favicon.ico');

const htmlPlugin = () =>
  new HtmlWebpackPlugin({
    title: projectName || appName,
    template: templ,
    favicon: icon,
    inject: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      // conservativeCollapse:true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true,
      removeTagWhitespace: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  });

const plugins = [
  htmlPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
  }),
  /* new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 5,
  }), */
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  // new BundleAnalyzerPlugin(),
  /* new ModuleFederationPlugin({
    name:'reactApp',
    // library:{ type:'var',name:'reactApp'},
    // filename:'remoteEntry.js',
    remotes:{
      useVueApp:'useVueApp',
    },
    // exposes:{
    //   ReactApp:path.resolve(__dirname, '../app'),
    //   // VueApp:path.resolve(__dirname, '../vue'),
    // },
    // shared:['react','react-dom'],
  }), */
  /* new webpack.ProgressPlugin({
    activeModules:false,
    entries:true,
    handler:(percentage,message,...args)=>{
      // console.log(percentage,message,...args);
    },
    modules:true,
    modulesCount:5000,
    profile:false,
    dependencies:true,
    dependenciesCount:10000,
    percentBy:null,
  }), */
  new SimpleProgressWebpackPlugin({
    format: 'compact',
  }),
  new NodePolyfillPlugin(),
];

const rules = [
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
  {
    test: /\.tsx?$/,
    use: [{loader: 'babel-loader'}, {loader: 'ts-loader'}],
    exclude: [/node_modules/, /draft/],
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
    exclude: [/node_modules/ /* ,/draft/ */, path.resolve(__dirname, 'node')],
  },
  {
    test: /\.(jpe?g|png|gif|psd|bmp|ico|webp|svg)$/i,
    loader: 'url-loader',
    options: {
      limit: 20480,
      name: 'img/img_[hash:8].[ext]',
      // publicPath:'../',
      esModule: false,
    },
    type: 'javascript/auto',
    exclude: [/node_modules/],
  },
  {
    test: /\.(ttf|eot|svg|woff|woff2|otf)$/,
    loader: 'url-loader',
    options: {
      limit: 20480,
      name: 'fonts/[hash:8].[ext]',
      publicPath: '../',
      esModule: false,
    },
    exclude: [/images/],
  },
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    },
    include: [app],
  },
  {
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      },
    ],
    exclude: [/node_modules/],
  },
  {
    test: /\.pdf$/,
    loader: 'url-loader',
    options: {
      limit: 20480,
      name: 'pdf/[hash].[ext]',
    },
    exclude: [/node_modules/],
  },
  {
    test: /\.(swf|xap|mp4|webm)$/,
    loader: 'url-loader',
    options: {
      limit: 20480,
      name: 'video/[hash].[ext]',
    },
    exclude: [/node_modules/],
  },
];

module.exports = {
  context: app,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  experiments: {
    topLevelAwait: true,
    // outputModule:true,
    // syncWebAssembly:true,
    // asyncWebAssembly:true,
    // layers:true,
    // lazyCompilation:true,
  },
  entry: entry,
  output: {
    path: path.resolve(app, BUILD_DIR),
    publicPath: rootDir,
    filename: 'js/[name].js',
    // chunkFilename:'js/[name]_[chunkhash:8].chunk.js',
    // assetModuleFilename: 'assets/[contenthash][ext]',
    /* library:{
      name:`${appName}App`,
      type:'umd',
      export:'default',
    }, */
    // umdNamedDefine:true,
    // globalObject:'this',
  },
  optimization: {
    splitChunks: false,
    minimize: false,
    providedExports: false,
    usedExports: false,
    concatenateModules: false,
    sideEffects: 'flag',
    runtimeChunk: 'single',
    moduleIds: 'named',
    chunkIds: 'named',
  },
  externals: {
    // react:'react',
    // vue:'vue',
  },
  resolve: {
    modules: [app, 'node_modules'],
    alias: {
      '@app': app,
      '@configs': path.resolve(app, '../configs'),
      '@commons': path.resolve(app, '../commons'),
    },
    extensions: ['.jsx', '.js', '.less', '.css', '.scss', '.json', '.ts', '.tsx', '.vue', '.mjs'],
    fallback: {
      path: false, //require.resolve('path-browserify'),
      fs: false,
      process: false,
    },
    symlinks: false,
    cacheWithContext: false,
  },
  module: {
    rules: rules,
  },
  plugins: plugins,
};
