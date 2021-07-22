import {useEffect,useRef} from 'react';

import { Form, Input, Button, message,InputNumber,Select } from 'antd';

// import {LeftOutlined} from '@ant-design/icons';

import Back from '@app/components/goBack';

import apiList from '@app/utils/getApis';

import {components} from '@common';

import {layout,tailLayout,roleList,methodList,paramsList} from '@app/utils/config';
import {nameRule,pathRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

const {addApiFn,editApiFn}=apiList;

const {Row,Col}=components;

const formStyle={
  width:'50%',
};

const Index=props=>{
  // const profile=props.store.getState('profile');
  const [form] = Form.useForm();
  const {getState,back}=props.history;
  const state=getState();
  const onFinish = async values => {
    const handler=state?editApiFn:addApiFn;
    values=state?{...state,...values}:values;
    // console.log(handler,values);
    try{
      const {code,message:msg}=await handler({...values,projectId:props.params.projectId});
      if(code===200){
        message.success(msg);
        // props.router.push(`/users`);
        back();
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
            name="addApi"
            onFinish={onFinish}
            form={form}
            initialValues={{method:'get',...state}}
            {...layout}
            style={formStyle}
          >
            <Form.Item label="接口名" name="name" rules={nameRule}>
              <Input placeholder="接口名" style={{width:'80%'}} />
            </Form.Item>
            <Form.Item label="标签" name="tags" rules={nameRule}>
              <Input placeholder="标签" style={{width:'80%'}} />
            </Form.Item>
            <Form.Item label="地址" name="url" rules={pathRule}>
              <Input placeholder="地址" style={{width:'80%'}} />
            </Form.Item>
            <Form.Item label="请求方式" name="method">
              <Select placeholder="请选择" allowClear style={{width:'60%'}}>
                {
                  methodList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item label="参数类型" name="type">
              <Select disabled placeholder="请选择" allowClear style={{width:'60%'}}>
                {
                  paramsList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item label="接口权限" name="auth">
              <Select disabled placeholder="请选择" allowClear style={{width:'60%'}}>
                {
                  roleList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item label="入参" name="input">
              <Input.TextArea placeholder="入参" />
            </Form.Item>
            <Form.Item label="出参" name="output">
              <Input.TextArea placeholder="出参" />
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

















