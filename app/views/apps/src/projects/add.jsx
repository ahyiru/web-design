import {Form, Input, Button, Select} from 'antd';

import {Row, Col} from '@huxy/components';

import apiList from '@app/utils/getApis';
import {layout, tailLayout, projectRoleList} from '@app/utils/configs';
import {nameRule} from '@app/utils/rules';

import Back from '@app/components/goBack';

import Panel from '@app/components/panel';

import {useIntls} from '@app/components/intl';

import {message} from '@app/utils/staticFunction';

const {addProjectFn, editProjectFn} = apiList;

const Index = props => {
  const getIntls = useIntls();
  const addFormText = getIntls('main.projects.addFormText', {});
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const onFinish = async values => {
    const handler = item ? editProjectFn : addProjectFn;
    values = item ? {...item, ...values} : values;
    try {
      const {code, message: msg} = await handler(values);
      if (code === 200) {
        message.success(msg);
        props.router.push(`/apps/projects`);
      }
    } catch (err) {
      console.log(err);
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
            <Form name="addProject" onFinish={onFinish} form={form} initialValues={item ?? {}} {...layout} style={{width: '50%'}}>
              <Form.Item label={addFormText.name} name="name" rules={nameRule}>
                <Input placeholder={addFormText.name_placeholder} />
              </Form.Item>
              {/* <Form.Item label="项目类型" name="type">
              <Input placeholder="项目类型" />
            </Form.Item> */}
              <Form.Item label={addFormText.target} name="target">
                <Input placeholder={addFormText.target_placeholder} />
              </Form.Item>
              <Form.Item label={addFormText.role} name="role">
                <Select placeholder={addFormText.role_placeholder} allowClear style={{maxWidth: '250px'}}>
                  {projectRoleList.map(v => (
                    <Select.Option key={v.value} value={v.value}>
                      {v.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={addFormText.description} name="description">
                <Input.TextArea placeholder={addFormText.description_placeholder} />
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
