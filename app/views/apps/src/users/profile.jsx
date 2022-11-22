import {Form, Input, Button, message, Tabs, Typography} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {layout} from '@app/utils/configs';
import {nameRule, emailRule, passwordRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {useIntls} from '@app/components/intl';

const formStyle = {
  padding: '10px 20px',
  maxWidth: '600px',
};

const Index = props => {
  const getIntls = useIntls();
  const profile = getIntls('main.users.profilePageText.profile', {});
  const upProfile = getIntls('main.users.profilePageText.upProfile', {});
  const values = userInfoStore.getState();

  const [form] = Form.useForm();
  const onFinish = async values => {
    const {code, message: msg} = await apiList.upUserFn(values);
    if (code === 200) {
      message.success(msg);
      // props.router.push('/');
      location.href = location.hash ? `#/profile` : `/profile`;
    }
  };

  const items = [
    {
      key: '1',
      label: profile.title,
      children: <div style={formStyle}>
        <Form name="profile" {...layout}>
          <Form.Item name="name" label={profile.name}>
            <Typography.Text>{values.name}</Typography.Text>
          </Form.Item>
          <Form.Item name="email" label={profile.email}>
            <Typography.Text>{values.email}</Typography.Text>
          </Form.Item>
          <Form.Item name="active" label={profile.active}>
            <Typography.Text>{values.active ? profile.active_true : profile.active_false}</Typography.Text>
          </Form.Item>
          <Form.Item name="projectName" label={profile.projectName}>
            <Typography.Text>{values.projectName}</Typography.Text>
          </Form.Item>
          <Form.Item name="role" label={profile.role}>
            <Typography.Text>{values.role}</Typography.Text>
          </Form.Item>
        </Form>
      </div>,
    },
    {
      key: '2',
      label: upProfile.title,
      children: <div style={formStyle}>
        <Form name="upProfile" form={form} autoComplete="off" initialValues={values} onFinish={onFinish}>
          <Form.Item name="name" rules={nameRule}>
            <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={upProfile.name} />
          </Form.Item>
          <Form.Item name="email" rules={emailRule}>
            <Input disabled prefix={<MailOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={upProfile.email} />
          </Form.Item>
          <Form.Item name="password" rules={passwordRule}>
            <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={upProfile.password} autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {upProfile.submit}
            </Button>
            <Button style={{marginLeft: '12px'}} onClick={() => form.setFieldsValue({name: '', password: ''})}>
              {upProfile.reset}
            </Button>
          </Form.Item>
        </Form>
      </div>,
    },
  ];

  return (
    <Panel>
      <Tabs type="card" items={items} />
    </Panel>
  );
};

export default Index;
