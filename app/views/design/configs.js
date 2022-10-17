import {defProject as project} from '@app/configs';
import apis from '@app/utils/getApis';
import * as configs from '@app/utils/configs';
import * as rules from '@app/utils/rules';
export {default as defaultImg} from '@app/assets/images/default.png';

export const defProject = project;
export const apiList = apis;
export const formConfigs = configs;
export const formRules = rules;

export const baseUrl = 'http://ihuxy.com:7000';

export const loadTypes = [
  {
    label: 'modules',
    value: 'modules',
  },
  {
    label: 'packages',
    value: 'packages',
  },
  {
    label: 'static',
    value: 'static',
  },
];

export const defCategories = [
  {
    label: '娱乐',
    value: 'entertainment',
  },
  {
    label: '电商',
    value: 'ecommerce',
  },
  {
    label: '交友',
    value: 'dating',
  },
  {
    label: '互动',
    value: 'interactive',
  },
  {
    label: '工具',
    value: 'tool',
  },
];

export const defTags = [
  {
    label: '教育',
    value: 'educate',
  },
  {
    label: '商场',
    value: 'market',
  },
  {
    label: '学校',
    value: 'school',
  },
  {
    label: '婴幼儿',
    value: 'infant',
  },
  {
    label: '篮球',
    value: 'basketball',
  },
  {
    label: '医疗',
    value: 'medical',
  },
  {
    label: '监控',
    value: 'monitor',
  },
  {
    label: 'DevOps',
    value: 'DevOps',
  },
  {
    label: '大数据',
    value: 'bigdata',
  },
  {
    label: '消费',
    value: 'consumption',
  },
  {
    label: '分析',
    value: 'analyze',
  },
];