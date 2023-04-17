export const roleList = [
  {
    value: 0,
    label: '普通用户',
  },
  {
    value: 1,
    label: '组长',
  },
  {
    value: 2,
    label: '普通管理员',
  },
  {
    value: 3,
    label: '项目管理员',
  },
  {
    value: 4,
    label: '区域管理员',
  },
  {
    value: 5,
    label: '超级管理员',
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
