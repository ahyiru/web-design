import {useEffect,useRef} from 'react';

import { Form, Input, Button, message,InputNumber,Select } from 'antd';

import {LeftOutlined} from '@ant-design/icons';

import Back from '@app/components/goBack';

import apiList from '@app/utils/getApis';

import {components} from '@common';

import {layout,tailLayout,roleList,methodList,paramsList} from '@app/utils/config';
import {nameRule,pathRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

import {testFetcher} from '@app/api/fetcher';

const strToJson=str=>(new Function(`return ${str}`))();

const {Row,Col}=components;

const formStyle={
  width:'50%',
};

const Index=props=>{
  const [form] = Form.useForm();
  const {getState,back}=props.history;
  const state=getState();
  const onFinish = async values => {
    try{
      const input=strToJson(values.input||'{}');
      const {url,method,type}=state;
      const paramsKey=type||method==='post'?'data':'params';
      const result=await testFetcher({url,method,[paramsKey]:input});
      form.setFieldsValue({
        output:JSON.stringify(result),
      });
    }catch(err){
      form.setFieldsValue({
        output:err,
      });
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
            // style={formStyle}
          >
            {/* <Form.Item label="接口名" name="name">
              <Input disabled placeholder="用户名" style={{width:'80%'}} />
            </Form.Item> */}
            <Row>
              <Col span={6}>
                <Form.Item label="地址" name="url">
                  <Input disabled placeholder="地址" style={{width:'60%'}} />
                </Form.Item>
                <Form.Item label="请求方式" name="method">
                  <Select disabled placeholder="请选择" allowClear style={{width:'60%'}}>
                    {
                      methodList.map(v=><Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="入参" name="input">
                  <Input.TextArea placeholder="入参" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="出参" name="output" labelCol={{span:4}} wrapperCol={{span:18}}>
                  <Input.TextArea readOnly rows={8} placeholder="出参" />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Col span={6}>
                <Form.Item label="入参" name="input">
                  <Input.TextArea placeholder="入参" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="出参" name="output">
                  <Input.TextArea disabled placeholder="出参" />
                </Form.Item>
              </Col>
            </Row> */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">测试</Button>
              <Button style={{marginLeft:'12px'}} onClick={()=>form.resetFields()}>重置</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Col>
    </Row>
  </div>;
};

export default Index;

















