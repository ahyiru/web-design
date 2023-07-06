import {useState} from 'react';
import {Table, Input, Button, Modal, Form, Tooltip, Tag} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, message} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';
import {roleList} from '@app/utils/configs';

import apiList from '@app/apis/apiList';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

const {listOrderFn, deleteOrderFn, auditOrderFn, cancelOrderFn} = apiList;

const getColumns = ({handleDelete, handleAudit, handlePay, handleCancel}, isAdmin) => [
  {
    title: '订单号',
    dataIndex: 'order',
    ellipsis: true,
  },
  {
    title: '订单类型',
    dataIndex: 'orderRole',
    ellipsis: true,
    render: text => roleList.find(item => item.value === text)?.label ?? '-',
  },
  {
    title: '消费',
    dataIndex: 'price',
    ellipsis: true,
    render: text => `${text} 元`,
  },
  {
    title: '周期',
    dataIndex: 'period',
    ellipsis: true,
    render: text => `${text} 个月`,
  },
  {
    title: '名称',
    dataIndex: 'label',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    ellipsis: true,
    align: 'center',
    render: (text, record) => <Tag color={record.deleted ? 'yellow' : text ? 'green' : 'red'}>{record.deleted ? '已失效' : text ? '已审核' : '未审核'}</Tag>,
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
    ellipsis: true,
    render: text => text ? formatTime(new Date(text)) : '-',
  },
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
    render: (text, record) => {
      if (isAdmin) {
        return <>
          <Button type="link" size="small" disabled={!!record.status || record.deleted} onClick={() => handleAudit(record)}>
            审核
          </Button>
          <Button type="link" size="small" onClick={() => handleDelete(record)} danger>
            删除
          </Button>
        </>;
      }
      return record.status ? <Button type="link" size="small" disabled>已支付</Button>
        : record.deleted ? <Button type="link" size="small" disabled>已失效</Button> : <>
          <Button type="link" size="small" onClick={() => handleCancel(record)}>取消订单</Button>
          <Button type="link" size="small" onClick={() => handlePay(record)}>去支付</Button>
        </>;
    },
  },
];

const Index = props => {
  const profile = userInfoStore.getState() || {};
  const {role} = profile;
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;

  const [selectedRows, setSelectedRows] = useState([]);

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listOrderFn, {current: pageParams?.current, size: pageParams?.size});

  const handlePay = info => {
    props.router.push({
      path: `/payer/month/pay`,
      state: {info},
    });
  };
  const handleEdit = item => {
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}, state: {item: selItem, backState}}},
    });
  };
  const handleAdd = async () => {
    props.router.push(`./add`);
  };
  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    // const ids = items.map(v => v._id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    Modal.confirm({
      title: `确定删除吗？${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `orderNo: ${items.map(v => v.order)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await deleteOrderFn({items});
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
    const {code, message: msg} = await auditOrderFn(item);
    if (code === 200) {
      message.success(msg);
      // setSelectedRows([]);
      update({current: 1});
    }
  };
  const handleCancel = async item => {
    const {code, message: msg} = await cancelOrderFn(item);
    if (code === 200) {
      message.success(msg);
      update({current: 1});
    }
  };

  /* const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled:!profile.role&&record._id!==profile._id,
    }),
    columnWidth: '30px',
  }; */

  const actions = {
    handlePay,
    handleDelete,
    handleAudit,
    handleCancel,
  };

  const columns = getColumns(actions, role === 5);

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
              /* handler={
                <Space size="small">
                  <Button loading={pending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                    添加
                  </Button>
                  <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                    批量删除
                  </Button>
                </Space>
              } */
            >
              <Form.Item name="order" label="订单号">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </SearchForm>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} /* rowSelection={rowSelection} */ columns={columns} dataSource={list ?? []} loading={pending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
