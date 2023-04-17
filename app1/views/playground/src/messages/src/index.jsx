import {useState} from 'react';
import {message} from 'antd';
// import {TableOutlined, BarsOutlined} from '@ant-design/icons';
import {TabHeader} from '@huxy/components';
import {useStore} from '@huxy/use';
import useHandleList from '@app/hooks/useHandleList';
import List from './searchList';

import {tabs, formList, actionList, colsCfg, tableHeader, getColumns, RenderItem, apiList} from '../configs';

import './index.less';

const Index = props => {
  const historyState = props.history?.getState?.();
  // const [listType, setListType] = useState(props.type ?? 'table');
  const [, setNotify] = useStore('huxy-notify');
  const [active, setActive] = useState(historyState?.tab ?? 1);
  const [searchParmas, setSearchParmas] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [result, update, pageChange, searchList] = useHandleList(apiList.listMessage, {current: 1, size: 10, active});

  // const {current, size} = result.data || {};

  /* const switchListType = type => {
    setListType(type);
    update({current: 1, size: 10, active});
  }; */
  const switchTab = active => {
    setActive(active);
    update({current: 1, size: 10, active});
  };
  const handleSearchList = values => {
    setSearchParmas(values);
    searchList({...values, active});
  };

  const handleCheck = async item => {
    const items = item ? [item] : selectedRows;
    const ids = items.map(v => v._id);
    const {code, result, message: msg} = await apiList.markActived({ids});
    if (code === 200) {
      setNotify(result);
      message.success(msg);
      setSelectedRows([]);
      update({current: 1});
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(v => v._id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.active == 1,
    }),
  };

  const colActions = {
    handleCheck,
  };
  const topActions = {
    handleCheck,
  };
  const tableProps = {
    RenderItem,
    columns: getColumns(tableHeader, colsCfg(colActions)),
    result,
    pageChange,
    searchList: handleSearchList,
    rowSelection,
    formList,
    // listType,
    actionList: actionList(topActions, !selectedRows.length),
    paramsKey: JSON.stringify({...searchParmas, active}),
  };

  return (
    <div className="messages-list">
      <TabHeader tabs={tabs} switchTab={switchTab} activekey={active} />
      <List {...tableProps} />
      {/* <div className="handle-bar">
        <span className={`link${listType === 'table' ? ' active' : ''}`} onClick={e => switchListType('table')}>
          <TableOutlined />
        </span>
        <span className={`link${listType === 'list' ? ' active' : ''}`} onClick={e => switchListType('list')}>
          <BarsOutlined />
        </span>
      </div> */}
    </div>
  );
};

export default Index;
