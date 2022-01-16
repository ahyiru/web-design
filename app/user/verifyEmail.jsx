import {useState} from 'react';
import {Form, Input, Button, message, Result} from 'antd';
import {LeftOutlined, MailOutlined} from '@ant-design/icons';
import apiList from '@app/utils/getApis';

import {emailRule} from '@app/utils/rules';

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.login ?? {};

  const [hasVerify, setHasVerify] = useState(false);
  const onFinish = async (values) => {
    const {code, message: msg} = await apiList.verifyEmailFn(values);
    if (code === 200) {
      message.success(msg);
      setHasVerify(true);
      // props.router.push('/');
      // location.href='/';
    }
  };

  return !hasVerify ? (
    <>
      <Form name="verifyEmail" autoComplete="off" onFinish={onFinish}>
        <Form.Item name="email" rules={emailRule}>
          <Input prefix={<MailOutlined style={{marginRight: '7px', color: '#999'}} />} placeholder={i18nCfg.email} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {i18nCfg.confirmEmail}
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
        title={i18nCfg.verifyEmail_msg}
        subTitle={i18nCfg.verifyEmail_sub_msg}
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
