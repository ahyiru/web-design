// const getIPs=require('../scripts/getIPs');
// const localIp=getIPs().slice(-1)??'http://127.0.0.1';
const app={
  HOST:process.env.IP||'http://localhost',
  PORT:process.env.PORT||9200,
  PRO_PORT:process.env.PRO_PORT||9201,
  BUILD_DIR:'./build',//'build',
  // DIST:'../build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'/',
  PROXY_URL:'http://47.105.94.51:9202',
  // PROXY_URL:`${localIp}:9202`,
  TARGET:'/api',
  MOCK:'http://localhost:9202',
  SERVER_PORT:9202,
  basepath:'/',
  platform:'pc',
  projectName:'招摇山',
  // publicPath:'http://localhost:9200/',
};

module.exports=app;
