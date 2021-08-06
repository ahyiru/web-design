import {useEffect,useState} from 'react';
import { Form, Input, Button, message, Tabs, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {layout} from '@app/utils/config';
import {nameRule,emailRule,passwordRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

const {TabPane}=Tabs;

const formStyle={
  padding:'10px 20px',
  maxWidth:'400px',
};

const Index=props=>{
  const i18ns=props.store.getState('i18ns');
  const i18nCfg=i18ns?.main.users??{};
  const {profilePageText:{profile={},upProfile={}}}=i18nCfg;

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
      <TabPane tab={profile.title} key="1">
        <div style={formStyle}>
          <Form name="profile" {...layout}>
            <Form.Item name="name" label={profile.name}>
              <Typography.Text>{values.name}</Typography.Text>
            </Form.Item>
            <Form.Item name="email" label={profile.email}>
              <Typography.Text>{values.email}</Typography.Text>
            </Form.Item>
            <Form.Item name="active" label={profile.active}>
              <Typography.Text>{values.active?profile.active_true:profile.active_false}</Typography.Text>
            </Form.Item>
            <Form.Item name="projectName" label={profile.projectName}>
              <Typography.Text>{values.projectName}</Typography.Text>
            </Form.Item>
            <Form.Item name="role" label={profile.role}>
              <Typography.Text>{values.role}</Typography.Text>
            </Form.Item>
          </Form>
        </div>
      </TabPane>
      <TabPane tab={upProfile.title} key="2">
        <div style={formStyle}>
          <Form name="upProfile" form={form} autoComplete="off" initialValues={values} onFinish={onFinish}>
            <Form.Item name="name" rules={nameRule}>
              <Input prefix={<UserOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder={upProfile.name} />
            </Form.Item>
            <Form.Item name="email" rules={emailRule}>
              <Input disabled prefix={<MailOutlined style={{marginRight:'7px',color:'#999'}} />} placeholder={upProfile.email} />
            </Form.Item>
            <Form.Item name="password" rules={passwordRule}>
              <Input prefix={<LockOutlined style={{marginRight:'7px',color:'#999'}} />} type="password" placeholder={upProfile.password} autoComplete="new-password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">{upProfile.submit}</Button>
              <Button style={{marginLeft:'12px'}} onClick={()=>form.setFieldsValue({name:'',password:''})}>{upProfile.reset}</Button>
            </Form.Item>
          </Form>
        </div>
      </TabPane>
    </Tabs>
  </Panel>;
};

export default Index;






