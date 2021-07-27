import {useState,useCallback,useEffect,useRef} from 'react';
import { Table, Tag, Space, Input, Button, Popconfirm, Modal, Form,Tooltip,message,Checkbox,Select} from 'antd';
import { DeleteOutlined,PlusOutlined,ExclamationCircleOutlined,FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {roleList} from '@app/utils/config';
import {components,utils} from '@common';
import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';

import defProject from '@app/configs/projects';

import Panel from '@app/components/panel';

import Back from '@app/components/goBack';

const {listApiFn,addApiFn,deleteApiFn}=apiList;

const {Row,Col}=components;

const {formatTime,validObj}=utils;

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

const getColumns = ({handleTest,handleEdit,handleDelete},profile) => [
  {
    title: '接口名',
    dataIndex: 'name',
    render: (text,record) => <a onClick={()=>handleTest(record)}>{text}</a>,
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '地址',
    dataIndex: 'url',
  },
  {
    title: '请求方式',
    dataIndex: 'method',
  },
  {
    title: '参数类型',
    dataIndex: 'type',
  },
  {
    title: '接口权限',
    dataIndex: 'auth',
  },
  {
    title: '入参',
    dataIndex: 'input',
    render:(text,record)=><Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '出参',
    dataIndex: 'output',
    render:(text,record)=><Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
    render:(text,record)=>{
      const time=text||record.createtime||record.signuptime||+new Date();
      const txt=formatTime(new Date(time));
      return <Tooltip title={txt}>{txt}</Tooltip>;
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
      const disabled=false;//!profile.role&&record._id!==profile._id;
      return <>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleTest(record)}>测试</Button>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleEdit(record)}>编辑</Button>
        <Button type="link" size="small" disabled={disabled} onClick={()=>handleDelete(record)} style={{color:disabled?'var(--lightColor)':'var(--red2)'}}>删除</Button>
      </>;
    },
  },
];

const Index=props=>{
  const profile=props.store.getState('profile');
  const backState=props.history.getState()?.backState;
  const selItem=props.history.getState()?.item;
  const stateItem=selItem||(profile.projectId?{_id:profile.projectId,name:profile.projectName,isDef:true}:defProject);

  const [selectedRows,setSelectedRows]=useState([]);

  const pageParams=props.params;
  const [result,update,pageChange,searchList]=useHandleList(listApiFn,{projectId:stateItem._id},{current:pageParams?.current,size:pageParams?.size});

  const handleTest=item=>{
    // console.log(item);
    props.router.push({
      path:`./test/${item._id}`,
      state:{item,backState:{path:props.path,params:{current,size},state:{item:selItem,backState}}},
    });
  };
  const handleEdit=item=>{
    // setModalItem(item);
    props.router.push({
      path:`./edit/${item._id}`,
      state:{item,backState:{path:props.path,params:{current,size},state:{item:selItem,backState}}},
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
        const {code,message:msg}=await deleteApiFn({ids});
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

  const back=()=>{
    backState?props.router.push(backState):props.history.back();
  };

  const rowSelection={
    selectedRowKeys:selectedRows.map(v=>v._id),
    onChange:(selectedRowKeys,selectedRows)=>{
      setSelectedRows(selectedRows);
    },
    getCheckboxProps:record=>({
      // disabled:!profile.role&&record._id!==profile._id,
    }),
    columnWidth:'30px',
  };

  const actions={
    handleTest,
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
      {
        !stateItem.isDef&&<Col>
          <Back back={back} />
        </Col>
      }
      {/* <Col>
        <Panel>
          <div>
            <span>项目名称：</span>
            <span>{stateItem.name}</span>
          </div>
          <div>
            <span>target：</span>
            <span>{stateItem.target}</span>
          </div>
        </Panel>
      </Col> */}
      <Col>
        <Panel>
          <div style={{overflow:'hidden',marginBottom:'10px'}}>
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
          </div>
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
    {/* <FormModal modalItem={modalItem} handleOk={handleModalOk} onCancel={()=>setModalItem(null)} /> */}
  </div>;
};

const SearchForm=props=>{
  const {submit,loading}=props;
  const [form]=Form.useForm();
  return <Form layout="inline" form={form} initialValues={{}} onFinish={value=>submit(validObj(value))}>
    <Form.Item name="url" label="url">
      <Input placeholder="请输入" allowClear style={{width:'120px'}} />
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






