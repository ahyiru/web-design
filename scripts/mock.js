const sleep = require('@huxy/utils/src/sleep');
const uuidv4 = require('@huxy/utils/src/uuidv4');

const mock = app => {
  app.get('/api/api/list', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: {
        list: [
          {
            name: 'login',
            url: '/auth/login',
            method: 'post',
          },
          {
            name: 'logout',
            url: '/auth/logout',
            method: 'get',
          },
          {
            name: 'profile',
            url: '/users/profile',
            method: 'get',
          },
          {
            name: 'listAuth',
            url: '/auth/list',
            method: 'get',
          },
          {
            name: 'listRouter',
            url: '/router/list',
            method: 'get',
          },
          {
            name: 'allUser',
            url: '/users/allUser',
            method: 'get',
          },
        ],
      },
    });
  });
  app.post('/api/auth/login', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: {
        token: uuidv4(),
      },
    });
  });
  app.post('/api/auth/logout', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: {},
    });
  });
  app.get('/api/auth/list', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: [],
    });
  });
  app.get('/api/users/profile', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: {
        id: uuidv4(),
        name: 'test',
        role: 5,
        email: 'test@test.com',
      },
    });
  });
  app.get('/api/router/list', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: [],
    });
  });
  app.get('/api/users/allUser', async (req, res) => {
    await sleep();
    res.json({
      code: 200,
      message: 'success！',
      result: {
        list: [
          {
            id: uuidv4(),
            name: 'admin',
            role: 1,
            email: 'admin@test.com',
          },
          {
            id: uuidv4(),
            name: '张三',
            role: 0,
            email: 'zs@test.com',
          },
          {
            id: uuidv4(),
            name: '管理员',
            role: 3,
            email: 'huy@test.com',
          },
          {
            id: uuidv4(),
            name: 'visitor',
            role: 0,
            email: 'visitor@test.com',
          },
          {
            id: uuidv4(),
            name: 'demo',
            role: 0,
            email: 'demo@test.com',
          },
        ],
      },
    });
  });
};

const express = require('express');
const colors = require('colors');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const {MOCK} = require('../configs');
const [HOST, PORT] = MOCK?.split(':') ?? ['http://localhost', '9522'];
app.set('host', HOST);
app.set('port', PORT);
app.use(cors());
app.use(logger('combined'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
app.use(compression());
app.listen(PORT, err => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`\n MOCK服务已启动！ `.cyan);
});

module.exports = () => {
  mock(app);
};
