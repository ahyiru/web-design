import {Form, Input, Modal} from 'antd';

import {formConfigs} from '../configs';

const {layout} = formConfigs;

const OperatingModal = props => {
  const {onOk, open, onCancel, item} = props;
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onOk(values);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Modal title="审核" open={open} onCancel={onCancel} onOk={()=>handleSubmit()}>
      <Form name="completeDemand" form={form} initialValues={{...item}} {...layout}>
        <Form.Item label="完成说明" name="instruction">
          <Input.TextArea autoSize={{minRows: 3}} placeholder="请输入" />
        </Form.Item>
        <Form.Item label="演示地址" name="demo">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OperatingModal;
