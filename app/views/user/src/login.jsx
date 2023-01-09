import {useEffect, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined, GithubOutlined} from '@ant-design/icons';
import {Spinner} from '@huxy/components';
import {storage} from '@huxy/utils';

import {isAuthed, goPage} from '@app/utils/utils';

import {useIntls} from '@app/components/intl';

import {apiList, formRules, github_client_id, github_oauth_url} from '../configs';

const {activeEmailFn, githubFn, loginFn} = apiList;
const {nameRule} = formRules;

const thirdLoginStyle = {
  textAlign: 'center',
  fontSize: '3.6rem',
};

const Index = props => {
  const getIntls = useIntls();
  const [pending, setPending] = useState(false);
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
    setPending(true);
    try {
      const {code: msgCode, token} = await githubFn({code});
      if (msgCode === 200) {
        storage.set('token', token);
        // props.router.push('/');
        goPage();
      }
    } catch (err) {}
    setPending(false);
  };
  const activeEmail = async query => {
    setPending(true);
    try {
      const {code, token, message: msg} = await activeEmailFn({token: query});
      if (code === 200) {
        message.success(msg);
        storage.set('token', token);
        // props.router.push('/');
        goPage();
      }
    } catch (err) {}
    setPending(false);
  };

  const onFinish = async values => {
    setPending(true);
    try {
      const {code, token, message: msg} = await loginFn(values);
      if (code === 200) {
        message.success(msg);
        storage.set('token', token);
        // props.router.push('/');
        goPage();
      }
    } catch (err) {}
    setPending(false);
  };

  const auth = () => {
    location.href = `${github_oauth_url}?client_id=${github_client_id}`;
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
          <span className="link" style={{float: 'right'}} onClick={e => props.router.push('/user/signup')}>
            {getIntls('login.signup')}
          </span>
          <span className="link" style={{float: 'left'}} onClick={e => props.router.push('/user/verifyEmail')}>
            {getIntls('login.forgetPwd')}
          </span>
        </div>
        <div className="split-line" style={{padding: '15px 0'}}>
          {getIntls('login.thirdParty')}
        </div>
        <div style={thirdLoginStyle}>
          <span className="link">
            <GithubOutlined onClick={() => auth()} />
          </span>
        </div>
      </div>
      {pending && <Spinner global />}
    </>
  );
};

export default Index;
