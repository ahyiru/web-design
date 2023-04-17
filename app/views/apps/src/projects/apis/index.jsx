import {useState} from 'react';
import {Table, Space, Input, Button, Modal, Form, Tooltip} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';

import Panel from '@app/components/panel';

import Back from '@app/components/goBack';

import {userInfoStore} from '@app/store/stores';

import {useIntls} from '@app/components/intl';

import {message} from '@app/utils/staticFunction';
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
    ellipsis: true,
    render: (text, record) => (
      <span className="link" onClick={() => handleTest(record)}>
        {text}
      </span>
    ),
  },
  {
    title: i18ns.tags,
    dataIndex: 'tags',
    ellipsis: true,
  },
  {
    title: i18ns.url,
    dataIndex: 'url',
    ellipsis: true,
  },
  {
    title: i18ns.method,
    dataIndex: 'method',
    ellipsis: true,
  },
  {
    title: i18ns.dataType,
    dataIndex: 'dataType',
    ellipsis: true,
  },
  {
    title: i18ns.auth,
    dataIndex: 'auth',
    ellipsis: true,
  },
  {
    title: i18ns.input,
    dataIndex: 'input',
    ellipsis: true,
    render: (text, record) => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: i18ns.output,
    dataIndex: 'output',
    ellipsis: true,
    render: (text, record) => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    ellipsis: true,
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
    },
  },
  {
    title: i18ns.updater,
    dataIndex: 'updater',
    ellipsis: true,
    render: (text, record) => text || record.creator,
  },
  {
    title: i18ns.action,
    dataIndex: 'action',
    ellipsis: true,
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
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} danger>
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
  const [result, update, pageChange, searchList] = useHandleList(listApiFn, {current: pageParams?.current, size: pageParams?.size}, null, {projectId: stateItem._id});

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
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    Modal.confirm({
      title: `${actionsText.delete_confirm}${countStr}`,
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
            <SearchForm
              submit={searchList}
              loading={pending}
              handler={
                <Space size="small">
                  <Button loading={pending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                    {actionsText.add_action}
                  </Button>
                  <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                    {actionsText.batch_action}
                  </Button>
                </Space>
              }
            >
              <Form.Item name="url" label={searchFormText.url}>
                <Input placeholder={searchFormText.url_placeholder} allowClear />
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
      {/* <FormModal modalItem={modalItem} handleOk={handleModalOk} onCancel={()=>setModalItem(null)} /> */}
    </div>
  );
};

export default Index;
