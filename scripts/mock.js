const {sleep,uuidv4}=require('@huxy/utils');
const mock=app=>{
  app.post('/api/user/login',async (req,res)=>{
    await sleep();
    res.json({
      code:200,
      message:'success！',
      result:{
        token:uuidv4(),
      },
    });
  });
  app.get('/api/user/profile',async (req,res)=>{
    await sleep();
    res.json({
      code:200,
      message:'success！',
      result:{
        id:uuidv4(),
        name:'test',
        role:5,
        email:'test@test.com',
      },
    });
  });
  app.get('/api/user/allUser',async (req,res)=>{
    await sleep();
    res.json({
      code:200,
      message:'success！',
      result:{
        list:[
          {
            id:uuidv4(),
            name:'admin',
            role:1,
            email:'admin@test.com',
          },
          {
            id:uuidv4(),
            name:'张三',
            role:0,
            email:'zs@test.com',
          },
          {
            id:uuidv4(),
            name:'管理员',
            role:3,
            email:'huy@test.com',
          },
          {
            id:uuidv4(),
            name:'visitor',
            role:0,
            email:'visitor@test.com',
          },
          {
            id:uuidv4(),
            name:'demo',
            role:0,
            email:'demo@test.com',
          },
        ],
      },
    });
  });
};

const express = require('express');
const colors=require('colors');
const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');
const compression=require('compression');
const app = express();
const {HOST,SERVER_PORT}=require('../configs');
app.set('host',HOST);
app.set('port',SERVER_PORT);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));
app.use(compression());
app.listen(SERVER_PORT,(err)=>{
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`\n MOCK服务已启动！ `.cyan);
});

module.exports=()=>{
  mock(app);
};


