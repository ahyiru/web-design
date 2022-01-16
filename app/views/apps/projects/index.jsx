import {useState} from 'react';
import {Table, Tag, Space, Input, Button, Modal, Form, Tooltip, message} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {projectRoleList} from '@app/utils/config';
import Row,{Col} from 'ihuxy-components/grid';
import {formatTime} from 'ihuxy-utils/formatTime';
import validObj from 'ihuxy-utils/validObj';
import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';

import Panel from '@app/components/panel';
import Ellipsis from '@app/components/ellipsis';

const {listProjectFn, deleteProjectFn} = apiList;

const getColumns = ({handleRouter, handleEdit, handleDelete, handleApis}, profile, i18ns) => [
  {
    title: i18ns.name,
    dataIndex: 'name',
    width: 60,
    render: (text, record) => <a onClick={() => handleRouter(record)}>{text}</a>,
  },
  /* {
    title: '项目类型',
    dataIndex: 'type',
  }, */
  {
    title: i18ns.description,
    dataIndex: 'description',
    width: 80,
    ellipsis: true,
    // render: text => <Tooltip title={text}>{text}</Tooltip>,
    render: (text) => <Ellipsis>{text}</Ellipsis>,
  },
  {
    title: i18ns.role,
    dataIndex: 'role',
    width: 50,
    render: (text) => {
      const {label, color} = projectRoleList.find((v) => v.value == text) || {};
      return label ? <Tag color={color}>{label}</Tag> : '-';
    },
  },
  {
    title: i18ns.target,
    dataIndex: 'target',
    width: 50,
    render: (text, record) => text || '/',
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    width: 80,
    ellipsis: true,
    render: (text, record) => {
      const time = text || record.createtime || +new Date();
      const txt = formatTime(new Date(time));
      // return <Tooltip title={txt}>{txt}</Tooltip>;
      return <Ellipsis>{txt}</Ellipsis>;
    },
  },
  {
    title: i18ns.updater,
    dataIndex: 'updater',
    width: 60,
    render: (text, record) => text || record.creator,
  },
  {
    title: i18ns.action,
    dataIndex: 'action',
    align: 'center',
    width: 150,
    render: (text, record) => {
      const disabled = false; //!profile.role&&record._id!==profile.projectId;
      return (
        <>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleRouter(record)}>
            {i18ns.router_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleApis(record)}>
            {i18ns.api_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleEdit(record)}>
            {i18ns.edit_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} style={{color: disabled ? 'var(--light-color)' : 'var(--red2)'}}>
            {i18ns.delete_action}
          </Button>
          {/* <Popconfirm title="确认删除?" onConfirm={()=>handleDelete(record)}>
          <a style={{color:'var(--red2)'}}>删除</a>
        </Popconfirm> */}
        </>
      );
    },
  },
];

const Index = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);
  // const [modalItem,setModalItem]=useState(null);
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main.projects ?? {};
  const {tableHeaderText = {}, actionsText = {}, searchFormText = {}} = i18nCfg;
  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listProjectFn, null, {current: pageParams?.current, size: pageParams?.size});

  const handleRouter = (item) => {
    props.router.push({
      path: `./router/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleApis = (item) => {
    props.router.push({
      path: `./api/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleEdit = (item) => {
    // setModalItem(item);
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleAdd = async () => {
    // setModalItem({});
    // update();
    props.router.push(`./add`);
  };
  const handleDelete = (item) => {
    const items = item ? [item] : selectedRows;
    const ids = items.map((v) => v._id);
    Modal.confirm({
      title: actionsText.delete_confirm,
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map((v) => v.name)}`,
      okText: actionsText.delete_confirm_ok,
      okType: 'danger',
      cancelText: actionsText.delete_confirm_cancel,
      onOk: async () => {
        const {code, message: msg} = await deleteProjectFn({ids});
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
  const handleModalOk = (values) => {
    console.log(values);
  };

  const profile = props.store.getState('profile');

  const rowSelection = {
    selectedRowKeys: selectedRows.map((v) => v._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: !profile.role && record._id !== profile._id,
    }),
    columnWidth: '30px',
  };

  const actions = {
    handleRouter,
    handleEdit,
    handleDelete,
    handleApis,
  };

  const columns = getColumns(actions, profile, {...tableHeaderText, ...actionsText});

  const {isPending, data} = result;

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
            <div style={{float: 'left'}}>
              <Space size="small">
                <Button loading={isPending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                  {actionsText.add_action}
                </Button>
                <Button loading={isPending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                  {actionsText.batch_action}
                </Button>
              </Space>
            </div>
            <div style={{float: 'right'}}>
              {/* <Search loading={isPending} placeholder="请输入用户名" allowClear onSearch={value=>searchList({keyword:value})} enterButton /> */}
              <SearchForm submit={searchList} loading={isPending} searchFormText={searchFormText} />
            </div>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

const SearchForm = (props) => {
  const {submit, loading, searchFormText} = props;
  const [form] = Form.useForm();
  return (
    <Form layout="inline" form={form} initialValues={{}} onFinish={(value) => submit(validObj(value))}>
      <Form.Item name="name" /* label={searchFormText.name} */>
        <Input placeholder={searchFormText.name} allowClear style={{width: '120px'}} />
      </Form.Item>
      {/* <Form.Item name="role" label="等级">
      <Select placeholder="请选择" allowClear style={{width:'100px'}}>
        {
          projectRoleList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
        }
      </Select>
    </Form.Item> */}
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {searchFormText.submit}
        </Button>
        {/* <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button> */}
      </Form.Item>
    </Form>
  );
};

export default Index;
