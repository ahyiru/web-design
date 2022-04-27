import {useState} from 'react';
import {Table, Space, Button, Modal, message} from 'antd';

import {Row,Col} from '@huxy/components';
import {validObj} from '@huxy/utils';

import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';

import Panel from '@app/components/panel';

import fixIcons from '@app/utils/fixIcons';

import customRender from '@app/utils/render';

const actionsRender = {
  handleCheck: {
    type: 'Button',
    props: `{({text,record,index,actions})=>{
      return {
        type:'link',
        size:'small',
        onClick:e=>actions['handleCheck'](record),
        children:'查看',
      };
    }}`,
  },
  handleEdit: {
    type: 'Button',
    props: `{({text,record,index,actions})=>{
      return {
        type:'link',
        size:'small',
        onClick:e=>actions['handleEdit'](record),
        children:'编辑',
      };
    }}`,
  },
  handleDelete: {
    type: 'Button',
    props: `{({text,record,index,actions})=>{
      const disabled=false;
      return {
        type:'link',
        size:'small',
        style:{color:disabled?'var(--light-color)':'var(--red2)'},
        onClick:e=>actions['handleDelete'](record),
        children:'删除',
      };
    }}`,
  },
};

const formatColums = (data, actions) => {
  return data.map((item) => {
    const {render, ...rest} = item;
    if (item.dataIndex === 'action') {
      const tools = typeof item.tools === 'string' ? item.tools.split(',') : item.tools;
      const children = [];
      Object.keys(actionsRender).map((key) => {
        if (tools?.includes(key)) {
          children.push(actionsRender[key]);
        }
      });
      if (children.length) {
        return {
          ...rest,
          render: (text, record, index) => customRender({type: 'span', children}, {text, record, index, actions}),
        };
      }
      return rest;
    }
    if (render) {
      return {
        ...rest,
        render: (text, record, index) => customRender(render, {text, record, index, actions}),
      };
    }
    return rest;
  });
};

const Index = ({commonprops, ...props}) => {
  const profile = commonprops.store.getState('profile');
  const {pagination, rowSelection, columns, actions, searchSchema, modalSchema, rowKey = '_id'} = props;

  const listInfo = actions.find((item) => item.name === 'listFn');
  const deleteInfo = actions.find((item) => item.name === 'deleteFn');
  const addInfo = actions.find((item) => item.name === 'addFn');

  const [selectedRows, setSelectedRows] = useState([]);

  const [modalItem, setModalItem] = useState(null);

  const [result, update, pageChange, handleSearch] = useHandleList(apiList[listInfo?.apiName]);

  const handleCheck = (item) => {
    setModalItem(item);
  };
  const handleAdd = () => {
    const {apiName, handlePath} = actions.find((item) => item.name === 'addFn') || {};
    const path = handlePath || '/apps/users/add';
    commonprops.router.push({
      path,
      state: {apiName},
    });
  };
  const handleEdit = (item) => {
    const {apiName, handlePath} = actions.find((item) => item.name === 'editFn') || {};
    const path = handlePath || '/apps/users/edit';
    commonprops.router.push({
      path: `${path}/${item[rowKey]}`,
      state: {item, apiName},
    });
  };
  const handleDelete = (item) => {
    const items = item ? [item] : selectedRows;
    const ids = items.map((v) => v[rowKey]);
    Modal.confirm({
      title: '确定执行此操作吗？',
      icon: fixIcons('ExclamationCircleOutlined'),
      content: `name: ${items.map((v) => v.name)}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await apiList[deleteInfo?.apiName]({ids});
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

  const selectionCfg =
    rowSelection === false || !deleteInfo?.isBatch
      ? false
      : {
        selectedRowKeys: selectedRows.map((v) => v[rowKey]),
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: !profile.role && record[rowKey] !== profile[rowKey],
        }),
        columnWidth: '30px',
        ...(typeof rowSelection === 'object' ? rowSelection : null),
      };

  const columnsCfg = formatColums(columns, {handleCheck, handleEdit, handleDelete});

  const {isPending, data} = result;

  const {total, current, size, list} = data || {};

  const paginationCfg =
    pagination === false
      ? false
      : {
        onShowSizeChange: (current, size) => pageChange(current, size),
        onChange: (current, size) => pageChange(current, size),
        showSizeChanger: true,
        showQuickJumper: true,
        total: total || 1,
        current: current || 1,
        pageSize: size || 10,
        pageSizeOptions: ['10', '20', '30', '40'],
        // hideOnSinglePage:true,
        size: 'small',
        ...(typeof pagination === 'object' ? pagination : null),
      };

  const searchFormProps = {
    submit: (values) => handleSearch(validObj(values)),
    loading: isPending,
  };
  const modalFormProps = {
    title: '查看',
    modalItem,
    handleOk: (value) => console.log(value),
    onCancel: () => setModalItem(null),
  };

  const searchFormSchema = searchSchema
    ? {
      type: 'CustomForm',
      props: {
        ...searchFormProps,
        schema: searchSchema,
      },
    }
    : null;
  const modalFormSchema = modalSchema
    ? {
      type: 'CustomForm',
      props: {
        ...modalFormProps,
        schema: modalSchema,
      },
    }
    : null;

  return (
    <div>
      <Row>
        <Col>
          <Panel>
            <div style={{float: 'left'}}>
              <Space size="small">
                {addInfo.btnText && (
                  <Button loading={isPending} onClick={() => handleAdd()} type="primary" icon={fixIcons('PlusOutlined')}>
                    {addInfo.btnText}
                  </Button>
                )}
                {deleteInfo?.isBatch && (
                  <Button loading={isPending} disabled={!selectedRows.length} onClick={() => handleDelete()} icon={fixIcons('DeleteOutlined')}>
                    {deleteInfo.btnText}
                  </Button>
                )}
              </Space>
            </div>
            {searchSchema && <div style={{float: 'right'}}>{customRender(searchFormSchema, {}, commonprops)}</div>}
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Table pagination={paginationCfg} rowSelection={selectionCfg} columns={columnsCfg} dataSource={list ?? []} loading={isPending} rowKey={rowKey} size="small" bordered scroll={{x: true}} />
          </Panel>
        </Col>
      </Row>
      {modalFormSchema && modalItem && customRender(modalFormSchema, {}, commonprops)}
    </div>
  );
};

export default Index;
