import {useState} from 'react';
import {Form, Input, Button, message, Result} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, LeftOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {nameRule, emailRule, passwordRule, confirmRule} from '@app/utils/rules';

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.login ?? {};

  const [hasSignup, setHasSignup] = useState(false);
  const onFinish = async (values) => {
    const {code, message: msg} = await apiList.signupFn(values);
    if (code === 200) {
      message.success(msg);
      setHasSignup(true);
      // props.router.push('/');
      // location.href='/';
    }
  };
  return !hasSignup ? (
    <>
      <Form name="signup" autoComplete="off" onFinish={onFinish}>
        <Form.Item name="name" rules={nameRule}>
          <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={i18nCfg.username} />
        </Form.Item>
        <Form.Item name="email" rules={emailRule}>
          <Input prefix={<MailOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={i18nCfg.email} />
        </Form.Item>
        <Form.Item name="password" rules={passwordRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={i18nCfg.password} autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="confirm" rules={confirmRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={i18nCfg.confirmPwd} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {i18nCfg.signup}
          </Button>
        </Form.Item>
      </Form>
      <div>
        <div style={{textAlign: 'center'}}>
          <Button onClick={(e) => props.router.push('/user/signin')} type="link" size="small" icon={<LeftOutlined />}>
            {i18nCfg.backLogin}
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div style={{background: '#ccc', borderRadius: '4px'}}>
      <Result
        status="success"
        title={i18nCfg.signup_msg}
        subTitle={i18nCfg.signup_sub_msg}
        extra={
          <Button type="primary" key="back" onClick={() => (location.href = '/')}>
            {i18nCfg.backLogin}
          </Button>
        }
      />
    </div>
  );
};

export default Index;
