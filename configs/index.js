const appName = require('./appName');
const app = require('./app');
const vue = require('./vue');
const lowcode = require('./lowcode');
const cfg = {
  app,
  vue,
  lowcode,
  login: app,
  'blog/router': {...app, PORT: 8000, PRO_PORT: 8001},
  'blog/utils': {...app, PORT: 8010, PRO_PORT: 8011},
  'blog/hooks': {...app, PORT: 8020, PRO_PORT: 8021},
  'blog/components': {...app, PORT: 8030, PRO_PORT: 8031},
  'blog/boilerplate': {...app, PORT: 8040, PRO_PORT: 8041},
  'blog/doc': {...app, PORT: 8040, PRO_PORT: 8041},
};

const configs = cfg[appName] || app;
configs.appName = appName;

module.exports = configs;
