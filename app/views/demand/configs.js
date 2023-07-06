import * as configs from '@app/utils/configs';
import * as rules from '@app/utils/rules';

export {default as apiList} from '@app/apis/apiList';
export const formConfigs = configs;
export const formRules = rules;

export const status = [
  {
    value: -1,
    label: '已删除',
    color: 'red',
  },
  {
    value: 0,
    label: '未审核',
    color: 'yellow',
  },
  {
    value: 1,
    label: '进行中',
    color: 'blue',
  },
  {
    value: 2,
    label: '已完成',
    color: 'green',
  },
];