const demo={
  HOST:process.env.IP||'http://localhost',
  PORT:process.env.PORT||8500,
  PRO_PORT:process.env.PRO_PORT||8501,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'/',
  // PROXY_URL:'http://47.105.94.51:9202',
  PROXY_URL:`http://localhost:8502`,
  TARGET:'/api',
  MOCK:'http://localhost:8502',
  SERVER_PORT:8502,
  basepath:'/',
  platform:'pc',
  projectName:'demo',
  // publicPath:'http://localhost:8500/',
};

module.exports=demo;
