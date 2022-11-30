import {Tag, Space, Button} from 'antd';
// import {ExclamationCircleOutlined} from '@ant-design/icons';
import {formatTime} from '@huxy/utils';
import {roleList} from '@app/utils/configs';

export const tabs = [
  {
    key: 1,
    value: '已激活',
  },
  {
    key: 0,
    value: '未激活',
  },
];

export const apiList = {};

export const formList = [
  {
    type: 'input',
    name: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入',
      allowClear: true,
      style: {width: '120px'},
    },
  },
  {
    type: 'select',
    name: 'role',
    label: '等级',
    props: {
      placeholder: '请选择',
      allowClear: true,
      style: {width: '100px'},
      options: roleList,
    },
  },
];

export const actionList = (actions, disabled) => [
  {
    key: 'add',
    type: 'primary',
    label: '新增',
    action: actions['handleAdd'],
  },
  {
    key: 'export',
    type: 'default',
    label: '导出',
    action: actions['handleExport'],
  },
  {
    key: 'handleDelete',
    type: 'default',
    label: '批量删除',
    action: actions['handleDelete'],
    disabled,
  },
];

export const colActions = [
  {
    key: 'handleCheck',
    type: 'link',
    label: '设置',
  },
  {
    key: 'handleEdit',
    type: 'link',
    label: '编辑',
  },
  {
    key: 'handleDelete',
    type: 'link',
    label: '删除',
  },
];

export const tableHeader = [
  {
    dataIndex: 'name',
    title: '用户名',
  },
  {
    dataIndex: 'email',
    title: '邮箱',
  },
  {
    dataIndex: 'active',
    title: '状态',
  },
  {
    dataIndex: 'github',
    title: '绑定GitHub',
  },
  {
    dataIndex: 'role',
    title: '等级',
  },
  {
    dataIndex: 'updatetime',
    title: '更新时间',
  },
  {
    dataIndex: 'updater',
    title: '更新人',
  },
  {
    dataIndex: 'action',
    title: '操作',
    align: 'center',
  },
];

export const colsCfg = actions => [
  {
    dataIndex: 'name',
    render: (text, record) => <a onClick={() => actions.handleCheck(record)}>{text}</a>,
  },
  {
    dataIndex: 'email',
    render: text => text.replace(/\S+(@\S+)/, '*****$1'),
  },
  {
    dataIndex: 'active',
    render: text => (text ? <Tag color="green">已激活</Tag> : <Tag color="red">未激活</Tag>),
  },
  {
    dataIndex: 'github',
    render: text => (text ? <Tag color="green">已激活</Tag> : <Tag color="red">未激活</Tag>),
  },
  {
    dataIndex: 'role',
    render: (text, record) => {
      return roleList.find(v => v.value === text)?.label ?? '-';
    },
  },
  {
    dataIndex: 'updatetime',
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime || +new Date();
      return formatTime(new Date(time));
    },
  },
  {
    dataIndex: 'updater',
    render: (text, record) => text || record.creator,
  },
  {
    dataIndex: 'action',
    render: (text, record) => {
      const disabled = false; // !profile.role && record._id !== profile._id;
      const acList = Object.keys(actions).map(key => ({...colActions.find(item => item.key === key), action: actions[key]}));
      return (
        <Space>
          {acList.map(({key, action, type, label}) => (
            <Button key={key} type={type} size="small" disabled={disabled} danger={key === 'handleDelete'} onClick={() => action(record)}>
              {label}
            </Button>
          ))}
        </Space>
      );
    },
  },
];
