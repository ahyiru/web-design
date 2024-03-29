const router = {
  '/': '首页',
  '/404': '404',
  '/layout': '框架配置',
  '/monitor': '页面监控',
  '/files': '文件管理',
  '/profile': '个人中心',
  '/messages': '消息管理',
  '/md2html': '文档管理',
  '/bigscreen': '大屏',
  '/carmodel': '汽车模型',
  '/chatbot': 'AI助手',
  '/wschat': '聊天室',
  '/send-messages': '消息留言',
  '/user': '登录注册',
  '/user/signin': '登录',
  '/user/signup': '注册',
  '/user/verifyEmail': '验证邮箱',
  '/user/setNewPwd': '重置密码',
  '/apps': 'Apps',
  '/apps/projects': '项目管理',
  '/apps/projects/add': '添加项目',
  '/apps/projects/edit/:projectId': '编辑项目',
  '/apps/projects/router/:projectId': '项目路由设置',
  '/apps/projects/router/:projectId/:routerId': '页面设计',
  '/apps/projects/api/:projectId': '项目接口管理',
  '/apps/projects/api/:projectId/add': '添加接口',
  '/apps/projects/api/:projectId/edit/:id': '编辑接口',
  '/apps/projects/api/:projectId/test/:id': '接口测试',
  '/apps/users': '用户管理',
  '/apps/users/add': '添加用户',
  '/apps/users/edit/:id': '编辑用户',
  '/apps/users/auth/:id': '路由权限设置',
  '/apps/apis': '接口管理',
  '/apps/apis/add': '添加接口',
  '/apps/apis/edit/:id': '编辑接口',
  '/apps/apis/test/:id': '接口测试',
  '/low-code': '低代码',
  '/preview': '预览',
  '/low-code/dom': '原生Dom',
  '/low-code/ui': 'UI组件',
  '/low-code/users': '业务组件',
  '/low-code/users/add': '新增用户',
  '/dashboard': '仪表盘',
  '/dashboard/screen1': '模板1',
  '/dashboard/bigscreen': '大屏',
  '/dashboard/carmodel': '汽车模型',
  '/prompt': 'Prompt',
  '/prompt/prompt': '提示列表',
  '/prompt/prompt/add': '新增提示',
  '/prompt/prompt/edit/:id': '编辑提示',
  '/payer': '会员管理',
  '/payer/count': '包次会员',
  '/payer/count/member': '开通会员',
  '/payer/count/order': '订单列表',
  '/payer/count/pay': '支付',
  '/payer/month': '包月会员',
  '/payer/month/member': '开通会员',
  '/payer/month/order': '订单列表',
  '/payer/month/pay': '支付',
  '/demand': '需求管理',
  '/demand/demand': '需求列表',
  '/demand/demand/add': '新增需求',
  '/demand/demand/edit/:id': '编辑需求',
};

export default router;
