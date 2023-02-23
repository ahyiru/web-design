import {useEffect, useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined, GithubOutlined, WechatOutlined} from '@ant-design/icons';
import {Spinner} from '@huxy/components';
import {storage, params2str, isWechat} from '@huxy/utils';

import {isAuthed, goPage} from '@app/utils/utils';

import {useIntls} from '@app/components/intl';

import {apiList, formRules, githubConfigs, wechatConfigs} from '../configs';

const {activeEmailFn, githubFn, wechatFn, loginFn} = apiList;
const {emailRule} = formRules;

const thirdLoginStyle = {
  textAlign: 'center',
  fontSize: '3.6rem',
};

const Index = props => {
  const getIntls = useIntls();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const {state, code, token} = props.params ?? {};
    if (code) {
      handleAuth(code, state);
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
  const handleAuth = async (code, state) => {
    setPending(true);
    const authFn = state === 'wechat' ? wechatFn : githubFn;
    try {
      const {code: msgCode, token} = await authFn({code});
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

  const githubCode = () => {
    const {github_oauth_url, github_client_id} = githubConfigs;
    location.href = `${github_oauth_url}?client_id=${github_client_id}`;
  };

  const wechatCode = () => {
    const {wechat_oauth_url, ...rest} = wechatConfigs;
    location.href = `${wechat_oauth_url}${params2str(rest)}#wechat_redirect`;
  };

  return (
    <>
      <Form name="login" initialValues={{}} onFinish={onFinish} autoComplete="off">
        <Form.Item name="email" rules={emailRule}>
          <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={getIntls('login.email')} />
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
          <Button block onClick={() => onFinish({name: 'test1@zys.com', password: 'test1234'})}>
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
            <GithubOutlined onClick={() => githubCode()} />
          </span>
          <span className="link" style={{marginLeft: '2rem', color: '#8ae14d'}}>
            <WechatOutlined onClick={() => wechatCode()} />
          </span>
        </div>
      </div>
      {pending && <Spinner global />}
    </>
  );
};

export default Index;
