const config = api => {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  const presets = [
    [
      '@babel/preset-env',
      {
        // modules: 'commonjs',
        modules: false,
        // loose: true,
        bugfixes: true,
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];

  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-pipeline-operator', {proposal: 'minimal'}],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-class-properties' /* ,{loose: true} */],
    ['@babel/plugin-proposal-private-methods' /* ,{loose: true} */],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        helpers: true,
        regenerator: true,
        /* corejs: false, {
          version: 3,
          proposals: true,
        }, */
      },
    ],
  ];

  const env = {
    development: {
      // plugins: ['react-hot-loader/babel'],
    },
    production: {
      plugins: [],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  };

  return {
    /* babelrcRoots: [
      '.',
      'playground/publish/*',
    ], */
    assumptions: {
      noDocumentAll: true,
      noClassCalls: true,
      iterableIsArray: true,
      privateFieldsAsProperties: true,
      setPublicClassFields: true,
    },
    targets: {
      browsers: ['last 2 versions'],
      esmodules: true,
    },
    sourceType: 'unambiguous',
    presets,
    plugins,
    env,
  };
};

module.exports = config;
