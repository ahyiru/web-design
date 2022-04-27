## huxy


[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ahyiru/ihuxy/blob/develop/LICENSE)
[![npm version](https://img.shields.io/npm/v/@huxy/router.svg)](https://www.npmjs.com/package/@huxy/router)
[![Build Status](https://api.travis-ci.com/ahyiru/ihuxy.svg?branch=develop)](https://app.travis-ci.com/github/ahyiru/ihuxy)
[![](https://img.shields.io/badge/blog-ihuxy-blue.svg)](http://ihuxy.com/)


### 运行

可自行配置运行项目，如运行 `template` 项目：

```js
npm start ---dirname=app

```

默认运行 `app` 目录。`npm start`。

其它一些命令：

```js
"build": "webpack --config scripts/webpack.production.js --progress",
"analyze": "ANALYZE=1 webpack --config scripts/webpack.production.js --progress",
"server": "nodemon scripts/server.js --watch scripts/server.js",
"test": "jest --colors --coverage",
"eslint": "eslint 'app/**/*.{js,jsx}'",
"stylelint": "stylelint 'app/**/*.{css,less}'",
"prettier": "prettier 'app/**/*' --write --ignore-unknown",
"prettier-md": "prettier 'app/**/*.md' --write --ignore-unknown",
"stylelintLayout": "stylelint 'commons/styles/*.{css,less}'",
"lint": "npm run eslint && npm run stylelint",
"lint-fix": "eslint --fix 'app/**/*.{js,jsx}' && stylelint --fix 'app/**/*.{css,less}'",
"release": "standard-version",

```

[low-code](./low-code.md)

### 配置

`configs/app.js`

主要配置有：运行端口、资源路径、打包路径、代理地址等。

```js
const app={
  HOST:process.env.IP||'http://localhost',
  PORT:process.env.PORT||7500,
  PRO_PORT:process.env.PRO_PORT||7501,
  BUILD_DIR:'./build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'/',
  PROXY:{url: 'http://47.105.94.51:9202', prefix: '/api'},
  MOCK:'http://localhost:7502',
  SERVER_PORT:7202,
  basepath:'/',
  platform:'pc',
  projectName:'',
};

```

### 请求

`app/apis`

请求参数处理。可自行配置路径 `prefix` 、`headers`、`credentials` 等

```js
const getToken = () => ({Authorization: `test ${storage.get('token') || ''}`});

const fetch = ({method, url, ...opt}) => fetchApi(method)(`${TARGET}${url}`, {...opt, headers: getToken(), credentials: 'omit'});

```

返回结果处理。根据约定返回 `code` 码配置不同操作。

```js
const handler = (response) => {
  return response
    .json()
    .then((result) => {
      result.code = result.code ?? response.status;
      result.msg = result.message ?? result.msg ?? response.statusText;
      const {msg, code} = result;
      if (code === 401) {
        message.error(msg);
        logout(true);
        throw {code, message: msg};
      }
      if (!success_code.includes(code)) {
        throw {code, message: msg};
      }
      return result;
    })
    .catch((error) => {
      message.error(error.message);
      throw error.message;
    });
};

```
接口配置：

```js
const apiList = [
  {
    name: 'login',
    url:'/auth/signup',
    method:'post',
  },
  {
    fnName: 'getProfile',
    url:'/users/profile',
  },
];

```

根据后台提供API文档来配置。`schema` 数据，方便同构。

### 项目配置

`app/configs`

路由类型、白名单、权限等配置。

```js
export const browserRouter = !process.env.isDev;

const beforeRender = (input, next) => {
  const {path, prevPath} = input;
  const validPath = path.split('?')[0];
  if (validPath === initPath) {
    return next({path: '/'});
  }
  if (!token && !whiteRoutes.includes(validPath)) {
    return next({path: '/user/signin'});
  }
  if (path !== prevPath && demoBackReg.test(prevPath)) {
    // designReg
    return confirmDesignPage(next);
  }
  next();
  // routerListenFn(path,prevPath);
};

```

- `app/theme`：主题配置
- `app/nav`：导航栏配置

### 路由

`app/routes`

支持动态路由、权限路由等。

```js
const allRoutes = [
  {
    path: '/',
    component: () => import('@common/layout'),
    children: dynamicRoutes,
  },
  ...staticRoutes,
];

```

路由组件可按需加载，可根据目录地址加载。

```js
export const playgroundRoutes = {
  path: '/playground',
  name: ' Playground',
  icon: 'ConsoleSqlOutlined',
  children: [
    {
      path: '/demo',
      name: 'demo',
      icon: 'MergeCellsOutlined',
      denied: browserRouter,
      component: () => import('@app/views/demo'),
    },
    {
      path: '/icons',
      name: 'icons',
      icon: 'PictureOutlined',
      componentPath: '/demo/icons',
    },
    {
      path: '/panel',
      name: 'panel',
      component: PanelDemo,
    },
  ],
};

```

### 状态管理

```js
const {useStore} = props

const [list,update,subscribe]=useStore('userList',{});

```

- key：userList
- 默认值：{}
- list：value 值
- update：更新函数
- subscribe：监听函数

```js
const Page1 = (props) => {
  const [list, update] = useStore('userList', []);
  const deleteUse = async (id) => {
    await fetchDel({id});
    update();
  };
};

const Page2 = (props) => {
  const [, , subscribe] = useStore('userList', []);
  useEffect(() => {
    subscribe((result) => {
      console.log(result);
    });
  }, []);
};
```


