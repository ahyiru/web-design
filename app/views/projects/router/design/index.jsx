import {useState,useEffect} from 'react';

import {components,utils} from '@common';

import {Tree,Modal,Dropdown,Menu,message,Spin} from 'antd';

import {DownOutlined,PlusOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

import apiList from '@app/utils/getApis';

import defProject from '@app/configs/projects';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

import HandleModal from './modal';

import CommonEditor from './commonEditor';

import FormEditor from './formEditor';

import TableEditor from './table';

// import indexSchema from '@app/models/schema/indexSchema';
// import addSchema from '@app/models/schema/addSchema';

const {setSchemaFn}=apiList;

const {Row,Col}=components;

const {updateId,addNodes,editNodes,deleteNodes,moveNodes,cacheData,clone,selectedHandle,session}=utils;

const {record,undo,redo,clean}=cacheData();

const handleClick=({addFn,editFn,deleteFn},item)=><Menu>
  <Menu.Item key="add" onClick={()=>addFn(item)}>
    <a>
      <PlusOutlined />
      <span style={{padding:'0 4px'}}>新增</span>
    </a>
  </Menu.Item>
  {
    !item.isRoot&&<Menu.Item key="delete" onClick={()=>deleteFn(item)}>
      <a>
        <DeleteOutlined />
        <span style={{padding:'0 4px'}}>删除</span>
      </a>
    </Menu.Item>
  }
</Menu>;

const treeDrop=(item,dropFns)=><Dropdown overlay={()=>handleClick(dropFns,item)} trigger={['contextMenu']}><span className="node-style">{item.type}</span></Dropdown>;

const getSelected=(data,id)=>{
  let selected={};
  selectedHandle((data,i)=>{
    selected=data[i];
  })(data,id,'key');
  return selected;
};

const Index=props=>{
  const profile=props.store.getState('profile');
  const {getState,back}=props.history;
  const stateItem=getState()||(profile.projectId?{_id:profile.projectId,name:profile.projectName,isDef:true}:defProject);
  const rootNode={
    type:stateItem?.name,
    isRoot:true,
    key:'-1',
  };
  const [visible,setVisible]=useState(false);
  const [modalType,setModalType]=useState('');
  const [selectedKey,setSelectedKey]=useState('');
  // const [selectedItem,setSelectedItem]=useState({});
  const pageSchema=stateItem?.pageSchema?Array.isArray(stateItem.pageSchema)?stateItem.pageSchema:[stateItem.pageSchema]:[];

  const [schema,setSchema]=useState([{...rootNode,children:pageSchema}]);

  const [disableUndo,setDisableUndo]=useState(true);
  const [disableRedo,setDisableRedo]=useState(true);

  const schemaTree=updateId(schema,'key');
  useEffect(()=>{
    record(clone(schemaTree));
    return ()=>clean();
  },[]);

  const addFn=item=>{
    setVisible(true);
    setModalType('add');
  };
  const editFn=item=>{
    setVisible(true);
    setModalType('edit');
  };
  const deleteFn=item=>{
    Modal.confirm({
      title: '确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      content: `component: ${item.type}`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=>{
        const tree=deleteNodes(schemaTree,item.key,'key');
        setSchema(tree);
      },
      onCancel(){
        console.log('Cancel');
      },
    });
  };
  const onModalOk=values=>{
    const tree=addNodes(schemaTree,selectedKey,[values],'key');
    setSchema(tree);
  };

  const editProps=values=>{
    const tree=editNodes(schemaTree,selectedKey,{props:values},'key');
    setSchema(tree);
    record(clone(tree));
    setDisableUndo(false);
  };

  const onSelect=(selectedKeys,e)=>{
    setSelectedKey(e.node.key);
  };

  const saveConfigs=async ()=>{
    const {routerId,projectId}=props.params||{};
    // console.log('pageSchema:',schemaTree);
    const schemas=schemaTree[0].children;//[indexSchema];[addSchema];
    const {code,message:msg}=await setSchemaFn({pageSchema:schemas,routerId,projectId});
    if(code===200){
      message.success(msg);
      back();
    }
  };
  const preview=()=>{
    /* props.router.push({
      path:'./preview',
      state:schemaTree,
    }); */
    const {routerId,projectId}=props.params||{};

    const schemas=schemaTree[0].children;
    session.set(routerId,schemas);

    const {hash,origin}=location;
    const q=`?projectId=${projectId}&routerId=${routerId}`;
    const url=hash?`${origin}/#/preview${q}`:`${origin}/preview${q}`;
    window.open(url);
  };

  const onDrop=info=>{
    const fromId=info.dragNode.key;
    const toId=info.node.key;
    const dropPosition=info.dropPosition;
    const tree=moveNodes(schemaTree,fromId,toId,dropPosition,'key');
    setSchema(tree);
  };

  const undoDesign=()=>{
    const {index,data}=undo();
    setSchema(data);
    if(index===0){
      setDisableUndo(true);
    }
    setDisableRedo(false);
  };

  const redoDesign=()=>{
    const {index,length,data}=redo();
    setSchema(data);
    if(index===length-1){
      setDisableRedo(true);
    }
    setDisableUndo(false);
  };

  const topActions=[
    {
      text:'预览',
      icon:'EyeOutlined',
      type:'primary',
      onClick:preview,
      style:{float:'right'},
    },
    {
      text:'保存配置',
      icon:'SaveOutlined',
      type:'primary',
      onClick:saveConfigs,
      style:{float:'right',marginRight:12},
    },
    {
      text:'重做',
      icon:'RedoOutlined',
      // type:'primary',
      onClick:redoDesign,
      style:{float:'right',marginRight:12},
      disabled:disableRedo,
    },
    {
      text:'撤销',
      icon:'UndoOutlined',
      // type:'primary',
      onClick:undoDesign,
      style:{float:'right',marginRight:12},
      disabled:disableUndo,
    },
  ];

  const dropFns={
    addFn,
    editFn,
    deleteFn,
  };

  const item=getSelected(schemaTree,selectedKey);

  const CfgComp=type=>{
    const DefultComp=<Panel><CommonEditor getValues={editProps} data={item?.props} title="属性配置" selectedKey={item?.key} /></Panel>;
    const Comps={
      CustomForm:<FormEditor getValues={editProps} data={[item?.props?.schema]} />,
      CustomTable:<TableEditor getValues={editProps} data={item?.props} />,
    };
    return Comps[type]||DefultComp;
  };

  return <div>
    <Row>
      {
        !stateItem.isDef&&<Col>
          <Back actions={topActions} />
        </Col>
      }
      <Col width="240px">
        <Panel>
          <Spin spinning={false}>
            <Tree
              showIcon
              defaultExpandAll
              switcherIcon={<DownOutlined />}
              titleRender={item=>treeDrop(item,dropFns)}
              treeData={schemaTree}
              onSelect={onSelect}
              virtual={false}
              draggable
              onDrop={onDrop}
            />
          </Spin>
        </Panel>
      </Col>
      <Col auto>
        {
          CfgComp(item?.type)
        }
      </Col>
    </Row>
    {
      visible&&<HandleModal
        onModalOk={onModalOk}
        onModalCancel={()=>setVisible(false)}
        modalVisible={visible}
        type={modalType}
        item={item}
      />
    }
  </div>;
};

export default Index;


