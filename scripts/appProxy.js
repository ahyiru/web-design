const proxyCfg=url=>({
  prefix:'/api',
  opts:{
    target: url,
    changeOrigin: true,
    // pathRewrite: {'^/api/':'/'},
  },
});

module.exports=proxyCfg;







