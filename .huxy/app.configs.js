import DeadCodePlugin from 'webpack-deadcode-plugin';

// const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9200' : 'https://api.ihuxy.com';
// const llmUrl = 'https://llmapi.ihuxy.com';

// const localApi = 'http://localhost:9200';
const localApi = 'http://192.168.0.111:9200';
const serverApi = 'https://api.ihuxy.com';
const apiUrl = process.env.NODE_ENV === 'development' ? localApi : localApi;

const app = {
  PORT: 8000,
  PROD_PORT: 8080,
  PUBLIC_DIR: 'public',
  BUILD_DIR: 'build',
  DEV_ROOT_DIR: '/',
  PROD_ROOT_DIR: '/',
  projectName: 'Huxy',
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
      target: apiUrl,
      prefix: '/chat',
      // withPrefix: false,
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
    prod: {
      copy: [
        {
          from: `${rootPath}/node_modules/three/examples/jsm/libs/draco/gltf`,
          to: `${appPath}/build/draco/gltf`,
        },
      ],
    },
  }),
};
