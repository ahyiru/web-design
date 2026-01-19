import DeadCodePlugin from 'webpack-deadcode-plugin';

const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9200' : 'https://api.ihuxy.com';
const llmUrl = 'https://llmapi.ihuxy.com';

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
    {
      target: apiUrl,
      prefix: '/huxy',
    },
    {
      target: apiUrl,
      prefix: '/socket.io',
      ws: true,
    },
    {
      target: apiUrl,
      prefix: '/filesystem',
    },
    {
      target: llmUrl,
      prefix: '/chat',
      withPrefix: false,
    },
  ],
  envConfigs: {
    // 全局环境变量
    name: '控制台',
    id: '1',
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
