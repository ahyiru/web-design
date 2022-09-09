const lowcode = {
  HOST: process.env.IP || 'http://localhost',
  PORT: process.env.PORT || 7200,
  PRO_PORT: process.env.PRO_PORT || 7201,
  BUILD_DIR: './build',
  PUBLIC_DIR: '../public',
  DEV_ROOT_DIR: '/',
  PRD_ROOT_DIR: '/',
  PROXY: {
    url: 'http://47.105.94.51:9202',
    prefix: '/api',
  },
  MOCK: '127.0.0.1:7202',
  SERVER_PORT: 7203,
  projectName: '...',
  defProject: {
    name: '控制台',
    _id: '6098f12b099e1202a287acad',
  },
};

module.exports = lowcode;
