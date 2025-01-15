import {useState} from 'react';
import {Table, Space, Input, Button, App, Form, Tooltip, Tag, Radio} from 'antd';
import {DeleteOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, message} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';

import Panel from '@app/components/panel';

import {userInfoStore, notifyStore} from '@app/store/stores';

import apiList from '@app/apis/apiList';

const {listMessageFn, deleteMessageFn, readMessageFn} = apiList;

const readStatus = [
  {
    label: '未读',
    value: 0,
  },
  {
    label: '已读',
    value: 1,
  },
];

const getColumns = ({handleAudit, handleDelete}, isAdmin, status) => [
  {
    title: '类型',
    dataIndex: 'type',
    ellipsis: true,
  },
  {
    title: '主题',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '内容',
    dataIndex: 'context',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    ellipsis: true,
    align: 'center',
    render: text => <Tag color={text ? 'blue' : 'yellow'}>{text ? '已读' : '未读'}</Tag>,
  },
  ...(isAdmin
    ? [
        {
          title: '已读用户',
          dataIndex: 'reader',
          ellipsis: true,
        },
        {
          title: '接收用户',
          dataIndex: 'receiver',
          ellipsis: true,
        },
      ]
    : []),
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    ellipsis: true,
    render: (text, record) => {
      const time = text || record.createtime || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
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
    ellipsis: true,
    align: 'center',
    fixed: 'right',
    render: (text, record) => {
      // const disabled = false; //!profile.role&&record._id !== profile._id;
      return (
        <>
          {status ? null : (
            <Button type="link" size="small" disabled={record.status} onClick={() => handleAudit(record)}>
              标记为已读
            </Button>
          )}
          {isAdmin ? (
            <Button type="link" size="small" onClick={() => handleDelete(record)} danger>
              删除
            </Button>
          ) : null}
        </>
      );
    },
  },
];

const Index = props => {
  const {modal} = App.useApp();
  const profile = userInfoStore.getState() || {};
  const isAdmin = profile.role === 5;

  const [selectedRows, setSelectedRows] = useState([]);
  const [status, setStatus] = useState(0);

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listMessageFn, {current: pageParams?.current, size: pageParams?.size}, null, {status});

  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    modal.confirm({
      title: `确定删除吗？${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `label: ${items.map(v => v.title)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await deleteMessageFn({ids});
        if (code === 200) {
          message.success(msg);
          setSelectedRows([]);
          update({current: 1});
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleAudit = async item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    const {code, message: msg} = await readMessageFn({ids});
    if (code === 200) {
      // message.success(msg);
      setSelectedRows([]);
      update({current: 1});
      notifyStore.setState(count => count - ids.length);
    }
  };

  const switchRead = e => {
    const {value} = e.target;
    setStatus(value);
    update({current: 1, status: value});
  };

  const rowSelection =
    status && !isAdmin
      ? null
      : {
          selectedRowKeys: selectedRows.map(v => v._id),
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
          },
          getCheckboxProps: record => ({
            // disabled:!profile.role&&record._id!==profile._id,
          }),
          columnWidth: '30px',
          fixed: true,
        };

  const actions = {
    handleDelete,
    handleAudit,
  };

  let columns = getColumns(actions, isAdmin, status);

  columns = status && !isAdmin ? columns.slice(0, -1) : columns;

  const {pending, data} = result;

  const {total, current, size, list} = data || {};

  const pagination = {
    onShowSizeChange: (current, size) => pageChange(current, size),
    onChange: (current, size) => pageChange(current, size),
    showSizeChanger: true,
    showQuickJumper: true,
    total: total || 1,
    current: current || 1,
    pageSize: size || 10,
    pageSizeOptions: ['10', '20', '30', '40'],
  };

  return (
    <div>
      <Row>
        <Col>
          <Panel>
            <SearchForm
              submit={searchList}
              loading={pending}
              handler={
                <Space size="small">
                  <Radio.Group optionType="button" buttonStyle="solid" options={readStatus} onChange={switchRead} value={status} />
                  {
                    <>
                      {status ? null : (
                        <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleAudit()} type="primary" icon={<EyeOutlined />}>
                          批量标记
                        </Button>
                      )}
                      {isAdmin ? (
                        <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                          批量删除
                        </Button>
                      ) : null}
                    </>
                  }
                </Space>
              }
            >
              <Form.Item name="title" label="主题">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </SearchForm>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={pending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
