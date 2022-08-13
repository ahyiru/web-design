const proxyCfg = proxy => ({
  prefix: proxy?.prefix || '/api',
  opts: {
    target: proxy?.url || proxy,
    changeOrigin: true,
    // pathRewrite: {'^/api/':'/'},
  },
});

module.exports = proxyCfg;
