const {createProxyMiddleware} = require('http-proxy-middleware');
const {PROXY} = require('../configs');

const proxyCfg = proxy => ({
  prefix: proxy?.prefix || '/api',
  opts: {
    target: proxy?.url || proxy,
    changeOrigin: true,
    // pathRewrite: {'^/api/':'/'},
  },
});

const appProxy = app => {
  if (Array.isArray(PROXY)) {
    PROXY.map(proxyItem => {
      const {prefix, opts} = proxyCfg(PROXY);
      app.use(prefix, createProxyMiddleware(opts));
    });
  } else if (PROXY) {
    const {prefix, opts} = proxyCfg(PROXY);
    app.use(prefix, createProxyMiddleware(opts));
  }
};

module.exports = appProxy;
