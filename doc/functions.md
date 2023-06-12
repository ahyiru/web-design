[toc]

## 系统功能

### [系统工具](./tools.md)

[系统工具](./tools.md) 提供了项目构建、状态管理、路由、接口请求等功能函数。

### 主题配置

![theme](./src/theme.png)

#### 颜色与大小

通过 css 变量来实现页面 样式实时更新。

```javascript
const sizes = {
  '--maxWidth': '100vw',
  '--menuWidth': '20.4rem',
  '--collapseWidth': '6rem',
  '--collapseMenuWidth': '16.4rem',
  '--headerHeight': '5.8rem',
  '--footerHeight': '4.3rem',
  '--breadHeight': '3.6rem',
  '--menuItemHeight': '3.9rem',
};
const colors = {
  '--appColor': '#495057',
  '--appBgColor': '#f8f8fb',
  '--bannerBgColor': '#2a3042',
  '--navBgColor': '#ffffff',
  '--menuBgColor': '#2a3042',
  '--panelBgColor': '#ffffff',
  '--linkColor': '#455a64',
  '--linkHoverColor': 'var(--blue1)',
  '--linkActiveColor': 'var(--blue2)',
  '--asideLinkColor': '#f0f0f0',
  '--bannerLinkColor': '#f0f0f0',
  '--borderColor': '#eff2f7',
};

export default {
  sizes,
  colors,
};
```

#### Layout 配置

![layout](./src/layout.png)

配置菜单类型与头部栏的显示隐藏，菜单类型有侧边栏菜单、头部菜单、组合菜单三种。

```javascript
const [menuType, setMenuType] = useMenuTypeStore({
  menu: 'vertical', // 'horizontal', 'compose'
  header: true,
});
```

### i18n配置

![lang](./src/lang.png)

#### 1. 获取配置的语言或系统语言。

```javascript
const getLang = () => storage.get('language') || sysLang();
```

#### 2. 根据语言类型加载语言包。

```javascript
const getI18n = async () => {
  const language = getLang();
  let i18ns = await import(`@app/i18ns/${language}`);
  i18ns = i18ns.default ?? i18ns;
  i18nsStore.setState(i18ns);
  return {i18ns, language};
};
```

#### 3. 语言包配置

例如：登录页面 `@app/i18ns/zh/login`

```javascript
const login = {
  username: '用户名',
  password: '密码',
  login: '登录',
  visitor: '游客登录',
  signup: '注册',
  forgetPwd: '忘记密码',
  thirdParty: '第三方登录',
  email: '邮箱',
  confirmPwd: '确认密码',
  backLogin: '返回登录',
  signup_msg: '注册成功！',
  signup_sub_msg: '已向您的邮箱发送激活链接，请及时查收激活！',
  confirmEmail: '邮箱验证',
  verifyEmail_msg: '验证成功！',
  verifyEmail_sub_msg: '已向您的邮箱发送重置密码链接，请及时查收！',
  resetPwd: '重置密码',
};

export default login;
```

#### 4. 使用

a. 使用 `i18nsStore` 获取：

```javascript
const Index = props => {
  const i18ns = i18nsStore.getState();
  return <Layout
    title={i18ns?.title}
    {...props}
  />;
};
```

b. 使用 `Intls` 组件：

```javascript
<div style={backStyle}>
  <Button onClick={e => (typeof back === 'function' ? back() : history.back())} className="sm link">
    <Icon icon="ico-left" />
    <span>
      <Intls keys="main.components.back">{backText}</Intls>
    </span>
  </Button>
</div>
```
- backText：默认文本

c. 使用 `getIntls` 获取：

```javascript
const themeList = getIntls => [
  {
    name: getIntls('theme.light', 'light'),
    key: 'light',
    list: light,
    type: 'theme',
  },
  {
    name: getIntls('theme.light1', 'light1'),
    key: 'light1',
    list: light1,
    type: 'theme',
  },
];
```

`getIntls` 函数第二个参数为默认文本。

d. 使用 `useIntls` 获取：

```javascript
const Index = props => {
  const getIntls = useIntls();
  const addFormText = getIntls('main.projects.addFormText', {});
  ...
};
```

### 路由配置

#### 在线配置

![router](./src/router.png)

#### 本地配置

```javascript
const routes = {
  path: '/prompt',
  name: 'prompt',
  icon: 'BulbOutlined',
  children: [
    {
      path: '/prompt',
      name: '提示',
      icon: 'ico-flag',
      component: () => import('./src'),
    },
    {
      path: '/prompt/add',
      name: '添加prompt',
      hideMenu: true,
      component: () => import('./src/add'),
    },
    {
      path: '/prompt/edit/:id',
      name: '编辑prompt',
      component: () => import('./src/add'),
    },
  ],
};

export default routes;

// router configs

export default {
  browserRouter,
  beforeRender,
  basepath,
  errorBoundary,
  afterRender,
  routers: [routes],
};
```

使用：

```javascript
const {output, loading, updateRouter} = useRouter(routerCfgs);
```

### 权限管理

配置用户路由权限。

![auth](./src/auth.png)

### API管理

![api](./src/api.png)

#### 获取API

```javascript
const getApis = () => fetcher({url: '/api/list', params: {projectId: defProject?._id, current: 1, size: 100}});
```

#### 根据API信息构建请求函数

```javascript
const apiList = {};

export const getApiFn = async () => {
  let apis = [];
  try {
    apis = await getApis();
  } catch (err) {}
  apis.map(api => {
    const {name, fnName, dataType, url, isDl, ...rest} = api;
    const funcName = fnName ?? `${name}Fn`;
    const paramsKey = dataType || (rest.method === 'post' ? 'data' : 'params');
    apiList[funcName] = data => fetcher({...rest, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data});
  });
  return apiList;
};

export default apiList;
```

#### 后台服务

例如：

```javascript
export const listTags = (req, res) => {
  queryList(db, req.query, 'label')
    .then(result => {
      res.status(200).send({result});
    })
    .catch(error => {
      res.status(res.statusCode).send({error});
    });
};
```

![apiTest](./src/apiTest.png)

### 用户管理

![project](./src/project.png)

### 角色管理

![user](./src/user.png)

![profile](./src/profile.png)

### 监控管理

![monitor](./src/monitor.png)

设置路由/页面监控点：

```javascript
const report = params => {
  if (!browserRouter || !isAuthed()) {
    return;
  }
  const routeInfo = getRoute();
  const routes = routeInfo ? routeInfo.current.slice(-1)[0] ?? {} : {};
  const {path, name, ...restParams} = params;
  const currentPath = routes.path ?? path ?? '';
  const reportInfo = {
    ...info,
    ...restParams,
    route: browserRouter ? currentPath : currentPath.slice(1),
    routeName: routes.name ?? name,
  };
  apiList.addReportFn?.(reportInfo);
};

// 使用
const handleNavClick = (props, item) => {
  report({
    actionType: 'click',
    category: 'navbar',
    text: item.name || item.title || item.key,
    value: item.key || item.name,
  });
  ...
};
```

### 会员管理

![member](./src/member.png)

### 订单管理

![order](./src/order.png)

### 消息管理

![message](./src/message.png)

### 邮件管理

![email](./src/email.png)

### 页面管理

![pageDesign](./src/pageDesign.png)

![pageView](./src/pageView.png)

### 文件管理

![file](./src/file.png)

### 文档管理

![doc](./src/doc.png)

#### 配置：

```javascript
const contextRequire = import.meta.webpackContext('../../../../doc', {
  recursive: true,
  regExp: /^\.\/(.+)\.md$/,
});

export const listFiles = async () => await contextRequire.keys().map(name => ({name: name.replace(/^\.\/(.+)\.md$/, '$1')}));

export const getContext = async ({folder, name, type = ''}) => (await import(`@app/doc/${folder}/${name}${type}`))?.default;
```

#### 使用：

```javascript
import {Link} from '@huxy/router';
import {Md2html} from '@huxy/components';
import marked from '@app/utils/marked';
import {getContext, listFiles} from './configs';

const configs = {
  Link,
  marked,
  getContext,
  listFiles,
  title: '文档系统',
};

const MdDoc = props => <Md2html router={props.router} params={props.params} {...configs} />;

export default MdDoc;
```
