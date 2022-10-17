import {useState} from 'react';
import {Pagination, Space, Input, Button, Modal, Form, message, Select} from 'antd';
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from '@huxy/router';
import {Row, Col} from '@huxy/components';
import {validObj} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import Panel from '@app/components/panel';
import {useIntls} from '@app/components/intl';
import FixedSizeImage from '@app/components/fixedSizeImage';

import {apiList, defCategories, defaultImg, baseUrl} from '../../configs';

import './index.less';

const {listSceneFn, deleteSceneFn} = apiList;

const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.tables', {});
  const [selectedRows, setSelectedRows] = useState([]);
  const pageParams = props.params;
  const [result, update, pageChange, searchList] = useHandleList(listSceneFn, {current: pageParams?.current, size: pageParams?.size ?? 8});

  const handleEdit = (item, e) => {
    e.stopPropagation();
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleAdd = async () => {
    props.router.push(`./add`);
  };
  const handleDelete = (item, e) => {
    e.stopPropagation();
    const items = item ? [item] : selectedRows;
    // const ids = items.map(v => v._id);
    Modal.confirm({
      title: i18nCfg.delMsg,
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v => v.name)}`,
      okText: i18nCfg.submit,
      okType: 'danger',
      cancelText: i18nCfg.cancel,
      onOk: async () => {
        const {code, message: msg} = await deleteSceneFn({ids: items});
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

  /* const rowSelection = {
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
  };

  const columns = getColumns(actions, profile); */

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
    pageSizeOptions: ['8', '16', '24', '32'],
  };

  return (
    <div>
      <Row>
        <Col>
          <Panel>
            <div style={{float: 'left'}}>
              <Space size="small">
                <Button loading={isPending} onClick={() => handleAdd()} type="primary" icon={<PlusOutlined />}>
                  {i18nCfg.add}
                </Button>
                {/* <Button loading={isPending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={<DeleteOutlined />}>
                  {i18nCfg.batchDelete}
                </Button> */}
              </Space>
            </div>
            <div style={{float: 'right'}}>
              <SearchForm submit={searchList} loading={isPending} />
            </div>
          </Panel>
        </Col>
        <Col>
          <Panel>
            {/* <Table pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={list ?? []} loading={isPending} size="small" bordered rowKey="_id" scroll={{x: true}} /> */}
            <Row gutter={[16, 16]}>
              {
                (list || []).map(item => <Col key={item._id} span={3} xs={12} sm={6}>
                  <div className="scene-item">
                    <span className={`status${item.audited ? ' audited' : ''}`} />
                    <div className="image">
                      <FixedSizeImage src={item.screenshot || defaultImg} alt={item.name} />
                    </div>
                    <div className="describe">
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                    <div className="actions">
                      <Link target="_blank" rel="noopener noreferrer" to={{
                        path: item.demo || `${baseUrl}/scenes${item.loadType === 'modules' ? `/${item.loadType}` : ''}/${item.name}`,
                        // query: {uid: item.uid},
                      }}>
                        <EyeOutlined />
                      </Link>
                      <a onClick={e => handleEdit(item, e)}><EditOutlined /></a>
                      <a onClick={e => handleDelete(item, e)}><DeleteOutlined /></a>
                    </div>
                  </div>
                </Col>)
              }
            </Row>
            <div style={{padding: '10px 0', display: 'flex', justifyContent: 'end'}}>
              <Pagination {...pagination} />
            </div>
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
      <Form.Item name="name" label="标题">
        <Input placeholder="请输入" allowClear style={{width: '120px'}} />
      </Form.Item>
      <Form.Item name="category" label="类别">
        <Select placeholder="请选择" allowClear style={{width: '100px'}}>
          {defCategories.map(v => (
            <Select.Option key={v.value} value={v.value}>
              {v.label}
            </Select.Option>
          ))}
        </Select>
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
