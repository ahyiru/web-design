import * as configs from '@app/utils/configs';
import * as rules from '@app/utils/rules';

export {default as apiList} from '@app/apis/apiList';

export const formConfigs = configs;
export const formRules = rules;

export const category = [
  {
    label: '文本',
    value: 'text',
  },
  {
    label: '图片',
    value: 'get_image',
  },
  {
    label: '视频',
    value: 'audio_translate',
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
