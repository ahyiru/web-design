const express = require('express');
const colors = require('colors');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
// const https = require('https');
// const fs = require('fs');

const app = express();

const {appName, HOST, PRO_PORT, PROXY, BUILD_DIR, PRD_ROOT_DIR} = require('../configs');

const {createProxyMiddleware} = require('http-proxy-middleware');

const proxyCfg = require('./appProxy');

if (Array.isArray(PROXY)) {
  PROXY.map(proxyItem => {
    const {prefix, opts} = proxyCfg(PROXY);
    app.use(prefix, createProxyMiddleware(opts));
  });
} else {
  const {prefix, opts} = proxyCfg(PROXY);
  app.use(prefix, createProxyMiddleware(opts));
}

app.set('host', HOST);
app.set('port', PRO_PORT);

app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(compression());

// const appDist=path.resolve(__dirname,`../${appName}`);
const build = path.resolve(appName, BUILD_DIR);
// app.use(express.static(build));

app.use(PRD_ROOT_DIR, express.static(build));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(build, 'index.html'));
});

/* https */
/* const cert = path.resolve(__dirname, '../cert');
const options = {
  key: fs.readFileSync(`${cert}/server.key`),
  cert: fs.readFileSync(`${cert}/server.cert`),
  // passphrase: 'YOUR PASSPHRASE HERE',
};
const httpsServer = https.createServer(options, app); */
/* https */

app.listen(app.get('port'), err => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('\n服务已启动! '.black + '✓'.green);
  console.log(`\n监听端口: ${app.get('port')} ,正在构建,请稍后...`.cyan);
  console.log('-----------------------------------'.grey);
  console.log(` 本地地址: ${app.get('host')}:${app.get('port')}${PRD_ROOT_DIR}`.magenta);
  console.log('-----------------------------------'.grey);
  console.log('\n按下 CTRL-C 停止服务\n'.blue);
});
