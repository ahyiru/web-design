import {useEffect} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LeftOutlined } from '@ant-design/icons';
import apiList from '@app/utils/getApis';
import {utils} from '@common';

import {nameRule,emailRule,passwordRule,confirmRule} from '@app/utils/rules';

const {storage,getParams}=utils;


const Index=props=>{
  const onFinish=async values=>{
    const query=props.params?.token;
    const {code,token,message:msg}=await apiList.setNewPwdFn({password:values.password,token:query});
    if(code===200){
      message.success(msg);
      // storage.set('token',token);
      // props.router.push('/');
      location.href='/';
    }
  };
  
  return <>
    <Form name="setNewPwd" autoComplete="off" onFinish={onFinish}>
      <Form.Item name="password" rules={passwordRule}>
        <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item name="confirm" rules={confirmRule}>
        <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">重置密码</Button>
      </Form.Item>
    </Form>
    <div>
      <div style={{textAlign:'center'}}>
        <Button onClick={e=>props.router.push('/user/signin')} type="link" size="small" icon={<LeftOutlined />}>返回登录</Button>
      </div>
    </div>
  </>;
};

export default Index;

















