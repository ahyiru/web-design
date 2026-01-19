import {useState} from 'react';
import {Table, Space, Input, Button, App, Form, Tooltip, Tag} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, dlfile, message} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {apiList, status} from '../configs';

import OperatingModal from './operatingModal';

const {listDemandFn, deleteDemandFn, completeDemandFn} = apiList;

const getColumns = ({handleEdit, handleDelete, handleOperating}, profile) => [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    render: (text, record) => (
      <a className="link" onClick={() => handleEdit(record, true)}>
        {text}
      </a>
    ),
  },
  {
    title: '需求描述',
    dataIndex: 'content',
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span className="ellipsis" style={{width: '220px'}}>
          {text}
        </span>
      </Tooltip>
    ),
  },
  {
    title: '可见性',
    dataIndex: 'visibility',
    align: 'center',
    ellipsis: true,
    render: text => <Tag color={text ? 'green' : 'red'}>{text ? '公开' : '私有'}</Tag>,
  },
  {
    title: '其它说明',
    dataIndex: 'description',
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span className="ellipsis" style={{width: '180px'}}>
          {text}
        </span>
      </Tooltip>
    ),
  },
  {
    title: '附件',
    dataIndex: 'attachment',
    ellipsis: true,
    render: text => {
      if (!text) {
        return '-';
      }
      const filename = text.split('/').slice(-1)[0];
      const [name, ext] = filename.split('.');
      return (
        <a className="link" onClick={() => dlfile(text, ext, name)}>
          附件.{ext}
        </a>
      );
    },
  },
  {
    title: '原型地址',
    dataIndex: 'sample',
    ellipsis: true,
    render: text =>
      text ? (
        <a className="link" href={text} target="_blank">
          {text}
        </a>
      ) : (
        ''
      ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    render: text => {
      const {label, color} = status.find(({value}) => value === text) ?? status[1];
      return <Tag color={color}>{label}</Tag>;
    },
  },
  {
    title: '完成说明',
    dataIndex: 'instruction',
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span className="ellipsis" style={{width: '180px'}}>
          {text}
        </span>
      </Tooltip>
    ),
  },
  {
    title: '演示地址',
    dataIndex: 'demo',
    ellipsis: true,
    render: text =>
      text ? (
        <a className="link" href={text} target="_blank">
          {text}
        </a>
      ) : (
        ''
      ),
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    ellipsis: true,
    render: text => {
      const time = text || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
  },
  /* {
    title: '更新人',
    dataIndex: 'updater',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    ellipsis: true,
    render: text => {
      const time = text || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
  }, */
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    ellipsis: true,
    fixed: 'right',
    render: (text, record) => {
      const disabled = profile.role !== 5 && record.uid !== profile.id;
      return (
        <>
          {profile.role === 5 ? (
            <Button type="link" size="small" disabled={![0, 1].includes(record.status)} onClick={() => handleOperating(record)}>
              操作
            </Button>
          ) : null}
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

  const [operatingItem, setOperatingItem] = useState();

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listDemandFn, {current: pageParams?.current, size: pageParams?.size});

  const handleEdit = (item, isCkeck = false) => {
    props.router.push({
      path: `./edit/${item.id}`,
      state: {item, backState: {path: props.path, params: {current, size}, state: {item: selItem, backState}}, isCkeck},
    });
  };
  const handleAdd = async () => {
    props.router.push(`./add`);
  };
  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v.id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    modal.confirm({
      title: `确定删除吗？${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `title: ${items.map(v => v.title)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await deleteDemandFn({ids});
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
  const handleComplete = async values => {
    const {id, status} = operatingItem;
    values.id = id;
    if ([0, 1].includes(status)) {
      values.status = status + 1;
    }
    try {
      const {code, message: msg} = await completeDemandFn(values);
      if (code === 200) {
        message.success(msg);
        setOperatingItem(null);
        update();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: profile.role !== 5 && record.uid !== profile.id,
    }),
    columnWidth: '30px',
    fixed: true,
  };

  const actions = {
    handleEdit,
    handleDelete,
    handleOperating: setOperatingItem,
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
              <Form.Item name="title" label="标题">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </SearchForm>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={pending} size="small" bordered rowKey="id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
      <OperatingModal onOk={handleComplete} onCancel={() => setOperatingItem(null)} open={!!operatingItem} item={operatingItem} />
    </div>
  );
};

export default Index;
