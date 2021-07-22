import { Modal,Form,Input,Switch } from 'antd';

import {utils} from '@common';

import {layout} from '@app/utils/config';

import {pathRule,nameRule} from '@app/utils/rules';

const {fixRoute}=utils;

const ModalForm=props=>{
  const {form,item,isEdit,isRoot}=props;
  const editRoot=isEdit&&item.path==='/';
  const newParent=fixRoute(item.parentId);
  const initData=isEdit?{...item,path:item.path.replace(newParent,'')}:{parentId:item.parentId,path:isRoot?'/':''};
  return <Form form={form} {...layout} initialValues={{...initData,hideMenu:!!initData.hideMenu,denied:!!initData.denied}}>
    <Form.Item name="parentId" label="父路径" hidden={isRoot}>
      <Input disabled />
    </Form.Item>
    <Form.Item name="path" label="路径" rules={(isRoot||editRoot)?[]:pathRule} hidden={isRoot}>
      <Input placeholder="请输入" disabled={editRoot} />
    </Form.Item>
    <Form.Item name="name" label="展示名" /* rules={nameRule} */>
      <Input placeholder="请输入" />
    </Form.Item>
    {
      /* item.isLeaf&&!isRoot&&<Form.Item name="component" label="页面文件路径" rules={pathRule}>
        <Input placeholder="请输入" />
      </Form.Item> */
    }
    <Form.Item name="iconKey" label="图标">
      <Input placeholder="请输入" />
    </Form.Item>
    {/* <Form.Item name="redirect" label="重定向">
      <Input disabled placeholder="请输入" />
    </Form.Item> */}
    <Form.Item name="hideMenu" label="是否隐藏菜单" valuePropName="checked" hidden={isRoot}>
      <Switch />
    </Form.Item>
    <Form.Item name="denied" label="权限控制" valuePropName="checked" hidden={isRoot}>
      <Switch />
    </Form.Item>
  </Form>;
};

const HandleModal=props=>{
  const [form]=Form.useForm();
  const {onModalOk,modalVisible,onModalCancel,type,item,isRoot}=props;
  const title={add:'新增',edit:'编辑'};
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
    okText="确定"
    cancelText="取消"
  >
    <div>
      <ModalForm form={form} item={item} isEdit={isEdit} isRoot={isRoot} />
    </div>
  </Modal>;
};

export default HandleModal;

