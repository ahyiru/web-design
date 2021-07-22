module.exports={
  // parser:'sugarss',
  plugins:{
    // 'postcss-import':{},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
      },
      // autoprefixer: { grid: true }
      browsers: 'last 2 versions',
      // importFrom:'./playground/src/layoutOpt/global.css',
      /* importFrom:[
        // './playground/src/layoutOpt/global.css',
        // './configs/themeCfg.js',
        ()=>{
          const environmentVariables={'--viewport-1':'1200px'};
          return {environmentVariables};
        },
      ], */
    },
    'cssnano':{},
    // 'autoprefixer':{},
  },
};