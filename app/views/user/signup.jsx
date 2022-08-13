import {useState} from 'react';
import {Form, Input, Button, message, Result} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, LeftOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';
import {nameRule, emailRule, passwordRule, confirmRule} from '@app/utils/rules';
import {useIntls} from '@app/components/intl';

const Index = props => {
  const getIntls = useIntls();
  const [hasSignup, setHasSignup] = useState(false);
  const onFinish = async values => {
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
          <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={getIntls('login.username')} />
        </Form.Item>
        <Form.Item name="email" rules={emailRule}>
          <Input prefix={<MailOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={getIntls('login.email')} />
        </Form.Item>
        <Form.Item name="password" rules={passwordRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={getIntls('login.password')} autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="confirm" rules={confirmRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={getIntls('login.confirmPwd')} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {getIntls('login.signup')}
          </Button>
        </Form.Item>
      </Form>
      <div>
        <div style={{textAlign: 'center'}}>
          <Button onClick={e => props.router.push('/user/signin')} type="link" size="small" icon={<LeftOutlined />}>
            {getIntls('login.backLogin')}
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div style={{background: '#ccc', borderRadius: '4px'}}>
      <Result
        status="success"
        title={getIntls('login.signup_msg')}
        subTitle={getIntls('login.signup_sub_msg')}
        extra={
          <Button type="primary" key="back" onClick={() => (location.href = '/')}>
            {getIntls('login.backLogin')}
          </Button>
        }
      />
    </div>
  );
};

export default Index;
