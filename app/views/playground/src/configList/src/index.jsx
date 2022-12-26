import {useState} from 'react';
import {Modal, message} from 'antd';
import {ExclamationCircleOutlined, TableOutlined, BarsOutlined} from '@ant-design/icons';
import {TabHeader} from '@huxy/components';
import useHandleList from '@app/hooks/useHandleList';
import List from './searchList';

import {tabs, formList, actionList, colsCfg, tableHeader, getColumns, RenderItem, apiList} from '../configs';

import './index.less';

const Index = props => {
  const [listType, setListType] = useState(props.type ?? 'table');
  const [active, setActive] = useState(1);
  const [searchParmas, setSearchParmas] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [result, update, pageChange, searchList] = useHandleList(apiList.allUser, {current: 1, size: 10, active});

  const {current, size} = result.data || {};

  const switchListType = type => {
    setListType(type);
    update({current: 1, size: 10, active});
  };
  const switchTab = active => {
    setActive(active);
    update({current: 1, size: 10, active});
  };
  const handleSearchList = values => {
    setSearchParmas(values);
    searchList(values);
  };

  const handleCheck = item => {
    props.router.push({
      path: `./auth/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleEdit = item => {
    props.router.push({
      path: `./edit/${item._id}`,
      state: {item, backState: {path: props.path, params: {current, size}}},
    });
  };
  const handleDelete = item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v => v.name)}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg} = await apiList.deleteUser({ids});
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
  const handleAdd = () => {
    props.router.push(`./add`);
  };
  const handleExport = async () => {
    const {code, message: msg} = await apiList.export();
    if (code === 200) {
      message.success(msg);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: !profile.role && record[rowKey] !== profile[rowKey],
    // }),
  };

  const colActions = {
    handleCheck,
    handleEdit,
    handleDelete,
  };
  const topActions = {
    handleAdd,
    handleExport,
    handleDelete,
  };
  const tableProps = {
    RenderItem,
    columns: getColumns(tableHeader, colsCfg(colActions)),
    result,
    pageChange,
    searchList: handleSearchList,
    rowSelection,
    formList,
    listType,
    actionList: actionList(topActions, !selectedRows.length),
    paramsKey: JSON.stringify({...searchParmas, active}),
  };

  return (
    <div className="config-list">
      <TabHeader tabs={tabs} switchTab={switchTab} />
      <List {...tableProps} />
      <div className="handle-bar">
        <a className={listType === 'table' ? 'active' : ''} onClick={e => switchListType('table')}>
          <TableOutlined />
        </a>
        <a className={listType === 'list' ? 'active' : ''} onClick={e => switchListType('list')}>
          <BarsOutlined />
        </a>
      </div>
    </div>
  );
};

export default Index;
