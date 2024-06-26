import {useState} from 'react';
import {Form, Input, Button, Switch} from 'antd';
import {Row, Col} from '@huxy/components';
import {message} from '@huxy/utils';
import Back from '@app/components/goBack';
import Panel from '@app/components/panel';

import {userInfoStore} from '@app/store/stores';

import {apiList, formConfigs} from '../configs';

import Upload from './upload';

const {addDemandFn, editDemandFn} = apiList;
const {layout, tailLayout} = formConfigs;

const formStyle = {
  maxWidth: '800px',
};

const Index = props => {
  const profile = userInfoStore.getState();
  const isAdmin = profile.role === 5;
  const [pending, setPending] = useState(false);
  const [form] = Form.useForm();
  const {getState} = props.history;
  const {item, backState, isCkeck} = getState() || {};
  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };
  const onFinish = async values => {
    const handler = item ? editDemandFn : addDemandFn;
    const {attachment, ...rest} = values;
    if (attachment?.[0]?.originFileObj) {
      rest.attachment = attachment[0].originFileObj;
    }
    setPending(true);
    try {
      const {code, message: msg} = await handler({...item, ...rest});
      if (code === 200) {
        message.success(msg);
        back();
      }
    } catch (err) {}
    setPending(false);
  };
  return (
    <div>
      <Row>
        <Col>
          <Back back={back} />
        </Col>
        <Col>
          <Panel>
            <Form
              name="addDemand"
              onFinish={onFinish}
              form={form}
              initialValues={{...item, visibility: item?.visibility ?? true, attachment: item?.attachment ? [{name: item.attachment.split('/').slice(-1)[0]}] : undefined}}
              {...layout}
              style={formStyle}
              disabled={isCkeck}
            >
              <Form.Item label="标题" name="title" rules={[{required: true}]}>
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item label="需求描述" name="content" rules={[{required: true}]}>
                <Input.TextArea autoSize={{minRows: 3}} placeholder="请输入" />
              </Form.Item>
              <Form.Item label="可见性" name="visibility" valuePropName="checked" rules={[{required: true}]}>
                <Switch checkedChildren="公开" unCheckedChildren="私有" />
              </Form.Item>
              <Form.Item label="其它说明" name="description">
                <Input.TextArea autoSize={{minRows: 2}} placeholder="请输入" />
              </Form.Item>
              <Form.Item
                label="附件"
                name="attachment"
                valuePropName="fileList"
                getValueFromEvent={e => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
                extra="支持png, jpg, jpeg, webp, doc, docx, xls, xlsx, pdf, md格式."
              >
                <Upload />
              </Form.Item>
              <Form.Item label="原型地址" name="sample">
                <Input placeholder="请输入" />
              </Form.Item>
              {isAdmin || isCkeck ? (
                <>
                  <Form.Item label="完成说明" name="instruction">
                    <Input.TextArea autoSize={{minRows: 2}} placeholder="请输入" />
                  </Form.Item>
                  <Form.Item label="演示地址" name="demo">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </>
              ) : null}
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: '12px'}} onClick={() => back()}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" disabled={pending || isCkeck}>
                  提交
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
