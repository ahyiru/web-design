const appName=require('./appName');
const app=require('./app');
const vue=require('./vue');
const cfg={
  app,
  vue,
  demo1:app,
  login:app,
  'blog/router':{...app,PORT:8000,PRO_PORT:8001},
  'blog/utils':{...app,PORT:8010,PRO_PORT:8011},
  'blog/hooks':{...app,PORT:8020,PRO_PORT:8021},
  'blog/components':{...app,PORT:8030,PRO_PORT:8031},
  'blog/styles':{...app,PORT:8040,PRO_PORT:8041},
  'blog/nodejs':{...app,PORT:8050,PRO_PORT:8051},
  'blog/mongodb':{...app,PORT:8060,PRO_PORT:8061},
  'blog/modules':{...app,PORT:8070,PRO_PORT:8071},
  'blog/boilerplate':{...app,PORT:8080,PRO_PORT:8081},
  'blog/doc':{...app,PORT:8090,PRO_PORT:8091},
};

const configs=cfg[appName]||app;
configs.appName=appName;

module.exports=configs;
