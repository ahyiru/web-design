const {createProxyMiddleware} = require('http-proxy-middleware');

const proxyCfg = proxy => ({
  prefix: proxy?.prefix || '/api',
  opts: {
    target: proxy?.url || proxy,
    changeOrigin: true,
    // pathRewrite: {'^/api/': '/'},
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('clientip', req.ip);
    },
    // xfwd: true,
  },
});

const appProxy = (app, PROXY) => {
  if (Array.isArray(PROXY)) {
    PROXY.map(proxyItem => {
      const {prefix, opts} = proxyCfg(proxyItem);
      app.use(prefix, createProxyMiddleware(opts));
    });
  } else if (PROXY) {
    const {prefix, opts} = proxyCfg(PROXY);
    app.use(prefix, createProxyMiddleware(opts));
  }
};

module.exports = appProxy;
