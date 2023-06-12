import {useState} from 'react';
import {Form, Input, Button, Tabs, Typography, Space} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, MehOutlined, RiseOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';
import {message} from '@app/utils/staticFunction';

import {nameRule, emailRule, passwordRule, urlRule} from '@app/utils/rules';

import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {useIntls} from '@app/components/intl';

import {roleList} from '@app/utils/configs';

const formStyle = {
  padding: '10px 20px',
  width: '100%',
  maxWidth: '600px',
};

const Index = props => {
  const [pending, setPending] = useState(false);
  const getIntls = useIntls();
  const profile = getIntls('main.users.profilePageText.profile', {});
  const upProfile = getIntls('main.users.profilePageText.upProfile', {});
  const values = userInfoStore.getState();

  const [form] = Form.useForm();
  const onFinish = async values => {
    setPending(true);
    const {code, message: msg} = await apiList.upProfileFn(values);
    setPending(false);
    if (code === 200) {
      message.success(msg);
      // props.router.push('/');
      // location.href = location.hash ? `#/profile` : `/profile`;
      window.location.reload();
    }
  };

  const roleLabel = roleList.find(item => item.value === values.role)?.label ?? '普通用户';

  const leftDate = values.deadline ? Math.floor((values.deadline - new Date()) / 86400000) : 0;

  const items = [
    {
      key: '1',
      label: profile.title,
      children: (
        <div style={{display: 'flex'}}>
          <div style={formStyle}>
            <Form name="profile" className="sm-form-style">
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
                <Typography.Text>{roleLabel}</Typography.Text>
              </Form.Item>
              {
                leftDate ? <Form.Item name="leftDate" label="包月会员剩余时间">
                  <Typography.Text>{leftDate} 天</Typography.Text>
                </Form.Item> : null
              }
              {
                values.payCount ? <Form.Item name="payCount" label="包次会员剩余次数">
                  <Typography.Text>{values.payCount} 次</Typography.Text>
                </Form.Item> : null
              }
            </Form>
          </div>
          <Space align="center" style={{width: '140px'}}>
            {
              values.role === 0 ? <Button block type="primary" icon={<RiseOutlined />} size="large" onClick={e => props.router.push('/payer/count/member')}>开通会员</Button> : null
            }
            {
              values.role > 0 ? <Button block type="primary" icon={<RiseOutlined />} size="large" onClick={e => props.router.push('/payer/month/member')}>会员续费</Button> : null
            }
          </Space>
        </div>
      ),
    },
    {
      key: '2',
      label: upProfile.title,
      children: (
        <div style={formStyle}>
          <Form name="upProfile" className="sm-form-style" form={form} autoComplete="off" initialValues={values} onFinish={onFinish}>
            <Form.Item name="name" rules={nameRule}>
              <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={upProfile.name} />
            </Form.Item>
            <Form.Item name="avatar" rules={urlRule}>
              <Input prefix={<MehOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder="头像" />
            </Form.Item>
            <Form.Item name="email" rules={emailRule}>
              <Input disabled prefix={<MailOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={upProfile.email} />
            </Form.Item>
            <Form.Item name="password" rules={passwordRule}>
              <Input.Password prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={upProfile.password} autoComplete="new-password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {upProfile.submit}
              </Button>
              <Button disabled={pending} style={{marginLeft: '12px'}} onClick={() => form.setFieldsValue({name: '', password: ''})}>
                {upProfile.reset}
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <Panel>
      <Tabs type="card" items={items} />
    </Panel>
  );
};

export default Index;
