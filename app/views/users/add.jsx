import {useEffect,useRef,useState} from 'react';

import { Form, Input, Button, message,InputNumber,Select } from 'antd';

import {LeftOutlined} from '@ant-design/icons';

import Back from '@app/components/goBack';

import apiList from '@app/utils/getApis';

import {components} from '@common';

import {layout,tailLayout} from '@app/utils/config';
import {nameRule,emailRule,passwordRule,roleRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

const {addUserFn,editUserFn,listProjectFn}=apiList;

const {Row,Col}=components;

const formStyle={
  width:'50%',
};

const Index=props=>{
  const [form] = Form.useForm();
  const {getState}=props.history;
  const state=getState();
  const [projectList,setProjectList]=useState([]);
  useEffect(()=>{
    const getProjects=async ()=>{
      const {code,result}=await listProjectFn({current:1,size:200});
      if(code===200){
        setProjectList(result.list);
      }
    };
    getProjects();
  },[]);
  const onFinish = async values => {
    const handler=state?editUserFn:addUserFn;
    values=state?{...state,...values}:values;
    const projectName=projectList.find(v=>v._id===values.projectId)?.name;
    try{
      const {code,message:msg}=await handler({...values,projectName});
      if(code===200){
        message.success(msg);
        props.router.push(`/users`);
      }
    }catch(err){
      console.log(err);
    }
  };
  return <div>
    <Row>
      <Col>
        <Back />
      </Col>
      <Col>
        <Panel>
          <Form
            name="addUser"
            onFinish={onFinish}
            form={form}
            initialValues={state??{}}
            {...layout}
            style={formStyle}
          >
            <Form.Item label="用户名" name="name" rules={nameRule}>
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={emailRule}>
              <Input placeholder="邮箱" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={passwordRule}>
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item label="等级" name="role" rules={roleRule}>
              <InputNumber placeholder="等级" />
            </Form.Item>
            <Form.Item label="头像" name="avatar">
              <Input placeholder="头像" />
            </Form.Item>
            <Form.Item label="所在项目" name="projectId">
              <Select placeholder="请选择" allowClear style={{width:'80%'}}>
                {
                  projectList.map(v=><Select.Option key={v._id} value={v._id}>{v.name}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
              <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Col>
    </Row>
  </div>;
};

export default Index;

















