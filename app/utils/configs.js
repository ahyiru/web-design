export const orderList = [
  {
    type: 'vip1',
    label: '基础版',
    price: 29,
    period: 3,
    count: 800,
    description: '提供 OpenAI API 接口代理。\n\n800 次 chatgpt 对话机会，有效期 3 个月。',
  },
  {
    type: 'vip2',
    label: '白银版',
    price: 39,
    period: 6,
    count: 1500,
    description: '提供 OpenAI API 接口代理。\n\n1500 次 chatgpt 对话机会，有效期 6 个月。',
  },
  {
    type: 'vip3',
    label: '黄金版',
    price: 69,
    period: 12,
    count: 3000,
    description: '提供 OpenAI API 接口代理。\n\n3000 次 chatgpt 对话机会，有效期 12 个月。',
  },
];

export const roleList = [
  {
    value: 0,
    label: '普通用户',
    price: 0,
    period: 0,
    name: 'general',
    description: '每天 2 次 chatgpt 对话机会。',
  },
  {
    value: 1,
    label: '基础会员',
    price: 19,
    period: 1,
    name: 'vip1',
    description: '提供 OpenAI API 接口代理。\n\n每天 50 次 chatgpt 对话机会。',
  },
  {
    value: 2,
    label: '白银会员',
    price: 29,
    period: 1,
    name: 'vip2',
    description: '提供 OpenAI API 接口代理。\n\n每天 100 次 chatgpt 对话机会。',
  },
  {
    value: 3,
    label: '黄金会员',
    price: 39,
    period: 1,
    name: 'vip3',
    description: '提供 OpenAI API 接口代理。\n\n每天 200 次 chatgpt 对话机会。',
  },
  {
    value: 4,
    label: '钻石会员',
    price: 49,
    period: 1,
    name: 'vip4',
    description: '提供 OpenAI API 接口代理。\n\n每天 320 次 chatgpt 对话机会。',
  },
  {
    value: 5,
    label: '超级管理员',
    price: 10000,
    period: 10000,
    name: 'vip5',
    description: '提供 OpenAI API 接口代理。\n\n每天 500 次 chatgpt 对话机会。',
  },
];
export const periodList = [
  {
    value: 1,
    label: '1 个月',
  },
  {
    value: 3,
    label: '3 个月',
  },
  {
    value: 6,
    label: '6 个月',
  },
  {
    value: 12,
    label: '12 个月',
  },
  {
    value: 24,
    label: '24 个月',
  },
];
export const methodList = [
  {
    value: 'get',
    label: 'get',
  },
  {
    value: 'post',
    label: 'post',
  },
];
export const paramsList = [
  {
    value: 'data',
    label: 'data',
  },
  {
    value: 'params',
    label: 'params',
  },
  {
    value: 'form',
    label: 'form',
  },
  {
    value: 'formData',
    label: 'formData',
  },
];

export const projectRoleList = [
  {
    value: 0,
    label: '普通',
    color: 'green',
  },
  {
    value: 1,
    label: '重要',
    color: 'orange',
  },
  {
    value: 2,
    label: '核心',
    color: 'red',
  },
];

export const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export const colCfg = {
  sm: 12,
  xs: 12,
};

export const tableCfg = {
  rowKey: 'name',
  pagination: false,
  scroll: {x: true, y: true},
  size: 'small',
};
