import {useState, useEffect} from 'react';
import {EditableProTable} from '@ant-design/pro-table';
import {Popconfirm} from 'antd';
import {arr2obj, uuidv4} from '@huxy/utils';
import apiList from '@app/utils/getApis';

const fmData = data => data.map(item => ({...item, uuid: uuidv4()}));

const fnNames = {
  listFn: 'listFn',
  addFn: 'addFn',
  editFn: 'editFn',
  deleteFn: 'deleteFn',
};
/* const handleNames={
  '':'-',
  // handleList:'handleList',
  handleAdd:'handleAdd',
  handleEdit:'handleEdit',
  handleDelete:'handleDelete',
}; */

export default ({data, getValues, actionI18n}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(fmData(data) || []);
  useEffect(() => {
    setDataSource(fmData(data) || []);
  }, [data]);
  const onChange = value => {
    setDataSource(value);
    getValues?.(value.map(({name, apiName, handlePath, btnText, isBatch}) => ({name, apiName, handlePath, btnText, isBatch})));
  };
  const deleteRow = record => {
    const value = dataSource.filter(item => item.uuid !== record.uuid);
    setDataSource(value);
    getValues?.(value.map(({name, apiName, handlePath, btnText, isBatch}) => ({name, apiName, handlePath, btnText, isBatch})));
  };
  const columns = [
    {
      title: actionI18n.name,
      dataIndex: 'name',
      valueType: 'select',
      valueEnum: fnNames,
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: actionI18n.required_msg}],
        };
      },
    },
    {
      title: actionI18n.apiName,
      dataIndex: 'apiName',
      valueType: 'select',
      valueEnum: arr2obj(Object.keys(apiList).map(api => ({name: api, value: api}))),
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: actionI18n.required_msg}],
        };
      },
    },
    /* {
      title: 'handleName',
      dataIndex: 'handleName',
      valueType: 'select',
      valueEnum:handleNames,
    }, */
    {
      title: actionI18n.handlePath,
      dataIndex: 'handlePath',
    },
    {
      title: actionI18n.btnText,
      dataIndex: 'btnText',
    },
    {
      title: actionI18n.isBatch,
      dataIndex: 'isBatch',
      valueType: 'select',
      valueEnum: [actionI18n.is_batch_no, actionI18n.is_batch_yes],
    },
    {
      title: actionI18n.option,
      valueType: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <span
          key="editable"
          className="link"
          onClick={() => {
            let _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.uuid);
          }}
        >
          {actionI18n.edit_action}
        </span>,
        <Popconfirm key="delete" title={actionI18n.delete_confirm} onConfirm={() => deleteRow(record)}>
          <span className="link" /* onClick={() => deleteRow(record)} */ style={{color: 'var(--red2)'}}>
            {actionI18n.delete_action}
          </span>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <EditableProTable
      rowKey="uuid"
      /* headerTitle="actions配置" */ value={dataSource}
      onChange={onChange}
      columns={columns}
      /* toolBarRender={() => {
      return [
        <Button type="primary" size="small" key="save" onClick={()=>save(arr2obj(dataSource))}>保存数据</Button>,
      ];
    }} */
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: actionI18n.table_title,
        record: () => ({uuid: uuidv4()}),
      }}
      /* request={async () => ({
      data: defaultData,
      total: 3,
      // success: true,
    })} */
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (key, row, originRow) => {
          // console.log(key,row,originRow);
        },
        // onDelete:(key,row)=>{},
        onChange: setEditableRowKeys,
      }}
    />
  );
};
