import {useEffect,useState} from 'react';
import { Form, Input, Button, message, Tabs, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {layout,tailLayout} from '@app/utils/config';
import {nameRule,emailRule,passwordRule,confirmRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

const {TabPane}=Tabs;

const formStyle={
  padding:'10px 20px',
  maxWidth:'400px',
};

const Index=props=>{
  const [values,setValues]=useState({});
  const [form] = Form.useForm();
  useEffect(()=>{
    props.store.subscribe('profile',(result)=>{
      if(result){
        // form.setFieldsValue(result);
        setValues(result);
      }
    });
  },[]);
  const onFinish=async values=>{
    const {code,message:msg}=await apiList.upUserFn(values);
    if(code===200){
      message.success(msg);
      // props.router.push('/');
      location.href='#/profile';
    }
  };
  
  return <Panel>
    <Tabs type="card">
      <TabPane tab="个人信息" key="1">
        <div style={formStyle}>
          <Form name="profile" {...layout}>
            <Form.Item name="name" label="用户名">
              <Typography.Text>{values.name}</Typography.Text>
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <Typography.Text>{values.email}</Typography.Text>
            </Form.Item>
            <Form.Item name="active" label="状态">
              <Typography.Text>{values.active?'已激活':'未激活'}</Typography.Text>
            </Form.Item>
            <Form.Item name="role" label="等级">
              <Typography.Text>{values.role}</Typography.Text>
            </Form.Item>
          </Form>
        </div>
      </TabPane>
      <TabPane tab="更新信息" key="2">
        <div style={formStyle}>
          <Form name="upProfile" form={form} autoComplete="off" initialValues={values} onFinish={onFinish}>
            <Form.Item name="name" rules={nameRule}>
              <Input prefix={<UserOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="email" rules={emailRule}>
              <Input disabled prefix={<MailOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder="邮箱" />
            </Form.Item>
            <Form.Item name="password" rules={passwordRule}>
              <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">确认修改</Button>
              <Button style={{marginLeft:'12px'}} onClick={()=>form.setFieldsValue({name:'',password:''})}>重置</Button>
            </Form.Item>
          </Form>
        </div>
      </TabPane>
    </Tabs>
  </Panel>;
};

export default Index;

















