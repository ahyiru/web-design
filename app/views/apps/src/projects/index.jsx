import {useState} from 'react';
import {Table, Tag, Space, Input, Button, App, Form, Tooltip} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime, message} from '@huxy/utils';
import {projectRoleList} from '@app/utils/configs';
import apiList from '@app/apis/apiList';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';

import Panel from '@app/components/panel';
import Ellipsis from '@app/components/ellipsis';

import {userInfoStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';

const {listProjectFn, deleteProjectFn} = apiList;

const getColumns = ({handleRouter, handleEdit, handleDelete, handleApis}, profile, i18ns) => [
  {
    title: i18ns.name,
    dataIndex: 'name',
    width: 50,
    ellipsis: true,
    render: (text, record) => (
      <span className="link" onClick={() => handleRouter(record)}>
        {text}
      </span>
    ),
  },
  /* {
    title: '项目类型',
    dataIndex: 'type',
  }, */
  {
    title: i18ns.description,
    dataIndex: 'description',
    width: 60,
    ellipsis: true,
    // render: text => <Tooltip title={text}>{text}</Tooltip>,
    // render: text => <Ellipsis>{text}</Ellipsis>,
  },
  {
    title: i18ns.role,
    dataIndex: 'role',
    align: 'center',
    width: 50,
    ellipsis: true,
    render: text => {
      const {label, color} = projectRoleList.find(v => v.value == text) || {};
      return label ? <Tag color={color}>{label}</Tag> : '-';
    },
  },
  {
    title: i18ns.target,
    dataIndex: 'target',
    width: 40,
    ellipsis: true,
    render: (text, record) => text || '/',
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    width: 50,
    ellipsis: true,
    render: (text, record) => {
      const time = text || record.createtime || +new Date();
      const txt = formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
      // return <Ellipsis>{txt}</Ellipsis>;
    },
  },
  {
    title: i18ns.updater,
    dataIndex: 'updater',
    width: 40,
    ellipsis: true,
    render: (text, record) => text || record.creator,
  },
  {
    title: i18ns.action,
    dataIndex: 'action',
    align: 'center',
    width: 200,
    ellipsis: true,
    render: (text, record) => {
      const disabled = false; //!profile.role&&record.id!==profile.projectId;
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
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} danger>
            {i18ns.delete_action}
          </Button>
        </>
      );
    },
  },
];

const Index = props => {
  const {modal} = App.useApp();
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.projects', {});
  const profile = userInfoStore.getState();
  const [selectedRows, setSelectedRows] = useState([]);
  // const [modalItem,setModalItem]=useState(null);

  const {tableHeaderText = {}, actionsText = {}, searchFormText = {}} = i18nCfg;
  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listProjectFn, {current: pageParams?.current, size: pageParams?.size});

  const handleRouter = item => {
    props.router.push({
      path: `./router/${item.id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleApis = item => {
    props.router.push({
      path: `./api/${item.id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleEdit = item => {
    // setModalItem(item);
    props.router.push({
      path: `./edit/${item.id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleAdd = async () => {
    // setModalItem({});
    // update();
    props.router.push(`./add`);
  };
  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v.id);
    const countStr = items.length > 1 ? `(共 ${items.length} 项)` : '';
    modal.confirm({
      title: `${actionsText.delete_confirm}${countStr}`,
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v => v.name)}`,
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
  const handleModalOk = values => {
    console.log(values);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: !profile.role && record.id !== profile.id,
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
                    {actionsText.add_action}
                  </Button>
                  <Button loading={pending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                    {actionsText.batch_action}
                  </Button>
                </Space>
              }
            >
              <Form.Item name="name" label={searchFormText.name}>
                <Input placeholder={searchFormText.name} allowClear />
              </Form.Item>
              {/* <Form.Item name="role" label="等级">
              <Select placeholder="请选择" allowClear style={{width:'100px'}}>
                {
                  projectRoleList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                }
              </Select>
            </Form.Item> */}
            </SearchForm>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={pending} size="small" bordered rowKey="id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
