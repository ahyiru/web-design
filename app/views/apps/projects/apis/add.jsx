import {Form, Input, Button, message, Select} from 'antd';

import {Row, Col} from '@huxy/components';

import Back from '@app/components/goBack';
import apiList from '@app/utils/getApis';
import {layout, tailLayout, roleList, methodList, paramsList} from '@app/utils/config';
import {nameRule, pathRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import Intls from '@app/components/intl';

const {addApiFn, editApiFn} = apiList;

const formStyle = {
  width: '50%',
};

const Index = props => {
  const profile = userInfoStore.getState();
  const addFormText = Intls({keys: 'main.projectApis.addFormText'}) ?? {};
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };
  const onFinish = async values => {
    const handler = item ? editApiFn : addApiFn;
    values = item ? {...item, ...values} : values;
    // console.log(handler,values);
    try {
      const {code, message: msg} = await handler({...values, projectId: profile.projectId});
      if (code === 200) {
        message.success(msg);
        // props.router.push(`/users`);
        back();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Form name="addApi" onFinish={onFinish} form={form} initialValues={{method: 'get', ...item}} {...layout} style={formStyle}>
              <Form.Item label={addFormText.name} name="name" rules={nameRule}>
                <Input placeholder={addFormText.name} style={{width: '80%'}} />
              </Form.Item>
              <Form.Item label={addFormText.tags} name="tags" rules={nameRule}>
                <Input placeholder={addFormText.tags} style={{width: '80%'}} />
              </Form.Item>
              <Form.Item label={addFormText.url} name="url" rules={pathRule}>
                <Input placeholder={addFormText.url} style={{width: '80%'}} />
              </Form.Item>
              <Form.Item label={addFormText.method} name="method">
                <Select placeholder={addFormText.method} allowClear style={{width: '60%'}}>
                  {methodList.map(v => (
                    <Select.Option key={v.value} value={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={addFormText.dataType} name="dataType">
                <Select disabled placeholder={addFormText.dataType} allowClear style={{width: '60%'}}>
                  {paramsList.map(v => (
                    <Select.Option key={v.value} value={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={addFormText.auth} name="auth">
                <Select disabled placeholder={addFormText.auth} allowClear style={{width: '60%'}}>
                  {roleList.map(v => (
                    <Select.Option key={v.value} value={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={addFormText.input} name="input">
                <Input.TextArea placeholder={addFormText.input} />
              </Form.Item>
              <Form.Item label={addFormText.output} name="output">
                <Input.TextArea placeholder={addFormText.output} />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  {addFormText.submit}
                </Button>
                <Button style={{marginLeft: '12px'}} onClick={() => form.resetFields()}>
                  {addFormText.reset}
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
