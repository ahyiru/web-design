import {useState, useEffect} from 'react';
import {EditableProTable} from '@ant-design/pro-table';
import {Tooltip, Popconfirm} from 'antd';
import {uuidv4} from '@huxy/utils';

const fmData = data =>
  data.map(item => {
    const {render, ...rest} = item;
    const {type: renderType, props: renderProps, children: renderChildren} = render || {};
    return {...rest, renderType, renderProps, renderChildren, uuid: uuidv4()};
  });

/* const handleNames={
  handleCheck:'handleCheck',
  handleEdit:'handleEdit',
  handleDelete:'handleDelete',
}; */

const formatTable = data =>
  data.map(item => {
    const {renderType, renderProps, renderChildren, ...rest} = item;
    if (renderType || renderProps || renderChildren) {
      rest.render = {
        type: renderType,
        props: renderProps,
        children: renderChildren,
      };
    }
    return rest;
  });

const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  display: 'inline-block',
};

export default ({data, getValues, columnI18n}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(fmData(data) || []);
  useEffect(() => {
    setDataSource(fmData(data) || []);
  }, [data]);
  const onChange = value => {
    const ds = formatTable(value);
    setDataSource(ds);
    getValues?.(ds);
  };
  const deleteRow = record => {
    const value = dataSource.filter(item => item.uuid !== record.uuid);
    const ds = formatTable(value);
    setDataSource(ds);
    getValues?.(ds);
  };
  const columns = [
    {
      title: columnI18n.title,
      dataIndex: 'title',
      // width:100,
      // ellipsis:true,
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: columnI18n.required_msg}],
        };
      },
    },
    {
      title: columnI18n.dataIndex,
      dataIndex: 'dataIndex',
      // width:100,
      // ellipsis:true,
      formItemProps: (form, {rowIndex}) => {
        return {
          rules: [{required: true, message: columnI18n.required_msg}],
        };
      },
    },
    /* {
      title: 'width',
      dataIndex: 'width',
      // width:80,
      // ellipsis:true,
    },
    {
      title: 'ellipsis',
      dataIndex: 'ellipsis',
      // width:80,
      // ellipsis:true,
      valueType: 'select',
      valueEnum: ['否','是'],
    }, */
    {
      title: columnI18n.align,
      dataIndex: 'align',
      // width:80,
      // ellipsis:true,
      valueType: 'select',
      valueEnum: {
        '': '-',
        left: 'left',
        right: 'right',
        center: 'center',
      },
    },
    /* {
      title: 'render',
      valueType:'code',
      dataIndex: 'render',
      render:(text,record)=>JSON.stringify(text),
    }, */
    {
      title: columnI18n.renderType,
      dataIndex: 'renderType',
      // width:100,
      // ellipsis:true,
      /* render:(text,record)=>{
        const {render}=record;
        return render?.type;
      }, */
    },
    {
      title: columnI18n.renderProps,
      dataIndex: 'renderProps',
      valueType: 'code',
      // width:140,
      // ellipsis:true,
      /* render:(text,record)=>{
        const {render}=record;
        return render?.props;
      }, */
    },
    {
      title: columnI18n.renderChildren,
      dataIndex: 'renderChildren',
      valueType: 'code',
      // width:140,
      // ellipsis:true,
      /* render:(text,record)=>{
        const {render}=record;
        return render?.children;
      }, */
    },
    {
      title: columnI18n.tools,
      dataIndex: 'tools',
      // width:120,
      // ellipsis:true,
      // valueType: 'select',
      // valueEnum:handleNames,
      /* fieldProps: (form, { rowIndex }) => {
        return {
          mode: 'multiple',
        };
      }, */
      /* fieldProps: {
        mode: 'multiple',
      }, */
      render: (text, record) => (
        <Tooltip title={text}>
          <span style={{...ellipsis}}>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: columnI18n.option,
      valueType: 'option',
      width: 120,
      // fixed: 'right',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            let _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.uuid);
          }}
        >
          {columnI18n.edit_action}
        </a>,
        <Popconfirm key="delete" title={columnI18n.delete_confirm} onConfirm={() => deleteRow(record)}>
          <a /* onClick={() => deleteRow(record)} */ style={{color: 'var(--red2)'}}>{columnI18n.delete_action}</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <EditableProTable
      rowKey="uuid"
      /* headerTitle="columns配置" */ value={dataSource}
      onChange={onChange}
      columns={columns}
      /* toolBarRender={() => {
      return [
        <Button type="primary" size="small" key="save" onClick={()=>save(arr2obj(dataSource))}>保存数据</Button>,
      ];
    }} */
      recordCreatorProps={{
        position: 'bottom',
        creatorButtonText: columnI18n.table_title,
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
      // scroll={{ x: 1000 }}
      /* options={{
      show: true,
      density: true,
      fullScreen: true,
      setting: true,
    }} */
    />
  );
};
