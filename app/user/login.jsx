import {useEffect,useState} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import {utils,components} from '@common';

import apiList from '@app/utils/getApis';

import {isAuthed} from '@app/utils/utils';

import {nameRule,emailRule,passwordRule} from '@app/utils/rules';

const {activeEmailFn,githubFn,loginFn}=apiList;

const {Spinner}=components;

const {storage}=utils;

const thirdLoginStyle={
  textAlign:'center',
  fontSize:'3.6rem',
};

const Index=props=>{
  const [isPending,setIsPending]=useState(false);
  useEffect(()=>{
    const {code,token}=props.params??{};
    if(code){
      githubAuth(code);
      return;
    }
    if(token){
      activeEmail(token);
      return;
    }
    if(isAuthed()){
      props.router.push('/');
    }
  },[]);
  const githubAuth=async code=>{
    setIsPending(true);
    try{
      const {code:msgCode,token}=await githubFn({code});
      if(msgCode===200){
        storage.set('token',token);
        location.href='/';
      }
    }catch(err){}
    setIsPending(false);
  };
  const activeEmail=async query=>{
    setIsPending(true);
    try{
      const {code,token,message:msg}=await activeEmailFn({token:query});
      if(code===200){
        message.success(msg);
        storage.set('token',token);
        // props.router.push('/');
        location.href='/';
      }
    }catch(err){}
    setIsPending(false);
  };

  const onFinish=async values=>{
    setIsPending(true);
    try{
      const {code,token,message:msg}=await loginFn(values);
      if(code===200){
        message.success(msg);
        storage.set('token',token);
        // props.router.push('/');
        location.href='/';
      }
    }catch(err){}
    setIsPending(false);
  };

  const auth=()=>{
    const client_id='61721ef923095e006d18';
    location.href=`https://github.com/login/oauth/authorize?client_id=${client_id}`;
  };
  
  return <>
    <Form name="login" initialValues={{}} onFinish={onFinish} autoComplete="off">
      <Form.Item name="name" rules={nameRule}>
        <Input prefix={<UserOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" /* rules={passwordRule} */>
        <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">登录</Button>
      </Form.Item>
      <Form.Item>
        <Button block onClick={()=>onFinish({name:'test1',password:'test1234'})}>游客登录</Button>
      </Form.Item>
    </Form>
    <div>
      <div style={{overflow:'hidden'}}>
        <a style={{float:'right'}} onClick={e=>props.router.push('/user/signup')}>注册</a>
        <a style={{float:'left'}} onClick={e=>props.router.push('/user/verifyEmail')}>忘记密码</a>
      </div>
      <div className="or" style={{padding:'15px 0'}}>第三方登录</div>
      <div style={thirdLoginStyle}>
        <a><GithubOutlined onClick={()=>auth()} /></a>
      </div>
    </div>
    {isPending&&<Spinner global />}
  </>;
};

export default Index;

















