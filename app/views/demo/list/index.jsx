import {useState} from 'react';
import {Table, Tag, Space, Input, Button, Modal, Form, message, Select} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row,Col} from '@huxy/components';
import {formatTime,validObj} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import {roleList} from '@app/utils/config';

import Panel from '@app/components/panel';

import {allUser, deleteUser} from '../mock';

const getColumns = ({handleCheck, handleEdit, handleDelete}, profile, i18ns) => [
  {
    title: i18ns.name,
    dataIndex: 'name',
    render: (text, record) => <a onClick={() => handleCheck(record)}>{text}</a>,
  },
  {
    title: i18ns.email,
    dataIndex: 'email',
    render: (text) => text.replace(/\S+(@\S+)/, '*****$1'),
  },
  {
    title: i18ns.active,
    dataIndex: 'active',
    render: (text) => (text ? <Tag color="green">{i18ns.active_true}</Tag> : <Tag color="red">{i18ns.active_false}</Tag>),
  },
  {
    title: i18ns.github,
    dataIndex: 'github',
    render: (text) => (text ? <Tag color="green">{i18ns.github_true}</Tag> : <Tag color="red">{i18ns.github_false}</Tag>),
  },
  {
    title: i18ns.projectName,
    dataIndex: 'projectName',
  },
  {
    title: i18ns.role,
    dataIndex: 'role',
    render: (text, record) => {
      return roleList.find((v) => v.value === text)?.label ?? '-';
    },
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime;
      return formatTime(new Date(time || null));
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
      const disabled = !profile.role && record._id !== profile._id;
      return (
        <>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleCheck(record)}>
            {i18ns.auth_action}
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

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.users ?? {};
  const {tableHeaderText = {}, actionsText = {}, searchFormText = {}} = i18nCfg;

  const [selectedRows, setSelectedRows] = useState([]);
  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(allUser, {current: pageParams?.current, size: pageParams?.size});

  const handleCheck = (item) => {
    props.router.push({
      path: `./auth/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleEdit = (item) => {
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleAdd = async () => {
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
        const {code, message: msg} = await deleteUser({ids});
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
    handleCheck,
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
              <SearchForm submit={searchList} loading={isPending} searchFormText={searchFormText} />
            </div>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered rowKey="_id" />
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
      <Form.Item name="name" label={searchFormText.name}>
        <Input placeholder={searchFormText.name_placeholder} allowClear style={{width: '120px'}} />
      </Form.Item>
      <Form.Item name="role" label={searchFormText.role}>
        <Select placeholder={searchFormText.role_placeholder} allowClear style={{width: '100px'}}>
          {roleList.map((v) => (
            <Select.Option key={v.value} value={v.value}>
              {v.label}
            </Select.Option>
          ))}
        </Select>
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
