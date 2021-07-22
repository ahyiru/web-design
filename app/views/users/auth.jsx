import {useState,useCallback,useEffect} from 'react';

import {components,utils} from '@common';

import {Tree,Modal,Button,Form,Dropdown,Menu,message} from 'antd';

import {DownOutlined,EyeInvisibleOutlined,LeftOutlined} from '@ant-design/icons';

import * as Icons from '@ant-design/icons';

import defProject from '@app/configs/projects';

import apiList from '@app/utils/getApis';

import useFetchList from '@app/hooks/useFetchList';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

const {listRouterFn,listAuthFn,setAuthFn}=apiList;

const {Row,Col}=components;

const {arr2TreeByPath,isValidArr,traverItem,sort}=utils;

// const {TreeNode} = Tree;
// 
// const { confirm } = Modal;

const rootNode={
  path:'',
  name:'路由权限设置',
  iconKey:'LayoutOutlined',
};

const Index=props=>{
  const [checkedKeys,setCheckedKeys]=useState([]);

  const [routerList]=useFetchList(listRouterFn,{projectId:defProject._id});

  const update=useCallback(async ()=>{
    const {code,result,message:msg}=await listAuthFn({
      uid:props.params.id,
    });
    if(code===200){
      setCheckedKeys(result||[]);
    }
  },[]);

  useEffect(()=>{
    update();
  },[]);

  const handleAuth=async ()=>{
    console.log(checkedKeys);
    const {code,result,message:msg}=await setAuthFn({
      uid:props.params.id,
      authKeys:checkedKeys.filter(Boolean),
    });
    if(code===200){
      message.success(`${msg} 请刷新页面查看当前路由状态是否生效！`);
      props.router.push(`/users`);
      // update();
    }
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const {isPending,data}=routerList;
  const arr=[rootNode,...sort(data||[],'createtime',true)].map(item=>{
    item.key=item.path;
    const Icon=Icons[item.iconKey]||EyeInvisibleOutlined;
    item.icon=<Icon />;
    return item;
  });
  const treeData=arr2TreeByPath(arr);
  const nodes=[];
  traverItem(item=>{
    if(isValidArr(item.children)){
      nodes.push(item.path);
    }
  })(treeData);
  const leafKeys=checkedKeys.filter(v=>!nodes.includes(v));

  return <div>
    <Row>
      <Col>
        <Back />
      </Col>
      <Col>
        <Panel>
          <Tree
            showIcon
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            titleRender={item=>item.name}
            treeData={treeData}
            virtual={false}
            checkable
            onCheck={onCheck}
            checkedKeys={leafKeys}
          />
          <div style={{padding:'12px 16px'}}>
            <Button type="primary" htmlType="submit" onClick={e=>handleAuth()}>保存</Button>
            <Button style={{marginLeft:'12px'}} onClick={()=>setCheckedKeys([])}>清空</Button>
          </div>
        </Panel>
      </Col>
    </Row>
  </div>;
};

export default Index;



































