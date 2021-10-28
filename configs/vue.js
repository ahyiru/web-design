const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT|7500,
  PRO_PORT:process.env.PRO_PORT||7501,
  BUILD_DIR:'../build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PRD_ROOT_DIR:'/',
  PROXY_URL:'http://47.105.94.51:9202',
  MOCK:'http://localhost:7502',
  SERVER_PORT:7502,
  basepath:'/',
  platform:'pc',
  appNane:'...',
  publicPath:'http://localhost:7500/',
};

module.exports=app;
