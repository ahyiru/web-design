import time from '@app/assets/icons/time.png';
import control from '@app/assets/icons/control.png';
import api from '@app/assets/icons/api.png';
import code from '@app/assets/icons/code.png';

export const actions = [
  {
    value: 'stay',
    label: '停留时间',
    icon: time,
    description: '页面停留时间总和',
    color: 'var(--blue1)',
  },
  {
    value: 'click',
    label: '点击次数',
    icon: control,
    description: '页面点击次数总和',
    color: 'var(--green1)',
  },
  {
    value: 'fetchError',
    label: '请求错误',
    icon: api,
    description: '请求错误总数',
    color: 'var(--orange1)',
  },
  {
    value: 'pageError',
    label: '页面错误',
    icon: code,
    description: '页面错误总数',
    color: 'var(--red1)',
  },
];

const systems = [
  {
    value: 'macOS',
    label: 'macOS',
    icon: 'icon-apple',
  },
  {
    value: 'windows',
    label: 'windows',
    icon: 'icon-windows',
  },
  {
    value: 'linux',
    label: 'linux',
    icon: 'icon-linux',
  },
  {
    value: 'ios',
    label: 'ios',
    icon: 'icon-iphone',
  },
  {
    value: 'android',
    label: 'android',
    icon: 'icon-android',
  },
];

const browsers = [
  {
    value: 'chrome',
    label: 'chrome',
    icon: 'icon-chrome',
  },
  {
    value: 'firefox',
    label: 'firefox',
    icon: 'icon-firefox',
  },
  {
    value: 'ie',
    label: 'IE',
    icon: 'icon-ie',
  },
  {
    value: 'safari',
    label: 'safari',
    icon: 'icon-safari',
  },
  {
    value: 'weixin',
    label: 'weixin',
    icon: 'icon-weixin',
  },
];