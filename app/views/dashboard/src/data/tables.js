import {Table, Tag, Space, Button} from 'antd';
import {roleList} from '@app/utils/configs';
export const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    ellipsis: true,
    render: (text, record) => <a onClick={() => {}}>{text}</a>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    ellipsis: true,
    render: text => text.replace(/\S+(@\S+)/, '*****$1'),
  },
  {
    title: '状态',
    dataIndex: 'active',
    ellipsis: true,
    render: text => (text ? <Tag color="green">已激活</Tag> : <Tag color="red">未激活</Tag>),
  },
  {
    title: '是否绑定GitHub',
    dataIndex: 'github',
    ellipsis: true,
    render: text => (text ? <Tag color="green">已绑定</Tag> : <Tag color="red">未绑定</Tag>),
  },
  {
    title: '等级',
    dataIndex: 'role',
    ellipsis: true,
    render: (text, record) => {
      return roleList.find(v => v.value === text)?.label ?? '-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    ellipsis: true,
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    ellipsis: true,
    render: (text, record) => text || record.creator,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    ellipsis: true,
    render: (text, record) => {
      return (
        <>
          <Button type="link" size="small" onClick={() => {}}>
            设置权限
          </Button>
          <Button type="link" size="small" onClick={() => {}}>
            编辑
          </Button>
          <Button type="link" size="small" onClick={() => {}} style={{color: 'var(--red2)'}}>
            删除
          </Button>
        </>
      );
    },
  },
];

export const dataSource = [
  {
    name: 'test1',
    email: 'test1@zys.com',
    active: 1,
    github: '',
    role: 1,
    updatetime: '2021-05-12',
    updater: 'admin',
  },
  {
    name: 'test2',
    email: 'test2@zys.com',
    active: 1,
    github: '',
    role: 0,
    updatetime: '2021-05-12',
    updater: 'admin',
  },
  {
    name: 'test3',
    email: 'test3@zys.com',
    active: 1,
    github: {},
    role: 3,
    updatetime: '2021-05-10',
    updater: 'admin',
  },
  {
    name: 'test4',
    email: 'test4@zys.com',
    active: 0,
    github: '',
    role: 0,
    updatetime: '2021-05-12',
    updater: 'admin',
  },
  {
    name: 'admin',
    email: 'admin@zys.com',
    active: 1,
    github: {},
    role: 5,
    updatetime: '2021-05-12',
    updater: 'admin',
  },
  {
    name: 'huy',
    email: 'huy@zys.com',
    active: 1,
    github: '',
    role: 1,
    updatetime: '2021-05-12',
    updater: 'admin',
  },
  {
    name: 'test5',
    email: 'test5@zys.com',
    active: 0,
    github: '',
    role: 0,
    updatetime: '2021-05-15',
    updater: 'admin',
  },
  {
    name: 'test6',
    email: 'test6@zys.com',
    active: 0,
    github: '',
    role: 0,
    updatetime: '2021-05-15',
    updater: 'admin',
  },
  {
    name: 'test7',
    email: 'test7@zys.com',
    active: 1,
    github: '',
    role: 0,
    updatetime: '2021-05-15',
    updater: 'admin',
  },
];
