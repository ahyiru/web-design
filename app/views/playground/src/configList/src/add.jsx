import {Form, Input, Button, InputNumber, Select} from 'antd';
import {Row, Col} from '@huxy/components';
import {message} from '@huxy/utils';
import Back from '@app/components/goBack';
import {layout, tailLayout} from '@app/utils/configs';
import {nameRule, emailRule, passwordRule, roleRule} from '@app/utils/rules';
import Panel from '@app/components/panel';

import {useIntls} from '@app/components/intl';

import {apiList} from '../configs';

const {addUser, editUser, projectList} = apiList;

const Index = props => {
  const getIntls = useIntls();
  const addFormText = getIntls('main.users.addFormText', {});

  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const onFinish = async values => {
    const handler = item ? editUser : addUser;
    values = item ? {...item, ...values} : values;
    const projectName = projectList.find(v => v._id === values.projectId)?.name ?? '';
    try {
      const {code, message: msg} = await handler({...values, projectName});
      if (code === 200) {
        message.success(msg);
        props.router.push(`/playground/configList`);
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
            <Form name="addUser" onFinish={onFinish} form={form} initialValues={item ?? {}} {...layout} style={{width: '100%', maxWidth: '600px'}} autoComplete="off">
              <Form.Item label={addFormText.name} name="name" rules={nameRule}>
                <Input placeholder={addFormText.name} />
              </Form.Item>
              <Form.Item label={addFormText.email} name="email" rules={emailRule}>
                <Input placeholder={addFormText.email} />
              </Form.Item>
              <Form.Item label={addFormText.password} name="password" /* rules={passwordRule} */>
                <Input type="password" placeholder={addFormText.password} autoComplete="new-password" />
              </Form.Item>
              <Form.Item label={addFormText.role} name="role" rules={roleRule}>
                <InputNumber placeholder={addFormText.role} style={{width: '160px'}} />
              </Form.Item>
              <Form.Item label={addFormText.avatar} name="avatar">
                <Input placeholder={addFormText.avatar} />
              </Form.Item>
              <Form.Item label={addFormText.projectId} name="projectId">
                <Select placeholder={addFormText.projectId} allowClear style={{width: '80%'}}>
                  {projectList.map(v => (
                    <Select.Option key={v._id} value={v._id}>
                      {v.name}
                    </Select.Option>
                  ))}
                </Select>
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
