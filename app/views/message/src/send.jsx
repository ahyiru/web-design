import {useState} from 'react';
import {Input, Button, Form, Radio, Transfer} from 'antd';
import {SendOutlined} from '@ant-design/icons';
import {message} from '@huxy/utils';
import useHandleList from '@app/hooks/useHandleList';
import {notAdmin} from '@app/utils/isAdmin';
import info from '@app/apis/report/browserInfo';

import {layout, tailLayout} from '@app/utils/configs';

// import {userInfoStore} from '@app/store/stores';

import apiList from '@app/apis/apiList';

const {allUserFn, addMessageFn, addCommentFn} = apiList;

const typeList = [
  {
    label: '消息',
    value: 'message',
  },
  {
    label: '邮件',
    value: 'email',
  },
];

const SendMsg = props => {
  const isNotAdmin = notAdmin();
  const [pending, setPending] = useState(false);
  const [form] = Form.useForm();
  const [users] = useHandleList(allUserFn, {current: 1, size: 100, active: 1});
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [type, setType] = useState(isNotAdmin ? 'email' : 'message');

  const onFinish = async values => {
    setPending(true);
    if (values.receiver) {
      values.receiver = values.receiver.join(',');
    }

    try {
      const handler = isNotAdmin ? addCommentFn : addMessageFn;
      const {code, message: msg} = await handler({...values, ...info});
      if (code === 200) {
        message.success(msg);
        setTargetKeys([]);
        setSelectedKeys([]);
        form.resetFields();
        props.router.push('/messages');
      }
    } catch (err) {
      console.log(err);
    }
    setPending(false);
  };

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const {data} = users;

  const {list = []} = data || {};
  return (
    <div style={{padding: '20px'}}>
      <Form name="sendMsg" onFinish={onFinish} form={form} initialValues={{type}} {...layout}>
        <Form.Item label="类别" name="type" rules={[{required: true}]}>
          <Radio.Group disabled={isNotAdmin} options={typeList} optionType="button" onChange={e => setType(e.target.value)} />
        </Form.Item>
        {!isNotAdmin && type === 'email' ? (
          <Form.Item label="接收者" name="receiver" rules={[{required: true}]}>
            <Transfer
              dataSource={list.map(item => ({...item, key: item.email}))}
              titles={['用户', '已选']}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={onChange}
              onSelectChange={onSelectChange}
              render={item => item.name}
              showSearch
            />
          </Form.Item>
        ) : null}
        <Form.Item label="主题" name="title" rules={[{required: true}]}>
          <Input placeholder="请输入" maxLength={30} showCount />
        </Form.Item>
        <Form.Item label="内容" name="context" rules={[{required: true}]}>
          <Input.TextArea autoSize={{minRows: 4, maxRows: 8}} maxLength={500} showCount placeholder="请输入" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={pending} icon={<SendOutlined />}>
            发送
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendMsg;
