import {Space, Button, Form, Input, Select, Radio, Checkbox} from 'antd';
import {validObj, firstUpper} from '@huxy/utils';

const defComp = {Input, Select, Radio, Checkbox};

const FormList = props => {
  const {submit, loading, searchFormText = '搜索', reset = '重置', formList = [], compList = {}} = props;
  const comps = {...defComp, compList};
  const [form] = Form.useForm();
  return (
    <Form layout="inline" form={form} initialValues={{}} onFinish={value => submit(validObj(value))}>
      {formList.map(item => {
        const {type, name, label, props, ...rest} = item;
        const Item = typeof type === 'string' ? comps[firstUpper(type.trim())] : type || (props => <div {...props} />);
        return (
          <Form.Item key={name} name={name} label={label} {...rest}>
            <Item {...props} />
          </Form.Item>
        );
      })}
      <Form.Item>
        <Space size="small">
          <Button loading={loading} type="primary" htmlType="submit">
            {searchFormText}
          </Button>
          {reset && <Button onClick={() => form.resetFields()}>{reset}</Button>}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormList;
