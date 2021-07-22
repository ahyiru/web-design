import { useState,useEffect} from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {Popconfirm} from 'antd';
import {utils} from '@common';
import apiList from '@app/utils/getApis';
const {arr2obj,uuidv4}=utils;

const fmData=data=>data.map(item=>({...item,uuid:uuidv4()}));

const fnNames={
  listFn:'listFn',
  addFn:'addFn',
  editFn:'editFn',
  deleteFn:'deleteFn',
};
/* const handleNames={
  '':'-',
  // handleList:'handleList',
  handleAdd:'handleAdd',
  handleEdit:'handleEdit',
  handleDelete:'handleDelete',
}; */

export default ({data,getValues}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(fmData(data)||[]);
  useEffect(()=>{
    setDataSource(fmData(data)||[]);
  },[data]);
  const onChange=value=>{
    setDataSource(value);
    getValues?.(value.map(({name,apiName,handlePath,btnText,isBatch})=>({name,apiName,handlePath,btnText,isBatch})));
  };
  const deleteRow=record=>{
    const value=dataSource.filter((item) => item.uuid !== record.uuid);
    setDataSource(value);
    getValues?.(value.map(({name,apiName,handlePath,btnText,isBatch})=>({name,apiName,handlePath,btnText,isBatch})));
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      valueType: 'select',
      valueEnum:fnNames,
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: 'apiName',
      dataIndex: 'apiName',
      valueType: 'select',
      valueEnum: arr2obj(Object.keys(apiList).map(api=>({name:api,value:api}))),
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
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
      title: 'handlePath',
      dataIndex: 'handlePath',
    },
    {
      title: 'btnText',
      dataIndex: 'btnText',
    },
    {
      title: '批量操作',
      dataIndex: 'isBatch',
      valueType: 'select',
      valueEnum: ['否','是'],
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => {
          let _a;
          (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.uuid);
        }}>
          编辑
        </a>,
        <Popconfirm key="delete" title="确认删除?" onConfirm={() => deleteRow(record)}>
          <a /* onClick={() => deleteRow(record)} */ style={{color:'var(--red2)'}}>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return <EditableProTable rowKey="uuid" /* headerTitle="actions配置" */ value={dataSource} onChange={onChange} columns={columns}
    /* toolBarRender={() => {
      return [
        <Button type="primary" size="small" key="save" onClick={()=>save(arr2obj(dataSource))}>保存数据</Button>,
      ];
    }} */
    recordCreatorProps={{
      position: 'bottom',
      creatorButtonText:'添加action',
      record: () => ({ uuid:uuidv4() }),
    }}
    /* request={async () => ({
      data: defaultData,
      total: 3,
      // success: true,
    })} */
    editable={{
      type: 'multiple',
      editableKeys,
      onSave: async (key,row,originRow) => {
        // console.log(key,row,originRow);
      },
      // onDelete:(key,row)=>{},
      onChange: setEditableRowKeys,
    }}
  />;
};