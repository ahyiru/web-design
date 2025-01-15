import {useState} from 'react';
import {Table, Space, Input, Button, Modal, Form, Tooltip, Tag, App} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, message} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {apiList} from '../configs';

const {listPromptFn, deletePromptFn, auditPromptFn} = apiList;

const getColumns = ({handleEdit, handleDelete, handleAudit}, profile) => [
  /* {
    title: '分类',
    dataIndex: 'category',
    ellipsis: true,
  }, */
  /* {
    title: '类型',
    dataIndex: 'type',
    ellipsis: true,
  }, */
  {
    title: 'label',
    dataIndex: 'label',
    ellipsis: true,
  },
  {
    title: 'value',
    dataIndex: 'value',
    ellipsis: true,
  },
  {
    title: '类型',
    dataIndex: 'userRole',
    ellipsis: true,
    align: 'center',
    render: text => <Tag color={text == -1 ? 'green' : 'red'}>{text == -1 ? '通用' : '私有'}</Tag>,
  },
  {
    title: '状态',
    dataIndex: 'audited',
    ellipsis: true,
    align: 'center',
    render: text => <Tag color={text ? 'green' : 'red'}>{text ? '已' : '未'}审核</Tag>,
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    ellipsis: true,
    render: (text, record) => text || record.creator,
  },
  ...(profile.role === 5
    ? [
        {
          title: '使用情况',
          dataIndex: 'visibility',
          ellipsis: true,
          align: 'center',
          render: text => <Tag color={text ? 'green' : 'red'}>{text ? '使用中' : '已删除'}</Tag>,
        },
      ]
    : []),
  {
    title: 'prompt',
    dataIndex: 'prompt',
    ellipsis: true,
    width: '100px',
  },
  /* {
    title: '标签',
    dataIndex: 'tag',
    ellipsis: true,
  }, */
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
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    align: 'center',
    fixed: 'right',
    render: (text, record) => {
      const disabled = false; //!profile.role&&record._id !== profile._id;
      return (
        <>
          <Button type="link" size="small" disabled={record.audited} onClick={() => handleAudit(record)}>
            审核
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} danger>
            删除
          </Button>
        </>
      );
    },
  },
];

const Index = props => {
  const {modal} = App.useApp();
  const profile = userInfoStore.getState() || {};
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;

  const [selectedRows, setSelectedRows] = useState([]);

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listPromptFn, {current: pageParams?.current, size: pageParams?.size});

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
    const ids = items.map(v => v._id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    modal.confirm({
      title: `确定删除吗？${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `label: ${items.map(v => v.label)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await deletePromptFn({ids});
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
  const handleAudit = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    modal.confirm({
      title: `确定通过审核吗？${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `label: ${items.map(v => v.label)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await auditPromptFn({ids});
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

  const rowSelection = {
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
    handleEdit,
    handleDelete,
    handleAudit,
  };

  const columns = getColumns(actions, profile);

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
                  <Button loading={pending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                    添加
                  </Button>
                  <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                    批量删除
                  </Button>
                </Space>
              }
            >
              <Form.Item name="label" label="标签名">
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
