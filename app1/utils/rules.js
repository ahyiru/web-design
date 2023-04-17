import {required, customRequired, titlePattern, namePattern, emailPattern, passwordPattern, pathPattern, urlPattern} from './patterns';

export const titleRule = [required, titlePattern];
export const urlRule = [urlPattern];
export const nameRule = [required, namePattern];
export const emailRule = [required, emailPattern];
export const passwordRule = [required, passwordPattern];
export const roleRule = [{type: 'number', min: 0, max: 5, message: '取值范围0-5!'}];

export const confirmRule = [
  required,
  ({getFieldValue}) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('两次输入的密码不一致!');
    },
  }),
];

export const pathRule = [required, pathPattern];

export const customNameRule = [customRequired, namePattern];
export const customEmailRule = [customRequired, emailPattern];
export const customPasswordRule = [customRequired, passwordPattern];

export const checkVolid = (rules, value) => {
  for (let i = 0, l = rules.length; i < l; i++) {
    const rule = rules[i];
    if (!rule.pattern.test(value)) {
      return rule.message;
    }
  }
};
