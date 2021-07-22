import {useState} from 'react';
import { Form, Input, Button, message, Result } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, LeftOutlined } from '@ant-design/icons';
import apiList from '@app/utils/getApis';
// import {utils} from '@common';

import {nameRule,emailRule,passwordRule,confirmRule} from '@app/utils/rules';

const Index=props=>{
  const [hasSignup,setHasSignup]=useState(false);
  const onFinish=async values=>{
    const {code,message:msg}=await apiList.signupFn(values);
    if(code===200){
      message.success(msg);
      setHasSignup(true);
      // props.router.push('/');
      // location.href='/';
    }
  };
  return !hasSignup?<>
    <Form name="signup" autoComplete="off" onFinish={onFinish}>
      <Form.Item name="name" rules={nameRule}>
        <Input prefix={<UserOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="email" rules={emailRule}>
        <Input prefix={<MailOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item name="password" rules={passwordRule}>
        <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item name="confirm" rules={confirmRule}>
        <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
    <div>
      <div style={{textAlign:'center'}}>
        <Button onClick={e=>props.router.push('/user/signin')} type="link" size="small" icon={<LeftOutlined />}>返回登录</Button>
      </div>
    </div>
  </>:<div style={{background:'#ccc',borderRadius:'4px'}}>
    <Result
      status="success"
      title="注册成功！"
      subTitle="已向您的邮箱发送激活链接，请及时查收激活！"
      extra={<Button type="primary" key="back" onClick={()=>location.href='/'}>返回登录</Button>}
    />
  </div>;
};

export default Index;

















