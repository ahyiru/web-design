import {Form, Input, Button, Select} from 'antd';

import {Row, Col} from '@huxy/components';

import Back from '@app/components/goBack';

import {layout, tailLayout, methodList} from '@app/utils/config';

import Panel from '@app/components/panel';

import {testFetcher} from '@app/apis/fetcher';

const strToJson = (str) => new Function(`return ${str}`)();

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.projectApis ?? {};
  const {addFormText = {}} = i18nCfg;
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState();
  const onFinish = async (values) => {
    try {
      const input = strToJson(values.input || '{}');
      const {url, method, type} = item;
      const paramsKey = type || method === 'post' ? 'data' : 'params';
      const result = await testFetcher({url, method, [paramsKey]: input});
      form.setFieldsValue({
        output: JSON.stringify(result),
      });
    } catch (err) {
      form.setFieldsValue({
        output: err,
      });
    }
  };
  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };
  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Form
              name="addApi"
              onFinish={onFinish}
              form={form}
              initialValues={{method: 'get', ...item}}
              {...layout}
              // style={formStyle}
            >
              {/* <Form.Item label="接口名" name="name">
              <Input disabled placeholder="用户名" style={{width:'80%'}} />
            </Form.Item> */}
              <Row>
                <Col span={6}>
                  <Form.Item label={addFormText.url} name="url">
                    <Input disabled placeholder={addFormText.url} style={{width: '60%'}} />
                  </Form.Item>
                  <Form.Item label={addFormText.method} name="method">
                    <Select disabled placeholder={addFormText.method} allowClear style={{width: '60%'}}>
                      {methodList.map((v) => (
                        <Select.Option key={v.value} value={v.value}>
                          {v.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label={addFormText.input} name="input">
                    <Input.TextArea placeholder={addFormText.input} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label={addFormText.output} name="output" labelCol={{span: 4}} wrapperCol={{span: 18}}>
                    <Input.TextArea readOnly rows={8} placeholder={addFormText.output} />
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
                <Button type="primary" htmlType="submit">
                  {addFormText.test}
                </Button>
                <Button style={{marginLeft: '12px'}} onClick={() => form.resetFields()}>
                  {addFormText.rest}
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
