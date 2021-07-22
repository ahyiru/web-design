import {useEffect,useRef} from 'react';

import { Form, Input, Button, message,InputNumber,Select } from 'antd';

import apiList from '@app/utils/getApis';

import {components} from '@common';

import {layout,tailLayout,projectRoleList} from '@app/utils/config';
import {nameRule,emailRule,passwordRule,roleRule} from '@app/utils/rules';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

const {addProjectFn,editProjectFn}=apiList;

const {Row,Col}=components;

const Index=props=>{
  const [form] = Form.useForm();
  const state=props.history.getState();
  const onFinish = async values => {
    const handler=state?editProjectFn:addProjectFn;
    values=state?{...state,...values}:values;
    try{
      const {code,message:msg}=await handler(values);
      if(code===200){
        message.success(msg);
        props.router.push(`/projects`);
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
            name="addProject"
            onFinish={onFinish}
            form={form}
            initialValues={state??{}}
            {...layout}
            style={{width:'50%'}}
          >
            <Form.Item label="项目名" name="name" rules={nameRule}>
              <Input placeholder="项目名" />
            </Form.Item>
            {/* <Form.Item label="项目类型" name="type">
              <Input placeholder="项目类型" />
            </Form.Item> */}
            <Form.Item label="接口前缀" name="target">
              <Input placeholder="接口前缀" />
            </Form.Item>
            <Form.Item label="等级" name="role">
              <Select placeholder="请选择" allowClear style={{maxWidth:'250px'}}>
                {
                  projectRoleList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item label="描述" name="description">
              <Input.TextArea placeholder="描述" />
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

















