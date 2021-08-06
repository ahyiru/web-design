import { Modal,Form,Input,Switch } from 'antd';

import {utils} from '@common';

import {layout} from '@app/utils/config';

import {pathRule} from '@app/utils/rules';

const {fixRoute}=utils;

const ModalForm=props=>{
  const {form,item,isEdit,isRoot,addFormText}=props;
  const editRoot=isEdit&&item.path==='/';
  const newParent=fixRoute(item.parentId);
  const initData=isEdit?{...item,path:item.path.replace(newParent,'')}:{parentId:item.parentId,path:isRoot?'/':''};
  return <Form form={form} {...layout} initialValues={{...initData,hideMenu:!!initData.hideMenu,denied:!!initData.denied}}>
    <Form.Item name="parentId" label={addFormText.parentId} hidden={isRoot}>
      <Input disabled />
    </Form.Item>
    <Form.Item name="path" label={addFormText.path}rules={(isRoot||editRoot)?[]:pathRule} hidden={isRoot}>
      <Input placeholder={addFormText.path} disabled={editRoot} />
    </Form.Item>
    <Form.Item name="name" label={addFormText.name} /* rules={nameRule} */>
      <Input placeholder={addFormText.name} />
    </Form.Item>
    <Form.Item name="componentPath" label={addFormText.componentPath}rules={pathRule}>
      <Input placeholder={addFormText.componentPath} />
    </Form.Item>
    <Form.Item name="iconKey" label={addFormText.iconKey}>
      <Input placeholder={addFormText.iconKey} />
    </Form.Item>
    {/* <Form.Item name="redirect" label="重定向">
      <Input disabled placeholder="请输入" />
    </Form.Item> */}
    <Form.Item name="hideMenu" label={addFormText.hideMenu} valuePropName="checked" hidden={isRoot}>
      <Switch />
    </Form.Item>
    <Form.Item name="denied" label={addFormText.denied} valuePropName="checked" hidden={isRoot}>
      <Switch />
    </Form.Item>
  </Form>;
};

const HandleModal=props=>{
  const i18ns=props.store.getState('i18ns');
  const i18nCfg=i18ns?.main.projectRouter??{};
  const {addFormText={}}=i18nCfg;

  const [form]=Form.useForm();
  const {onModalOk,modalVisible,onModalCancel,type,item,isRoot}=props;
  const title={add:addFormText.add_title,edit:addFormText.edit_title};
  const isEdit=type==='edit';
  const handleSubmit=()=>{
    form.validateFields().then(values=>{
      const newParent=fixRoute(values.parentId);
      const value=isEdit?{...item,...values,path:`${newParent}${values.path}`}:{...values,path:`${newParent}${values.path}`};
      onModalOk(value);
    }).catch(err=>{
      console.log(err);
    });
  };
  return <Modal
    title={title[type]}
    visible={modalVisible}
    onOk={() => handleSubmit()}
    width={800}
    onCancel={() => onModalCancel()}
    okText={addFormText.ok_text}
    cancelText={addFormText.cancel_text}
  >
    <div>
      <ModalForm form={form} item={item} isEdit={isEdit} isRoot={isRoot} addFormText={addFormText} />
    </div>
  </Modal>;
};

export default HandleModal;

