const demo={
  HOST:process.env.IP||'http://localhost',
  PORT:process.env.PORT||8300,
  PRO_PORT:process.env.PRO_PORT||8301,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'/',
  // PROXY_URL:'http://47.105.94.51:9202',
  PROXY_URL:`http://localhost:8302`,
  TARGET:'/api',
  MOCK:'http://localhost:8302',
  SERVER_PORT:8302,
  basepath:'/',
  platform:'pc',
  projectName:'demo',
  // publicPath:'http://localhost:8300/',
};

module.exports=demo;
