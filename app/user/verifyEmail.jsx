import {useState} from 'react';
import { Form, Input, Button, message, Result } from 'antd';
import { UserOutlined, LeftOutlined, MailOutlined } from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {emailRule} from '@app/utils/rules';

const Index=props=>{
  const [hasVerify,setHasVerify]=useState(false);
  const onFinish=async values=>{
    const {code,message:msg}=await apiList.verifyEmailFn(values);
    if(code===200){
      message.success(msg);
      setHasVerify(true);
      // props.router.push('/');
      // location.href='/';
    }
  };
  
  return !hasVerify?<>
    <Form name="verifyEmail" autoComplete="off" onFinish={onFinish}>
      <Form.Item name="email" rules={emailRule}>
        <Input prefix={<MailOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">邮箱验证</Button>
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
      title="验证成功！"
      subTitle="已向您的邮箱发送重置密码链接，请及时查收！"
      extra={<Button type="primary" key="back" onClick={()=>location.href='/'}>返回登录</Button>}
    />
  </div>;
};

export default Index;

















