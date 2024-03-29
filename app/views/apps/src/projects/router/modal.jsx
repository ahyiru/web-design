import {Modal, Form, Input, Switch} from 'antd';

import {fixRoute} from '@huxy/utils';

import {layout} from '@app/utils/configs';

import {required, pathPattern, urlOrPathPattern, titlePattern} from '@app/utils/patterns';

import {useIntls} from '@app/components/intl';

const ModalForm = props => {
  const {form, item, isEdit, isRoot, addFormText} = props;
  const editRoot = isEdit && item.path === '/';
  const newParent = fixRoute(item.parentId);
  const initData = isEdit ? {...item, path: item.path.replace(newParent, '')} : {parentId: item.parentId, path: isRoot ? '/' : ''};
  return (
    <Form form={form} {...layout} initialValues={{...initData, hideMenu: !!initData.hideMenu, denied: !!initData.denied}}>
      <Form.Item name="parentId" label={addFormText.parentId} hidden={isRoot}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="path" label={addFormText.path} rules={isRoot || editRoot ? [] : [required, urlOrPathPattern]} hidden={isRoot}>
        <Input placeholder={addFormText.path} disabled={editRoot} />
      </Form.Item>
      <Form.Item name="name" label={addFormText.name} rules={[required, titlePattern]}>
        <Input placeholder={addFormText.name} />
      </Form.Item>
      <Form.Item name="component" label={addFormText.component} rules={[pathPattern]}>
        <Input placeholder={addFormText.component} />
      </Form.Item>
      <Form.Item name="icon" label={addFormText.icon}>
        <Input placeholder={addFormText.icon} />
      </Form.Item>
      <Form.Item name="redirect" label="重定向" rules={[urlOrPathPattern]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item name="hideMenu" label={addFormText.hideMenu} valuePropName="checked" hidden={isRoot}>
        <Switch />
      </Form.Item>
      <Form.Item name="denied" label={addFormText.denied} valuePropName="checked" hidden={isRoot}>
        <Switch />
      </Form.Item>
    </Form>
  );
};

const HandleModal = props => {
  const getIntls = useIntls();
  const addFormText = getIntls('main.projectRouter.addFormText', {});

  const [form] = Form.useForm();
  const {onModalOk, modalOpen, onModalCancel, type, item, isRoot} = props;
  const title = {add: addFormText.add_title, edit: addFormText.edit_title};
  const isEdit = type === 'edit';
  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const newParent = fixRoute(values.parentId);
        const value = isEdit ? {...item, ...values, path: `${newParent}${values.path}`} : {...values, path: `${newParent}${values.path}`};
        onModalOk(value);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Modal title={title[type]} open={modalOpen} onOk={() => handleSubmit()} width={800} onCancel={() => onModalCancel()} okText={addFormText.ok_text} cancelText={addFormText.cancel_text}>
      <div>
        <ModalForm form={form} item={item} isEdit={isEdit} isRoot={isRoot} addFormText={addFormText} />
      </div>
    </Modal>
  );
};

export default HandleModal;
