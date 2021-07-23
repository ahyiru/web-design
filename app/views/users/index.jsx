import {useState,useCallback,useEffect,useRef} from 'react';
import { Table, Tag, Space, Input, Button, Popconfirm, Modal, Form,Tooltip,message,Checkbox,Select} from 'antd';
import { DeleteOutlined,PlusOutlined,ExclamationCircleOutlined,FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {roleList} from '@app/utils/config';
import {components,utils} from '@common';
import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';

import Panel from '@app/components/panel';

const {allUserFn,deleteUserFn}=apiList;

const {Row,Col}=components;

const {formatTime,validObj,str2code}=utils;

const { Search } = Input;
const { Item } = Form;

const searchFormItems=()=><>
  <Form.Item name="name" label="用户名">
    <Input placeholder="请输入" />
  </Form.Item>
  <Form.Item name="email" label="邮箱">
    <Input placeholder="请输入" />
  </Form.Item>
</>;

const getColumns = ({handleCheck,handleEdit,handleDelete},profile) => [
  {
    title: '用户名',
    dataIndex: 'name',
    render: (text,record) => <a onClick={()=>handleCheck(record)}>{text}</a>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    render: text => text.replace(/\S+(@\S+)/,'*****$1'),
  },
  {
    title: '状态',
    dataIndex: 'active',
    render: text => text?<Tag color="green">已激活</Tag>:<Tag color="red">未激活</Tag>,
  },
  {
    title: '是否绑定GitHub',
    dataIndex: 'github',
    render: text => text?<Tag color="green">已绑定</Tag>:<Tag color="red">未绑定</Tag>,
  },
  {
    title: '所在项目',
    dataIndex: 'projectName',
  },
  {
    title: '等级',
    dataIndex: 'role',
    render:(text,record)=>{
      return roleList.find(v=>v.value===text)?.label??'-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    render:(text,record)=>{
      const time=text||record.createtime||record.signuptime||+new Date();
      return formatTime(new Date(time));
    },
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    render:(text,record)=>text||record.creator,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align:'center',
    render:(text,record)=>{
      const disabled=!profile.role&&record._id!==profile._id;
      return <>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleCheck(record)}>设置权限</Button>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleEdit(record)}>编辑</Button>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleDelete(record)} style={{color:disabled?'var(--lightColor)':'var(--red2)'}}>删除</Button>
        {/* <Popconfirm title="确认删除?" onConfirm={()=>handleDelete(record)}>
          <a style={{color:'var(--red2)'}}>删除</a>
        </Popconfirm> */}
      </>;
    },
  },
];

const Index=props=>{
  const [selectedRows,setSelectedRows]=useState([]);
  // const [modalItem,setModalItem]=useState(null);

  const [result,update,pageChange,searchList]=useHandleList(allUserFn,{/* role:0 */});

  const handleCheck=item=>{
    console.log(item);
    props.router.push({
      path:`./auth/${item._id}`,
      state:item,
    });
  };
  const handleEdit=item=>{
    // setModalItem(item);
    props.router.push({
      path:`./edit/${item._id}`,
      state:item,
    });
  };
  const handleAdd=async ()=>{
    // setModalItem({});
    // update();
    props.router.push(`./add`);
  };
  const handleDelete=item=>{
    const items=item?[item]:selectedRows;
    const ids=items.map(v=>v._id);
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `name: ${items.map(v=>v.name)}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk:async ()=>{
        const {code,message:msg}=await deleteUserFn({ids});
        if(code===200){
          message.success(msg);
          setSelectedRows([]);
          update({current:1});
        }
      },
      onCancel(){
        console.log('Cancel');
      },
    });
  };
  const handleModalOk=values=>{
    console.log(values);
  };

  const profile=props.store.getState('profile');

  const rowSelection={
    selectedRowKeys:selectedRows.map(v=>v._id),
    onChange:(selectedRowKeys,selectedRows)=>{
      setSelectedRows(selectedRows);
    },
    getCheckboxProps:record=>({
      disabled:!profile.role&&record._id!==profile._id,
    }),
    columnWidth:'30px',
  };

  const actions={
    handleCheck,
    handleEdit,
    handleDelete,
  };

  const columns=getColumns(actions,profile);

  const {isPending,data}=result;

  const {total,current,size,list}=data||{};

  const pagination={
    onShowSizeChange:(current,size)=>pageChange(current,size),
    onChange:(current,size)=>pageChange(current,size),
    showSizeChanger:true,
    showQuickJumper:true,
    total:total||1,
    current:current||1,
    pageSize:size||10,
    pageSizeOptions:['10','20','30','40'],
  };

  return <div>
    <Row>
      <Col>
        <Panel>
          <div style={{float:'left'}}>
            <Space size="small">
              <Button loading={isPending} onClick={()=>handleAdd()} type="primary" icon={<PlusOutlined />}>新增</Button>
              <Button loading={isPending} disabled={!selectedRows.length} onClick={()=>handleDelete()} icon={<DeleteOutlined />}>批量删除</Button>
            </Space>
          </div>
          <div style={{float:'right'}}>
            {/* <Search loading={isPending} placeholder="请输入用户名" allowClear onSearch={value=>searchList({keyword:value})} enterButton /> */}
            <SearchForm submit={searchList} loading={isPending} />
          </div>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Table
            pagination={pagination}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list??[]}
            loading={isPending}
            size="small"
            bordered
            rowKey="_id"
          />
        </Panel>
      </Col>
    </Row>
  </div>;
};

const SearchForm=props=>{
  const {submit,loading}=props;
  const [form]=Form.useForm();
  return <Form layout="inline" form={form} initialValues={{}} onFinish={value=>submit(validObj(value))}>
    <Form.Item name="name" label="用户名">
      <Input placeholder="请输入" allowClear style={{width:'120px'}} />
    </Form.Item>
    <Form.Item name="role" label="等级">
      <Select placeholder="请选择" allowClear style={{width:'100px'}}>
        {
          roleList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
        }
      </Select>
    </Form.Item>
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">查询</Button>
      <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button>
    </Form.Item>
  </Form>;
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
    <Modal title="Form Modal" visible={!!modalItem} onCancel={onCancel} onOk={()=>modalOk()}>
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






