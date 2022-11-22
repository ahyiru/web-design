import {useState} from 'react';
import {Table, Space, Input, Button, Modal, Form, Tooltip, message} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, validObj} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';

import Panel from '@app/components/panel';

import Back from '@app/components/goBack';

import {userInfoStore} from '@app/store/stores';

import {useIntls} from '@app/components/intl';

import apiList from '@app/utils/getApis';
import {defProject} from '@app/configs';

const {listApiFn, deleteApiFn} = apiList;

/* const searchFormItems=()=><>
  <Form.Item name="name" label="用户名">
    <Input placeholder="请输入" />
  </Form.Item>
  <Form.Item name="email" label="邮箱">
    <Input placeholder="请输入" />
  </Form.Item>
</>; */

const getColumns = ({handleTest, handleEdit, handleDelete}, profile, i18ns) => [
  {
    title: i18ns.name,
    dataIndex: 'name',
    render: (text, record) => <a onClick={() => handleTest(record)}>{text}</a>,
  },
  {
    title: i18ns.tags,
    dataIndex: 'tags',
  },
  {
    title: i18ns.url,
    dataIndex: 'url',
  },
  {
    title: i18ns.method,
    dataIndex: 'method',
  },
  {
    title: i18ns.dataType,
    dataIndex: 'dataType',
  },
  {
    title: i18ns.auth,
    dataIndex: 'auth',
  },
  {
    title: i18ns.input,
    dataIndex: 'input',
    render: (text, record) => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: i18ns.output,
    dataIndex: 'output',
    render: (text, record) => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
  },
  {
    title: i18ns.updater,
    dataIndex: 'updater',
    render: (text, record) => text || record.creator,
  },
  {
    title: i18ns.action,
    dataIndex: 'action',
    align: 'center',
    render: (text, record) => {
      const disabled = false; //!profile.role&&record._id!==profile._id;
      return (
        <>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleTest(record)}>
            {i18ns.test_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleEdit(record)}>
            {i18ns.edit_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} style={{color: disabled ? 'var(--light-color)' : 'var(--red2)'}}>
            {i18ns.delete_action}
          </Button>
        </>
      );
    },
  },
];

const Index = props => {
  const getIntls = useIntls();
  const profile = userInfoStore.getState();
  const i18nCfg = getIntls('main.projectApis', {});
  const {tableHeaderText = {}, actionsText = {}, searchFormText = {}} = i18nCfg;

  const backState = props.history.getState()?.backState;
  const selItem = props.history.getState()?.item;
  const stateItem = selItem || (profile.projectId ? {_id: profile.projectId, name: profile.projectName, isDef: true} : defProject);

  const [selectedRows, setSelectedRows] = useState([]);

  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listApiFn, {projectId: stateItem._id}, {current: pageParams?.current, size: pageParams?.size});

  const handleTest = item => {
    // console.log(item);
    props.router.push({
      path: `./test/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}, state: {item: selItem, backState}}},
    });
  };
  const handleEdit = item => {
    // setModalItem(item);
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}, state: {item: selItem, backState}}},
    });
  };
  const handleAdd = async () => {
    // setModalItem({});
    // update();
    props.router.push(`./add`);
  };
  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    Modal.confirm({
      title: actionsText.delete_confirm,
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v => v.name)}`,
      okText: actionsText.delete_confirm_ok,
      okType: 'danger',
      cancelText: actionsText.delete_confirm_cancel,
      onOk: async () => {
        const {code, message: msg} = await deleteApiFn({ids});
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
  const handleModalOk = values => {
    console.log(values);
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
    handleTest,
    handleEdit,
    handleDelete,
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
        {!stateItem.isDef && (
          <Col>
            <Back back={back} />
          </Col>
        )}
        {/* <Col>
        <Panel>
          <div>
            <span>项目名称：</span>
            <span>{stateItem.name}</span>
          </div>
          <div>
            <span>target：</span>
            <span>{stateItem.target}</span>
          </div>
        </Panel>
      </Col> */}
        <Col>
          <Panel>
            <div style={{overflow: 'hidden', marginBottom: '10px'}}>
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
            </div>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
      {/* <FormModal modalItem={modalItem} handleOk={handleModalOk} onCancel={()=>setModalItem(null)} /> */}
    </div>
  );
};

const SearchForm = props => {
  const {submit, loading, searchFormText} = props;
  const [form] = Form.useForm();
  return (
    <Form layout="inline" form={form} initialValues={{}} onFinish={value => submit(validObj(value))}>
      <Form.Item name="url" label={searchFormText.url}>
        <Input placeholder={searchFormText.url_placeholder} allowClear style={{width: '120px'}} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {searchFormText.submit}
        </Button>
        <Button style={{marginLeft: '12px'}} onClick={() => form.resetFields()}>
          {searchFormText.reset}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
