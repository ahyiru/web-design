import { useState,useEffect} from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {Popconfirm} from 'antd';
import {utils} from '@common';
const {obj2arr,arr2obj,uuidv4}=utils;

const fmData=data=>obj2arr(data||{}).map(item=>({...item,uuid:uuidv4()}));

export default ({data,getValues,title,selectedKey}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(fmData(data)||[]);
  useEffect(()=>{
    setDataSource(fmData(data)||[]);
  },[data]);
  const onChange=value=>{
    setDataSource(value);
    getValues?.(arr2obj(value));
  };
  const deleteRow=record=>{
    const value=dataSource.filter((item) => item.uuid !== record.uuid);
    setDataSource(value);
    getValues?.(arr2obj(value));
  };
  const columns = [
    {
      title: '属性名',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '属性值',
      dataIndex: 'value',
      valueType:'code',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
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
  return <EditableProTable rowKey="uuid" headerTitle={title} value={dataSource} onChange={onChange} columns={columns}
    /* toolBarRender={() => {
      return [
        <Button type="primary" size="small" key="save" onClick={()=>save(arr2obj(dataSource))}>保存数据</Button>,
      ];
    }} */
    recordCreatorProps={{
      position: 'bottom',
      creatorButtonText:'添加属性',
      record: () => ({ uuid:uuidv4() }),
      disabled:!selectedKey,
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