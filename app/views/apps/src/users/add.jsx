import {useEffect, useState} from 'react';
import {Form, Input, Button, message, InputNumber, Select} from 'antd';
import {Row, Col} from '@huxy/components';
import Back from '@app/components/goBack';
import apiList from '@app/utils/getApis';
import {layout, tailLayout} from '@app/utils/configs';
import {nameRule, emailRule, passwordRule, roleRule} from '@app/utils/rules';
import Panel from '@app/components/panel';
import {useIntls} from '@app/components/intl';

const {addUserFn, editUserFn, listProjectFn} = apiList;

const Index = props => {
  const getIntls = useIntls();
  const addFormText = getIntls('main.users.addFormText', {});

  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      const {code, result} = await listProjectFn({current: 1, size: 200});
      if (code === 200) {
        setProjectList(result.list);
      }
    };
    getProjects();
  }, []);
  const onFinish = async values => {
    const handler = item ? editUserFn : addUserFn;
    values = item ? {...item, ...values} : values;
    const projectName = projectList.find(v => v._id === values.projectId)?.name;
    try {
      const {code, message: msg} = await handler({...values, projectName});
      if (code === 200) {
        message.success(msg);
        props.router.push(`/apps/users`);
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
            <Form name="addUser" onFinish={onFinish} form={form} initialValues={item ?? {}} {...layout} style={{width: '50%'}} autoComplete="off">
              <Form.Item label={addFormText.name} name="name" rules={nameRule}>
                <Input placeholder={addFormText.name} />
              </Form.Item>
              <Form.Item label={addFormText.email} name="email" rules={emailRule}>
                <Input placeholder={addFormText.email} />
              </Form.Item>
              <Form.Item label={addFormText.password} name="password" rules={passwordRule}>
                <Input type="password" placeholder={addFormText.password} autoComplete="new-password" />
              </Form.Item>
              <Form.Item label={addFormText.role} name="role" rules={roleRule}>
                <InputNumber placeholder={addFormText.role} />
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
