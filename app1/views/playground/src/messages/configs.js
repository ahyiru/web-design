import {Tag, Space, Button} from 'antd';
import {formatTime} from '@huxy/utils';
import {roleList} from '@app/utils/configs';

import * as apis from './mock';
import columns, {RenderItem as Item} from './getColumns';

export const apiList = apis;

export const getColumns = columns;
export const RenderItem = Item;

export const tabs = [
  {
    key: 1,
    value: '已读',
  },
  {
    key: 0,
    value: '未读',
  },
];

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
    key: 'handleCheck',
    type: 'primary',
    label: '标记为已读',
    action: actions['handleCheck'],
    disabled,
  },
];

export const colActions = [
  {
    key: 'handleCheck',
    type: 'link',
    label: '标记已读',
  },
];

export const tableHeader = [
  {
    dataIndex: 'name',
    title: '用户名',
  },
  {
    dataIndex: 'message',
    title: '信息',
  },
  {
    dataIndex: 'active',
    title: '状态',
  },
  /* {
    dataIndex: 'github',
    title: '绑定GitHub',
  }, */
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
    render: (text, record) =>
      record.active ? (
        text
      ) : (
        <span className="link" onClick={() => actions.handleCheck(record)}>
          {text}
        </span>
      ),
  },
  {
    dataIndex: 'active',
    render: text => (text ? <Tag color="green">已读</Tag> : <Tag color="red">未读</Tag>),
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
      const disabled = record.active; // !profile.role && record._id !== profile._id;
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
