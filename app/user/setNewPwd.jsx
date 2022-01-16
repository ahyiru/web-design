import {Form, Input, Button, message} from 'antd';
import {LockOutlined, LeftOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {passwordRule, confirmRule} from '@app/utils/rules';

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.login ?? {};

  const onFinish = async (values) => {
    const query = props.params?.token;
    const {code, token, message: msg} = await apiList.setNewPwdFn({password: values.password, token: query});
    if (code === 200) {
      message.success(msg);
      // storage.set('token',token);
      // props.router.push('/');
      location.href = '/';
    }
  };

  return (
    <>
      <Form name="setNewPwd" autoComplete="off" onFinish={onFinish}>
        <Form.Item name="password" rules={passwordRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={i18nCfg.password} autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="confirm" rules={confirmRule}>
          <Input prefix={<LockOutlined style={{marginRight: '7px', color: '#999'}} />} type="password" placeholder={i18nCfg.confirmPwd} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {i18nCfg.resetPwd}
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
  );
};

export default Index;
