const {request} = require('https');

const url = 'http://ihuxy.com/api/users/find';

const token = 'auth 123456';

const options = {
  url,
  method: 'GET',
  json: true,
  // body:''
  headers: {
    Authorization: token,
  },
  // jar:j,
};

const callback = (error, response, body) => {
  if (error) {
    console.log('error:', error);
    return;
  }
  console.log('body:', body);
};

request(options, callback);
