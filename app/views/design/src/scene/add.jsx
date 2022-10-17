import {useState, useEffect} from 'react';
import {Form, Button, message, Input, Select, Radio} from 'antd';
import {Row, Col} from '@huxy/components';
import Back from '@app/components/goBack';
import {useIntls} from '@app/components/intl';
import Panel from '@app/components/panel';

import Upload from './upload';

import {apiList, defProject, formConfigs, formRules, defCategories, defTags, loadTypes} from '../../configs';

const {addSceneFn, editSceneFn} = apiList;
const {layout, tailLayout} = formConfigs;
const {titleRule, urlRule} = formRules;

const { TextArea } = Input;
const Index = props => {
  const getIntls = useIntls();
  const i18nCfg = getIntls('main.tables', {});
  const {getState} = props.history;
  const {item, backState} = getState() || {};
  const [isPending, setIsPending] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(0);
  useEffect(() => {
    const getCategories = async () => {
      const result = await apiList.getCategories?.();
      setCategories(result?.result?.list ?? defCategories);
    };
    const getTags = async () => {
      const result = await apiList.listTagsFn?.({projectId: defProject._id});
      setTags(result?.result?.list ?? defTags);
    };
    getCategories();
    getTags();
  }, []);
  const onFinish = async values => {
    const handler = item ? editSceneFn : addSceneFn;
    values = item ? {...item, ...values} : values;
    const {screenshot, ...rest} = values;
    const file = typeof screenshot === 'string' ? screenshot : screenshot && screenshot[0].originFileObj;
    setIsPending(true);
    try {
      const {code, message: msg} = await handler({...rest, file});
      if (code === 200) {
        message.success(msg);
        back();
      }
    } catch (err) {}
    setIsPending(false);
  };
  const onChange = value => {
    setTagCount(value.length);
  };

  const back = () => {
    backState ? props.router.push(backState) : props.history.back();
  };

  return <Row>
    <Col>
      <Back back={back} />
    </Col>
    <Col span={6}>
      <Panel>
        <Form name="scene" initialValues={item ? {...item, screenshot: undefined, tag: item.tag.split(',')} : {loadType: 'modules'}} onFinish={onFinish} {...layout}>
          <Form.Item name="name" label="标题" rules={titleRule}>
            <Input  placeholder="请输入标题" />
          </Form.Item>
          <Form.Item name="loadType" label="类型" rules={[{ required: true }]}>
            <Radio.Group options={loadTypes} optionType="button" />
          </Form.Item>
          <Form.Item name="category" label="类别" rules={[{ required: true }]}>
            <Select placeholder="请选择类别" options={categories} />
          </Form.Item>
          <Form.Item label="标签" required>
            <Row>
              <Col auto>
                <Form.Item name="tag" rules={[{ required: true }]}>
                  <Select mode="tags" placeholder="请选择标签" options={tags} onChange={onChange} disabled={tagCount > 4} />
                </Form.Item>
              </Col>
              <Col width="98px">
                <Button type="primary" onClick={e => props.router.push('/design/tags/add')}>添加标签</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="demo" label="展示地址" rules={urlRule}>
            <Input  placeholder="请输入展示地址" />
          </Form.Item>
          <Form.Item name="screenshot" label="截图" valuePropName="fileList"
            getValueFromEvent={ e => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <TextArea placeholder="请输入描述" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button style={{marginRight: 12}} onClick={e => back()}>
              {i18nCfg.cancel}
            </Button>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {i18nCfg.submit}
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Col>
  </Row>;
};

export default Index;