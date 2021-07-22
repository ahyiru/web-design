import {namePattern,emailPattern,passwordPattern,pathPattern} from './patterns';

const required={
  required:true,
  message:'请输入!',
};

export const nameRule=[required,namePattern];
export const emailRule=[required,emailPattern];
export const passwordRule=[required,passwordPattern];
export const roleRule=[{type:'number',min:0,max:5,message:'取值范围0-5!'}];
export const confirmRule=[
  required,
  ({getFieldValue})=>({
    validator(rule,value){
      if(getFieldValue('password')===value){
        return Promise.resolve();
      }
      return Promise.reject('两次输入的密码不一致!');
    },
  }),
];

export const pathRule=[required,pathPattern];




