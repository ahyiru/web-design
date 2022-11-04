const app = {
  HOST: process.env.IP || 'localhost',
  PORT: process.env.PORT | 7500,
  PRO_PORT: process.env.PRO_PORT || 7501,
  BUILD_DIR: './build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '',
  PRD_ROOT_DIR: '/',
  PROXY: 'http://ihuxy.com:9202',
  MOCK: '127.0.0.1:7502',
  SERVER_PORT: 7502,
  appNane: '...',
  defProject: {
    name: '控制台',
    _id: '6098f12b099e1202a287acad',
  },
};

module.exports = app;
