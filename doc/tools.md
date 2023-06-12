## 系统工具

Web 开发是一个非常庞大的领域，也是一个快速发展的领域。为了让开发更加高效、便捷，使用一些常用的工具是非常必要的。下面将介绍一些在 Web 开发中常用的工具，包括构建工具、状态管理、路由管理、接口请求以及鉴权等。这些工具可以大大提高我们的编码效率，同时也可以保证代码的可维护性和可扩展性。让我们一起来探究这些工具吧！

### Pack

使用基于 Webpack 的工具 `@huxy/pack` 来构建项目。

`@huxy/pack` 是一个项目构建工具，集成了 `esbuild`、`eslint`、`stylelint`、`jest`、`commitlint`、`husky`、`standard-version`、`postcss`、`prettier`，提供开发环境、构建打包、本地启动服务、环境配置、代理配置等功能。使用简单方便，功能齐全，配置灵活，可自己添加需要的功能插件。

运行时会自动生成插件配置文件，如 `babel.config.cjs` 文件等，可自行修改覆盖。

生成项目配置文件 `.huxy/app.configs.js` ，用户自行配置即可。

用户环境配置：

```javascript
// app.configs.js

const app = {
  // entry: 'app', // 项目入口目录，默认 app 文件夹
  // HOST: 'http://localhost', // 本地运行
  PORT: 8080, // 本地开发环境端口
  PROD_PORT: 8081, // 本地生产环境端口
  PUBLIC_DIR: 'public', // public 文件路径
  BUILD_DIR: 'build', // 构建产物路径
  DEV_ROOT_DIR: '/', // 开发环境 basepath
  // PROD_ROOT_DIR: '/huxy', // 生产环境 basepath
  projectName: 'XX平台', // 名称，页面初始化 title
  /* PROXY: { // 代理配置
    url: 'http://127.0.0.1:9000',
    prefix: '/api',
  }, */
  envConfigs: { // 全局环境变量
    name: '项目名',
    _id: '其它属性',
  },
};

const webpack = { // webpack 配置
  // ... // 基础配置
  dev: { // 开发环境配置
    // ...
  },
  prod: { // 生产环境配置
    // ...
  },
};

const nodeServer = app => { // 本地 nodejs 服务配置
  app.get('/local/test', (req, res, next) => {
    console.log(req);
  });
};


export default {
  app,
  webpack,
  nodeServer,
};

// 例如

export default {
  app,
  webpack: (rootDir, appPath) => ({
    resolve: {
      alias: {
        '@huxy': `${rootPath}/playground/huxy`,
      },
    },
    prod: {
      copy: [ // 拷贝文件
        {
          from: `${appPath}/public/robots.txt`,
          to: `${appPath}/build/robots.txt`,
        },
      ],
      buildConfigs: {
        target: 'es2018',
        minify: true,
      },
    },
  }),
};
```

详细配置见 [@huxy/pack](https://www.npmjs.com/package/@huxy/pack) 。

### Store

全局状态管理，使用订阅发布模式来更新数据。提供 js 函数 `store` 和 React 钩子函数 `useStore`。

```javascript
import {createStore, createContainer} from '@huxy/utils';
import {createContainer as createUseContainer} from '@huxy/use';

export const container = createStore();

export const store = createContainer(container);
export const useStore = createUseContainer(container);
```

定义 `store` ：

```javascript
import {store, useStore} from '.';
import {langName, themeName, menuTypeName, i18nsName, userInfoName, permissionName, routersName, notifyName} from './names';

export const langStore = store(langName);
export const menuTypeStore = store(menuTypeName);
export const themeStore = store(themeName, {});
export const i18nsStore = store(i18nsName, {});
export const userInfoStore = store(userInfoName, {});
export const permissionStore = store(permissionName, []);
export const routersStore = store(routersName, []);
export const notifyStore = store(notifyName, 0);

export const useLangStore = initState => useStore(langName, initState);
export const useMenuTypeStore = initState => useStore(menuTypeName, initState);
export const useThemeStore = (initState = {}) => useStore(themeName, initState);
export const useI18nsStore = (initState = {}) => useStore(i18nsName, initState);
export const useUserInfoStore = (initState = {}) => useStore(userInfoName, initState);
export const usePermissionStore = (initState = []) => useStore(permissionName, initState);
export const useRoutersStore = (initState = []) => useStore(routersName, initState);
export const useNotifyStore = (initState = 0) => useStore(notifyName, initState);
```

详细配置见 [useStore](https://github.com/ahyiru/use#usestore) 。


### Router

使用 `@huxy/router` 来管理路由。`@huxy/router` 使用 HTML5 的 History API，使用 `popstate` 和 `hashchange` 来监听路由变化。

使用方便，例如：

```javascript
const input = {
  browserRouter: false, //是否为browserHistory
  idKey: 'path', //路由key值。如：url
  childKey: 'children', //子层级key值。如：children
  beforeRender: () => {}, //渲染前回调函数。
  afterRender: () => {}, //渲染完回调函数。
  basepath: '', //路由前缀。
  routers: [], //路由表
  store: () => {}, //状态管理函数
  inputPath: '', //初始化路由
  inputParams: {}, //初始化参数
  // 全局
  title: 'test', //页面title。
  errorBoundary: null, //错误边界。默认有错误边界处理，可自定义。
  loading: null, //加载效果。默认有加载效果，可自定义。
  exact: false, //绝对路径
  ...others, //其它配置
};

const {output} = useRouter(input);
```

详细配置见 [useRouter](https://www.npmjs.com/package/@huxy/router) 。

### Fetch

使用 `fetch` 函数封装方便项目使用的接口请求函数。有如下配置项：

- type：请求类型，如：json、form、form-data
- headers：请求头
- data：请求数据
- params：请求参数
- query：url参数

使用：

```javascript
const success_code = [200, 10000];

const handler = response =>
  return response
    .json()
    .then(result => {
      result.code = result.code ?? response.status;
      result.message = result.message ?? result.msg ?? response.statusText;
      const {message, code} = result;
      if (code === 401) {
        logout(true);
        throw {code, message};
      }
      if (!success_code.includes(code)) {
        throw {code, message};
      }
      return result;
    })
    .catch(error => {
      msgAlert.error(error.message);
      throw error;
    });

export const fetch = ({method, url, prefix, headers, ...opt}) => fetcher(handler)(method)(`${prefix ?? TARGET}${url}`, {headers: {...getToken(), ...headers}, credentials: 'omit', ...opt});
```

例如：

```javascript
const getApis = () => fetcher({url: '/api/list', params: {projectId: defProject._id, current: 1, size: 100}});
```

### JWT

使用 JWT 来鉴权。

创建 `token` ：

```javascript
export const jwtDecode = token => jwt.decode(token, configs.TOKEN_SECRET);
export const jwtEncode = token => jwt.encode(token, configs.TOKEN_SECRET);

export const createJWT = (req, user, delay = 1) => {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(delay, 'days').unix(),
  };
  return jwtEncode(payload);
};
```

验证 `token` ：

```javascript
export const ensureAuthenticated = async (req, res, next) => {
  if (!req.header('Authorization')) {
    return sendMsg(401, '用户未登录，请登录后操作!');
  }
  const token = req.header('Authorization').split(' ')[1];
  if (!token) {
    return sendMsg(401, '用户未登录，请登录后操作!');
  }
  let payload = null;
  try {
    payload = jwtDecode(token);
  } catch (err) {
    return sendMsg(401, err.message);
  }
  if (payload.exp <= moment().unix()) {
    return sendMsg(401, '验证信息过期，请重新登录!');
  }
  next();
};
```
