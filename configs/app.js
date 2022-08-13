const app = {
  HOST: process.env.IP || 'http://localhost',
  PORT: process.env.PORT || 8100,
  PRO_PORT: process.env.PRO_PORT || 8101,
  BUILD_DIR: './build', //'build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '/',
  PRD_ROOT_DIR: '/',
  PROXY: {
    url: 'http://47.105.94.51:9202',
    prefix: '/api',
  },
  MOCK: 'http://localhost:8102',
  SERVER_PORT: 8103,
  projectName: '...',
};

module.exports = app;
