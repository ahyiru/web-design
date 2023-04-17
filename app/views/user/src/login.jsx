import {useEffect, useState, useRef} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined, GithubOutlined, WechatOutlined} from '@ant-design/icons';
import QRCode from 'qrcode';
import {Spinner, Mask} from '@huxy/components';
import {useUpdate} from '@huxy/use';
import {storage, params2str, isWechat, sleep, uuidv4, message} from '@huxy/utils';

import {isAuthed, goPage} from '@app/utils/utils';

import {useIntls} from '@app/components/intl';

import {apiList, formRules, githubConfigs, wechatConfigs} from '../configs';

const {activeEmailFn, githubFn, wechatFn, loginFn/* , qrTicketFn */, qrStatusFn} = apiList;
const {emailRule} = formRules;

const thirdLoginStyle = {
  textAlign: 'center',
  fontSize: '3.6rem',
};

const scanLoginStyle = {
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.8rem',
  background: '#fcfcfc',
  color: '#43a047',
  fontWeight: 500,
};

let fetchQrStatusCount = 0;

const Index = props => {
  const getIntls = useIntls();
  const [pending, setPending] = useState(false);
  const qrRef = useRef();
  const rerender = useUpdate();
  const {state, code, token} = props.params ?? {};
  const isScan = state?.indexOf('scan0') === 0;
  useEffect(() => {
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
  const setScan = data => {
    qrRef.current = data;
    fetchQrStatusCount = 0;
    rerender();
  };
  const getQrStatus = async status => {
    if (!qrRef.current) {
      return;
    }
    if (fetchQrStatusCount > 40) {
      setScan();
      message.error('请稍后再试！');
      fetchQrStatusCount = 0;
      return;
    }
    const result = await qrStatusFn({status});
    if (result.status) {
      setScan();
      if (result.status === 'error') {
        message.error('登录失败！');
        return;
      }
      message.success('登录成功！');
      storage.set('token', result.status);
      goPage();
    } else {
      fetchQrStatusCount++;
      await sleep(1200);
      getQrStatus(status);
    }
  };
  const generateQR = async state => {
    const {wechat_oauth_url, ...rest} = wechatConfigs;
    const url = `${wechat_oauth_url}${params2str({...rest, state})}#wechat_redirect`;
    try {
      const qr = await QRCode.toDataURL(url);
      setScan(qr);
    } catch (err) {
      console.error(err);
    }
  };
  const getQr = async () => {
    const qrUuid = `scan0${uuidv4().replaceAll('-', '0')}`;
    // const result = await qrTicketFn();
    await generateQR(qrUuid);
    getQrStatus(qrUuid);
  };
  const handleAuth = async (code, state) => {
    setPending(true);
    const authFn = !state ? githubFn : wechatFn;
    try {
      const {token} = await authFn({code, state});
      if (token) {
        storage.set('token', token);
        // props.router.push('/');
        goPage();
      } else {
        setPending(false);
        /* eslint-disable */
        setTimeout(() => WeixinJSBridge.call('closeWindow'), 1000);
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

  if (isScan) {
    return <div style={scanLoginStyle}>{pending ? '正在登录...' : '登录成功！'}</div>;
  }

  return (
    <>
      <Form name="login" initialValues={{}} onFinish={onFinish} autoComplete="off">
        <Form.Item name="email" rules={emailRule}>
          <Input prefix={<UserOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={getIntls('login.email')} />
        </Form.Item>
        <Form.Item name="password" /* rules={passwordRule} */>
          <Input.Password prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={getIntls('login.password')} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {getIntls('login.login')}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block onClick={() => onFinish({email: 'test1@zys.com', password: 'test1234'})}>
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
          <span className="link" style={{marginLeft: '3rem', color: '#8ae14d'}}>
            <WechatOutlined onClick={() => isWechat() ? wechatCode() : getQr()} />
          </span>
        </div>
        <Mask open={qrRef.current} close={e => setScan()}>
          {
            qrRef.current ? <div style={{width: '85%', maxWidth: '35rem', textAlign: 'center', background: '#333', padding: '15px 20px', color: '#fff', fontWeight: 500}}>
              <h2 style={{margin: 0,}}>微信登录</h2>
              <div style={{padding: '20px'}}><img width="100%" src={qrRef.current} alt="qr" /></div>
              <p style={{margin: '0 20px', marginBottom: 0, height: '32px', lineHeight: '32px', background: '#232323', borderRadius: '16px'}}>请使用微信扫描二维码登录</p>
            </div> : <div style={{color: '#43a047', fontWeight: 500, fontSize: '3rem'}}>登录中...</div>
          }
        </Mask>
      </div>
      {pending && <Spinner global />}
    </>
  );
};

export default Index;
