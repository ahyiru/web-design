import {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Row, Col} from '@huxy/components';
import {useIntls} from '@app/components/intl';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';

// import {userInfoStore} from '@app/store/stores';

import {apiList, defProject, formConfigs, formRules} from '../../configs';

const {addTagsFn, editTagsFn} = apiList;
const {layout, tailLayout} = formConfigs;
const {nameRule} = formRules;

const formStyle = {
  width: '50%',
};

const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.tables', {});
  // const profile = userInfoStore.getState();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };
  const onFinish = async values => {
    const handler = item ? editTagsFn : addTagsFn;
    values = item ? {...item, ...values} : values;
    setIsPending(true);
    try {
      const {code, message: msg} = await handler({...values, projectId: /* profile?.projectId ?? */ defProject._id});
      if (code === 200) {
        message.success(msg);
        back();
      }
    } catch (err) {
      console.log(err);
    }
    setIsPending(false);
  };
  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Form name="addApi" onFinish={onFinish} form={form} initialValues={{...item}} {...layout} style={formStyle}>
              <Form.Item label="标签值" name="value" rules={nameRule}>
                <Input placeholder="请输入" style={{width: '80%'}} />
              </Form.Item>
              <Form.Item label="标签名" name="label" rules={nameRule}>
                <Input placeholder="请输入" style={{width: '80%'}} />
              </Form.Item>
              <Form.Item label="描述" name="description">
                <Input.TextArea placeholder="请输入" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: '12px'}} onClick={() => back()}>
                  {i18nCfg.cancel}
                </Button>
                <Button type="primary" htmlType="submit" disabled={isPending}>
                  {i18nCfg.submit}
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
