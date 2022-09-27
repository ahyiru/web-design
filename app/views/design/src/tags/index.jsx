import {useState} from 'react';
import {Table, Space, Input, Button, Modal, Form, Tooltip, message} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {useIntls} from '@app/components/intl';
import {formatTime, validObj} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';

import Panel from '@app/components/panel';
import Back from '@app/components/goBack';

// import {userInfoStore} from '@app/store/stores';

import {apiList, defProject} from '../../configs';

const {listTagsFn, deleteTagsFn} = apiList;

const getColumns = ({ handleEdit, handleDelete}) => [
  {
    title: '标签值',
    dataIndex: 'value',
  },
  {
    title: '标签名',
    dataIndex: 'label',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    render: (text, record) => text || record.creator,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    render: (text, record) => {
      const disabled = false; //!profile.role&&record._id!==profile._id;
      return (
        <>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} style={{color: disabled ? 'var(--light-color)' : 'var(--red2)'}}>
            删除
          </Button>
        </>
      );
    },
  },
];

const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.tables', {});
  // const profile = userInfoStore.getState() || {};
  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;
  const stateItem = selItem || (/* profile.projectId ? {_id: profile.projectId, name: profile.projectName, isDef: true} : */ {...defProject, isDef: true});

  const [selectedRows, setSelectedRows] = useState([]);

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listTagsFn, null, {current: pageParams?.current, size: pageParams?.size}, {projectId: stateItem._id});

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
    Modal.confirm({
      title: i18nCfg.delMsg,
      icon: <ExclamationCircleOutlined />,
      content: `label: ${items.map(v => v.label)}`,
      okText: i18nCfg.submit,
      okType: 'danger',
      cancelText: i18nCfg.cancel,
      onOk: async () => {
        const {code, message: msg} = await deleteTagsFn({ids});
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

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
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
  };

  const actions = {
    handleEdit,
    handleDelete,
  };

  const columns = getColumns(actions);

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
        {!stateItem.isDef && (
          <Col>
            <Back back={back} />
          </Col>
        )}
        <Col>
          <Panel>
            <div style={{overflow: 'hidden', marginBottom: '10px'}}>
              <div style={{float: 'left'}}>
                <Space size="small">
                  <Button loading={isPending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                    {i18nCfg.add}
                  </Button>
                  <Button loading={isPending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                    {i18nCfg.batchDelete}
                  </Button>
                </Space>
              </div>
              <div style={{float: 'right'}}>
                <SearchForm submit={searchList} loading={isPending} />
              </div>
            </div>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

const SearchForm = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.tables', {});
  const {submit, loading} = props;
  const [form] = Form.useForm();
  return (
    <Form layout="inline" form={form} initialValues={{}} onFinish={value => submit(validObj(value))}>
      <Form.Item name="label" label="标签名">
        <Input placeholder="请输入" allowClear style={{width: '120px'}} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {i18nCfg.search}
        </Button>
        <Button style={{marginLeft: '12px'}} onClick={() => form.resetFields()}>
          {i18nCfg.reset}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
