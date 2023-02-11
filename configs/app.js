const app = {
  HOST: process.env.IP || 'http://localhost',
  PORT: process.env.PORT || 8100,
  PRO_PORT: process.env.PRO_PORT || 8101,
  BUILD_DIR: './build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '/',
  PRD_ROOT_DIR: '/',
  PROXY: {
    url: 'http://api.ihuxy.com',
    // url: 'http://127.0.0.1:9202',
    prefix: '/api',
  },
  MOCK: '127.0.0.1:8102',
  SERVER_PORT: 8103,
  projectName: '...',
  defProject: {
    name: '控制台',
    _id: '6098f12b099e1202a287acad',
  },
};

module.exports = app;
