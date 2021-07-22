import { Modal,Form,Input,Select } from 'antd';

import {layout} from '@app/utils/config';

import components from '@app/utils/components';

const ele=['div','section','article','h1','h2','h3','h4','h5','h6','p','span','b','i','s','u','em','pre','img','a','button','form','input','select','option','radio','checkbox','label','ul','li','table','tbody','thead','tr','th','td','video','audio'];

const compNames=Object.keys(components);

const nameList=[...compNames,...ele];

const ModalForm=props=>{
  const {form,item,isEdit}=props;
  return <Form form={form} {...layout} initialValues={{}}>
    <Form.Item name="type" label="组件">
      <Select placeholder="请选择" showSearch>
        {
          nameList.map(name=><Select.Option key={name} value={name}>{name}</Select.Option>)
        }
      </Select>
    </Form.Item>
    {/* <Form.Item name="props" label="属性">
      <Input placeholder="请输入" />
    </Form.Item> */}
  </Form>;
};

const HandleModal=props=>{
  const [form]=Form.useForm();
  const {onModalOk,modalVisible,onModalCancel,type,item}=props;
  const title={add:'新增',edit:'编辑'};
  const isEdit=type==='edit';
  const handleSubmit=()=>{
    form.validateFields().then(values=>{
      onModalOk(values);
      onModalCancel();
    }).catch(err=>{
      console.log(err);
    });
  };
  return <Modal
    title={title[type]}
    visible={modalVisible}
    onOk={() => handleSubmit()}
    // width={600}
    onCancel={() => onModalCancel()}
    okText="确定"
    cancelText="取消"
  >
    <div>
      <ModalForm form={form} item={item} isEdit={isEdit} />
    </div>
  </Modal>;
};

export default HandleModal;

