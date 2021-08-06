import {useEffect,useState} from 'react';
import {Form,Modal,message} from 'antd';
import {utils} from '@common';
import apiList from '@app/utils/getApis';
import customRender from '@app/utils/render';
import * as rules from '@app/utils/rules';

const {traverItem,clone}=utils;

/* const formCfg={
  name:'',
  layout:'',
  initialValues:{},
  labelAlign:'',
  labelCol:{},
  wrapperCol:{},
  onValuesChange:()=>{},
  items:{
    name:'',
    label:'',
    rules:[],
    extra:'',
    hidden:'',
  },
}; */

const Index=({commonprops,...props})=>{
  const {initialValues,submit,loading,getValues,modalItem,handleOk,onCancel,title,schema}=props;
  const [form]=Form.useForm();
  let tmpSchema=clone(schema);
  tmpSchema=Array.isArray(tmpSchema)?tmpSchema[0]:tmpSchema;
  const [fetchDatas,setFetchDatas]=useState({});
  /* useEffect(()=>{
    const getDatas=async apis=>{
      const resultList=await Promise.all(apis.map(({name,params})=>apiList[name](params)));
      const list={};
      apis.map(({resultName},i)=>{
        list[resultName]=resultList[i];
      });
      setFetchDatas(list);
    };
    // getDatas(apis);
  },[]); */

  const {getState,back}=commonprops.history||{};

  const initVal=modalItem||initialValues||getState?.()?.item;
  const {props:cfgProps}=tmpSchema;

  const onValuesChange=(changedValues,allValues)=>{
    typeof getValues==='function'&&getValues(changedValues,allValues);
  };
  const resetFields=()=>form.resetFields();
  const onFinish=async values=>{
    if(modalItem){
      return;
    }
    if(typeof submit==='function'){
      submit(values);
      return;
    }
    values={...initVal,...values};
    const apiName=getState?.()?.apiName;
    const apiFn=apiList[apiName];
    try{
      const {code,message:msg}=await apiFn?.({...values});
      if(code===200){
        message.success(msg);
        back?.();
      }
    }catch(err){
      console.log(err);
    }
  };
  const modalOk=()=>{
    form.validateFields().then(values=>{
      handleOk(values);
      onCancel();
    }).catch(info=>{
      onCancel();
    });
  };
  const formProps={
    form,
    onFinish,
    onValuesChange,
    initialValues:initVal,
  };
  const mergeProps={
    ...formProps,
    ...cfgProps,
  };
  const self={
    ...props,
    onValuesChange,
    resetFields,
    rules,
    loading,
    fetchDatas,
  };
  tmpSchema.props=mergeProps;
  const newSchema=traverItem((item,p,i,hasChild)=>{
    /* const {customRender,...rest}=item.props||{};
    if(Array.isArray(customRender)){
      const [key,valueKey]=customRender;
      const data=str2code(valueKey);
      const values=typeof data==='function'?data(self):data;
      if(key==='props'){
        item.props={...data,...rest};
      }else{
        rest[key]=values;
        item.props=rest;
      }
    } */
    if(!hasChild&&modalItem){
      item.props.disabled=true;
    }
    return item;
  })([tmpSchema]);
  return modalItem?<Modal title={title} visible={!!modalItem} onCancel={onCancel} onOk={()=>modalOk()}>
    {customRender(newSchema[0],self)}
  </Modal>:customRender(newSchema[0],self);
};


export default Index;






