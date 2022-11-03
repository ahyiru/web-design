import {useState, useEffect} from 'react';
import {EditableProTable} from '@ant-design/pro-table';
import {Popconfirm} from 'antd';
import {obj2arr, arr2obj, uuidv4} from '@huxy/utils';

const fmData = data => obj2arr(data || {}).map(item => ({...item, uuid: uuidv4()}));

export default ({data, getValues, selectedKey, title, editorI18n}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(fmData(data) || []);
  useEffect(() => {
    setDataSource(fmData(data) || []);
  }, [data]);
  const onChange = value => {
    setDataSource(value);
    getValues?.(arr2obj(value));
  };
  const deleteRow = record => {
    const value = dataSource.filter(item => item.uuid !== record.uuid);
    setDataSource(value);
    getValues?.(arr2obj(value));
  };
  const columns = [
    {
      title: editorI18n.name,
      dataIndex: 'name',
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: editorI18n.required_msg}],
        };
      },
    },
    {
      title: editorI18n.value,
      dataIndex: 'value',
      valueType: 'code',
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: editorI18n.required_msg}],
        };
      },
    },
    {
      title: editorI18n.option,
      valueType: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            let _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.uuid);
          }}
        >
          {editorI18n.edit_action}
        </a>,
        <Popconfirm key="delete" title={editorI18n.delete_confirm} onConfirm={() => deleteRow(record)}>
          <a /* onClick={() => deleteRow(record)} */ style={{color: 'var(--red2)'}}>{editorI18n.delete_action}</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <EditableProTable
      rowKey="uuid"
      headerTitle={title}
      value={dataSource}
      onChange={onChange}
      columns={columns}
      /* toolBarRender={() => {
      return [
        <Button type="primary" size="small" key="save" onClick={()=>save(arr2obj(dataSource))}>保存数据</Button>,
      ];
    }} */
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: editorI18n.table_title,
        record: () => ({uuid: uuidv4()}),
        disabled: !selectedKey,
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
