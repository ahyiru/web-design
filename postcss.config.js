module.exports = {
  // parser: 'sugarss',
  plugins: {
    // 'postcss-import': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
        'double-position-gradients': false,
      },
      // autoprefixer: { grid: true }
      browsers: 'last 2 versions',
      // importFrom: './commons/global.css',
    },
    cssnano: {},
    autoprefixer: {},
    // tailwindcss: {},
    // 'postcss-px-to-viewport': {
    //   unitToConvert: 'px',
    //   viewportWidth: 750,
    //   unitPrecision: 6,
    //   propList: ['*'],
    //   viewportUnit: 'vw',
    //   fontViewportUnit: 'vw',
    //   selectorBlackList: [],//需要忽略的CSS选择器
    //   minPixelValue: 1,
    //   mediaQuery: true,
    //   replace: true,
    //   exclude: [/node_modules/],
    //   include: undefined,
    //   landscape: false,
    //   landscapeUnit: 'vw',
    //   landscapeWidth: 568,
    // },
  },
};
