import {useState} from 'react';
import {Table, Tag, Space, Input, Button, Modal, Form, Select} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col} from '@huxy/components';
import {formatTime} from '@huxy/utils';
import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';
import SearchForm from '@app/components/searchForm';
import {roleList} from '@app/utils/configs';
import Panel from '@app/components/panel';
import {userInfoStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';
import {message} from '@app/utils/staticFunction';

const {allUserFn, deleteUserFn, exitUserFn} = apiList;

const getColumns = ({handleCheck, handleEdit, handleDelete, handleExit}, profile, i18ns) => [
  {
    title: i18ns.name,
    dataIndex: 'name',
    ellipsis: true,
    render: (text, record) => (
      <span className="link" onClick={() => handleCheck(record)}>
        {text}
      </span>
    ),
  },
  {
    title: i18ns.email,
    dataIndex: 'email',
    ellipsis: true,
    width: '120px',
    // render: text => text.replace(/\S+(@\S+)/, '*****$1'),
  },
  {
    title: i18ns.active,
    dataIndex: 'active',
    align: 'center',
    render: text => (text ? <Tag color="green">{i18ns.active_true}</Tag> : <Tag color="red">{i18ns.active_false}</Tag>),
  },
  {
    title: i18ns.github,
    dataIndex: 'github',
    align: 'center',
    render: text => (text ? <Tag color="green">{i18ns.github_true}</Tag> : <Tag color="red">{i18ns.github_false}</Tag>),
  },
  {
    title: '微信',
    dataIndex: 'wechat',
    align: 'center',
    render: text => (text ? <Tag color="green">{i18ns.github_true}</Tag> : <Tag color="red">{i18ns.github_false}</Tag>),
  },
  {
    title: i18ns.projectName,
    dataIndex: 'projectName',
    ellipsis: true,
  },
  {
    title: i18ns.role,
    dataIndex: 'role',
    ellipsis: true,
    render: (text, record) => {
      return roleList.find(v => v.value === text)?.label ?? '-';
    },
  },
  {
    title: i18ns.updatetime,
    dataIndex: 'updatetime',
    ellipsis: true,
    render: (text, record) => {
      const time = text || record.createtime || record.signuptime || +new Date();
      return formatTime(new Date(time));
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
      const disabled = !profile.role && record._id !== profile._id;
      return (
        <>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleCheck(record)}>
            {i18ns.auth_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleEdit(record)}>
            {i18ns.edit_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleDelete(record)} danger>
            {i18ns.delete_action}
          </Button>
          <Button type="link" size="small" disabled={disabled} onClick={() => handleExit(record)} danger>
            退出
          </Button>
        </>
      );
    },
  },
];

const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.users', {});
  const profile = userInfoStore.getState();
  const {tableHeaderText = {}, actionsText = {}, searchFormText = {}} = i18nCfg;

  // const getList = profile.role == 5 ? allUserFn : allUserMock;

  const [selectedRows, setSelectedRows] = useState([]);
  // const [modalItem,setModalItem]=useState(null);
  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(allUserFn, {current: pageParams?.current, size: pageParams?.size});

  const handleCheck = item => {
    props.router.push({
      path: `./auth/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleEdit = item => {
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
        const {code, message: msg} = await deleteUserFn({ids});
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
  const handleExit = async user => {
    const {code, message: msg} = await exitUserFn({user});
    if (code === 200) {
      message.success(msg);
    }
  };
  const handleModalOk = values => {
    console.log(values);
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: !profile.role && record._id !== profile._id,
    }),
    columnWidth: '30px',
  };

  const actions = {
    handleCheck,
    handleEdit,
    handleDelete,
    handleExit,
  };

  const columns = getColumns(actions, profile, {...tableHeaderText, ...actionsText});

  const {pending, data} = result;

  const {total, current, size, list = []} = data || {};

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
                <Input placeholder={searchFormText.name_placeholder} allowClear />
              </Form.Item>
              <Form.Item name="role" label={searchFormText.role}>
                <Select placeholder={searchFormText.role_placeholder} allowClear>
                  {roleList.map(v => (
                    <Select.Option key={v.value} value={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </SearchForm>
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list} loading={pending} size="small" bordered rowKey="_id" scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

/* const FormModal=props=>{
  const {modalItem,handleOk,onCancel}=props;
  const [form]=Form.useForm();
  const modalOk=()=>{
    form.validateFields().then(values=>{
      // form.resetFields();
      handleOk(values);
      onCancel();
    }).catch(info=>{
      console.log('Validate Failed:', info);
      onCancel();
    });
  };
  return <div style={pageStyle}>
    <Modal title="Form Modal" open={!!modalItem} onCancel={onCancel} onOk={()=>modalOk()}>
      <Form {...layout} form={form} name="FormModal" initialValues={{...modalItem}}>
        <Item label="用户名" name="name" rules={[{required:true,message:'必填项!'}]}>
          <Input placeholder="请输入用户名" />
        </Item>
        <Item label="邮箱" name="email" rules={[{required:true,message:'必填项!'}]}>
          <Input placeholder="请输入邮箱" />
        </Item>
        <Item label="等级" name="role" rules={[{required:true,message:'必填项!'}]}>
          <Input placeholder="请输入等级" />
        </Item>
        <Item label="状态" name="active">
          <Checkbox checked disabled>激活</Checkbox>
        </Item>
      </Form>
    </Modal>
  </div>;
}; */

export default Index;
