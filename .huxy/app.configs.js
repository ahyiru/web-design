import DeadCodePlugin from 'webpack-deadcode-plugin';

const app = {
  // HOST: 'http://localhost',
  PORT: 8000,
  PROD_PORT: 8080,
  PUBLIC_DIR: 'public',
  BUILD_DIR: 'build',
  DEV_ROOT_DIR: '/',
  PROD_ROOT_DIR: '/',
  projectName: '...',
  PROXY: [
    /* {
      target: 'https://api.ihuxy.com',
      prefix: '/huxyapi',
      pathRewrite: {'^/huxyapi': ''},
    }, */
    {
      target: 'api.ihuxy.com',
      prefix: '/huxyapi',
    },
    {
      target: 'api.ihuxy.com',
      prefix: '/socket.io',
      ws: true,
    },
    {
      target: 'api.ihuxy.com',
      prefix: '/filesystem',
    },
  ],
  envConfigs: {
    // 全局环境变量
    name: '控制台',
    _id: '6098f12b099e1202a287acad',
  },
};

export default {
  app,
  webpack: (rootPath, appPath) => ({
    dev: {
      plugins: [
        new DeadCodePlugin({
          patterns: [`${appPath}/**/*.(js|jsx|css|less|json|png|jpg|jpeg)`],
          exclude: ['**/node_modules/**', '**/build/**', '**/draft/**'],
          log: 'none',
          exportJSON: rootPath,
        }),
      ],
    },
  }),
};
