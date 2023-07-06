import {useState} from 'react';
import {Form, Input, Button, Radio, InputNumber} from 'antd';
import {Row, Col} from '@huxy/components';
import {message} from '@huxy/utils';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {apiList, formConfigs, formRules, category} from '../configs';

const {addPromptFn, editPromptFn} = apiList;
const {layout, tailLayout} = formConfigs;
const {nameRule} = formRules;

const formStyle = {
  width: '60%',
};

const Index = props => {
  const profile = userInfoStore.getState();
  const isAdmin = profile.role === 5;
  const [pending, setPending] = useState(false);
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };
  const onFinish = async values => {
    const handler = item ? editPromptFn : addPromptFn;
    values = item ? {...item, ...values} : values;
    setPending(true);
    try {
      const {code, message: msg} = await handler(values);
      if (code === 200) {
        message.success(msg);
        back();
      }
    } catch (err) {
      console.log(err);
    }
    setPending(false);
  };
  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Form name="addPrompt" onFinish={onFinish} form={form} initialValues={{category: 'text', ...item}} {...layout} style={formStyle}>
              <Form.Item name="category" label="类别" rules={[{required: true}]}>
                <Radio.Group options={category} optionType="button" disabled={!isAdmin} />
              </Form.Item>
              {/* <Form.Item label="类型" name="type" rules={[{required: true}]}>
                <Input placeholder="请输入" />
              </Form.Item> */}
              <Form.Item label="label" name="label" rules={[{required: true}]}>
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="value" name="value" rules={[{required: true}]}>
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="prompt" name="prompt" rules={[{required: true}]}>
                <Input.TextArea autoSize={{minRows: 3}} placeholder="请输入" />
              </Form.Item>
              {
                isAdmin ? <>
                  <Form.Item label="可见性" name="visibility">
                    <InputNumber placeholder="请输入" />
                  </Form.Item>
                  <Form.Item label="等级" name="userRole">
                    <InputNumber placeholder="请输入" />
                  </Form.Item>
                </> : null
              }
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: '12px'}} onClick={() => back()}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" disabled={pending}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
