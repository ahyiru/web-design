import {useState, useEffect} from 'react';
import {Table} from 'antd';
import {Row, Col} from '@huxy/components';
import {formatTime} from '@huxy/utils';

import Panel from '@app/components/panel';

import {wsMsg} from '@app/apis/socket';

const formatUser = user => user.map(({userid, time}) => {
  const [name, email, ip] = userid.split('_huxy_');
  return {userid, name, email, ip, time};
});

const getColumns = () => [
  {
    title: '用户名',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    ellipsis: true,
  },
  {
    title: '上线时间',
    dataIndex: 'time',
    ellipsis: true,
    render: text => formatTime(new Date(text)),
  },
];

const Index = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = wsMsg();
    ws.on('msg:userinfo', users => {
      setUsers(formatUser(users));
    });
  }, []);

  const columns = getColumns();

  const count = users.length;

  const pagination = {
    total: count || 1,
    current: 1,
    pageSize: count || 10,
  };

  return (
    <Row>
      <Col>
        <Panel>
          <h4>当前在线人数：{count}</h4>
          <Table pagination={pagination} columns={columns} dataSource={users} size="small" bordered rowKey="userid" scroll={{x: true}} />
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
