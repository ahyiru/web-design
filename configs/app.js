const app={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||9100,
  PRO_PORT:process.env.PRO_PORT||9101,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'',
  PRD_ROOT_DIR:'/',
  PROXY_URL:'http://47.105.94.51:9202',
  // PROXY_URL:`${localIp}:9202`,
  TARGET:'/api',
  MOCK:'http://localhost:9102',
  SERVER_PORT:9202,
  basepath:'/',
  platform:'pc',
  appNane:'...',
  // publicPath:'http://localhost:9100/',
};

module.exports=app;
