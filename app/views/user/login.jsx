import {useEffect, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined, GithubOutlined} from '@ant-design/icons';
import {Spinner} from '@huxy/components';
import {storage} from '@huxy/utils';

import apiList from '@app/utils/getApis';

import {isAuthed} from '@app/utils/utils';

import {nameRule} from '@app/utils/rules';

import {useIntls} from '@app/components/intl';

const {activeEmailFn, githubFn, loginFn} = apiList;

const thirdLoginStyle = {
  textAlign: 'center',
  fontSize: '3.6rem',
};

const Index = props => {
  const getIntls = useIntls();
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    const {code, token} = props.params ?? {};
    if (code) {
      githubAuth(code);
      return;
    }
    if (token) {
      activeEmail(token);
      return;
    }
    if (isAuthed()) {
      props.router.push('/');
    }
  }, []);
  const githubAuth = async code => {
    setIsPending(true);
    try {
      const {code: msgCode, token} = await githubFn({code});
      if (msgCode === 200) {
        storage.set('token', token);
        location.href = '/';
      }
    } catch (err) {}
    setIsPending(false);
  };
  const activeEmail = async query => {
    setIsPending(true);
    try {
      const {code, token, message: msg} = await activeEmailFn({token: query});
      if (code === 200) {
        message.success(msg);
        storage.set('token', token);
        // props.router.push('/');
        location.href = '/';
      }
    } catch (err) {}
    setIsPending(false);
  };

  const onFinish = async values => {
    setIsPending(true);
    try {
      const {code, token, message: msg} = await loginFn(values);
      if (code === 200) {
        message.success(msg);
        storage.set('token', token);
        // props.router.push('/');
        location.href = '/';
      }
    } catch (err) {}
    setIsPending(false);
  };

  const auth = () => {
    const client_id = '61721ef923095e006d18';
    location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  };

  return (
    <>
      <Form name="login" initialValues={{}} onFinish={onFinish} autoComplete="off">
        <Form.Item name="name" rules={nameRule}>
          <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={getIntls('login.username')} />
        </Form.Item>
        <Form.Item name="password" /* rules={passwordRule} */>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={getIntls('login.password')} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {getIntls('login.login')}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block onClick={() => onFinish({name: 'test1', password: 'test1234'})}>
            {getIntls('login.visitor')}
          </Button>
        </Form.Item>
      </Form>
      <div>
        <div style={{overflow: 'hidden'}}>
          <a style={{float: 'right'}} onClick={e => props.router.push('/user/signup')}>
            {getIntls('login.signup')}
          </a>
          <a style={{float: 'left'}} onClick={e => props.router.push('/user/verifyEmail')}>
            {getIntls('login.forgetPwd')}
          </a>
        </div>
        <div className="split-line" style={{padding: '15px 0'}}>
          {getIntls('login.thirdParty')}
        </div>
        <div style={thirdLoginStyle}>
          <a>
            <GithubOutlined onClick={() => auth()} />
          </a>
        </div>
      </div>
      {isPending && <Spinner global />}
    </>
  );
};

export default Index;
