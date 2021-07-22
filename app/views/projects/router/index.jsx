import {useState,useCallback} from 'react';

import {components,utils,use} from '@common';

import {Tree,Modal,Dropdown,Menu,message,Input,Spin,Button} from 'antd';

import {DownOutlined,PlusOutlined,EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

import HandleModal from './modal';

import apiList from '@app/utils/getApis';

import defProject from '@app/configs/projects';

import useFetchList from '@app/hooks/useFetchList';

import formatTree from '@app/utils/formatTree';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

import customRender from '@app/utils/render';

const {listRouterFn,addRouterFn,editRouterFn,deleteRouterFn,listSchemaFn}=apiList;

const {Row,Col}=components;

const {traverItem,sort}=utils;

const {Search}=Input;

const {useSearch}=use;

const handleClick=({addFn,editFn,deleteFn},item)=><Menu>
  <Menu.Item onClick={()=>addFn(item)}>
    <a>
      <PlusOutlined />
      <span style={{padding:'0 4px'}}>新增</span>
    </a>
  </Menu.Item>
  {
    !item.isRoot&&<>
      <Menu.Item onClick={()=>editFn(item)}>
        <a>
          <EditOutlined />
          <span style={{padding:'0 4px'}}>编辑</span>
        </a>
      </Menu.Item>
      <Menu.Item onClick={()=>deleteFn(item)}>
        <a>
          <DeleteOutlined />
          <span style={{padding:'0 4px'}}>删除</span>
        </a>
      </Menu.Item>
    </>
  }
</Menu>;

const treeDrop=(item,dropFns)=><Dropdown overlay={()=>handleClick(dropFns,item)} trigger={['contextMenu']}><span className="node-style">{item.name}</span></Dropdown>;

const Index=props=>{
  const profile=props.store.getState('profile');
  const stateItem=props.history.getState()||(profile.projectId?{_id:profile.projectId,name:profile.projectName,isDef:true}:defProject);
  const rootNode={
    path:'',
    name:stateItem.name,
    iconKey:'LayoutOutlined',
    isRoot:true,
  };
  const [visible,setVisible]=useState(false);
  const [modalType,setModalType]=useState('');
  const [item,setItem]=useState({});
  const [filterTree,setFilterTree]=useSearch(null);
  const [selectedItem,setSelectedItem]=useState({});

  const [pageSchema,setPageSchema]=useState([]);

  const [result,update]=useFetchList(listRouterFn,{projectId:stateItem._id});

  const searchTree=value=>setFilterTree(tree,value,'name','path');

  const addFn=item=>{
    setVisible(true);
    setModalType('add');
    setItem({...item,parentId:item.path});
  };
  const editFn=item=>{
    setVisible(true);
    setModalType('edit');
    const {icon,children,key,...rest}=item;
    setItem(rest);
  };
  const deleteFn=item=>{
    const paths=[];
    traverItem(v=>{
      paths.push(v.path);
    })([item]);
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `path: ${paths.join()}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk:async ()=>{
        const {code,message:msg}=await deleteRouterFn({_id:item._id});
        if(code===200){
          message.success(msg);
          update();
        }
      },
      onCancel(){
        console.log('Cancel');
      },
    });
  };
  const onModalOk=async value=>{
    const handleFn=modalType==='edit'?editRouterFn:addRouterFn;
    const {code,message:msg}=await handleFn({...value,projectId:stateItem._id});
    if(code===200){
      message.success(msg);
      setVisible(false);
      update();
    }
  };

  const getPageSchema=useCallback(async (routerId,projectId)=>{
    const {code,message:msg,result}=await listSchemaFn({routerId,projectId});
    if(code===200){
      setPageSchema(result||[]);
    }
  },[]);

  const onSelect=(selectedKeys,e)=>{
    const item=e.selectedNodes[0];
    setSelectedItem(item);
    getPageSchema(item._id,item.projectId);
  };

  const toDesignPage=()=>{
    const {_id,path,name,iconKey,projectId}=selectedItem;
    props.router.push({
      path:`./${_id}`,
      state:{path,name,iconKey,projectId,pageSchema},
    });
  };

  const dropFns={
    addFn,
    editFn,
    deleteFn,
  };
  const {isPending,data}=result;

  const tree=formatTree([rootNode,...sort(data||[],'createtime',true)]);

  const treeData=filterTree||tree||[];
  return <div>
    <Row>
      {
        !stateItem.isDef&&<Col>
          <Back />
        </Col>
      }
      <Col width="240px">
        <Panel>
          <Spin spinning={isPending}>
            <Search placeholder="请输入名称" allowClear enterButton onSearch={searchTree} style={{maxWidth:'240px',marginBottom:12}} />
            <Tree
              showIcon
              defaultExpandAll
              switcherIcon={<DownOutlined />}
              titleRender={item=>treeDrop(item,dropFns)}
              treeData={treeData}
              onSelect={onSelect}
              virtual={false}
            />
          </Spin>
        </Panel>
      </Col>
      <Col auto>
        <Panel>
          <div style={{display:'flex',marginBottom:10}}>
            <h4 style={{flex:'auto',margin:0,lineHeight:'24px'}}>页面预览</h4>
            <Button type="primary" disabled={!selectedItem?._id} size="small" icon={<EditOutlined />} onClick={e=>toDesignPage()}>页面设计</Button>
          </div>
          <div style={{border:'1px solid rgba(255,255,255,.2)'}}>
            {customRender(pageSchema,{},props)}
          </div>
        </Panel>
      </Col>
    </Row>
    {
      visible&&<HandleModal
        onModalOk={onModalOk}
        onModalCancel={()=>setVisible(false)}
        modalVisible={visible}
        type={modalType}
        item={item}
        isRoot={!data?.length}
      />
    }
  </div>;
};

export default Index;




