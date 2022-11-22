import brain from './icons/brain.png';
import trend from './icons/trend.png';
import coder from './icons/coder.png';
import dataAnalysis from './icons/data-analysis.png';
import light from './icons/light.png';
import debug from './icons/debug.png';
import chat from './icons/chat.png';

import CircleRing from './circleRing';

const objs = [
  {
    value: 'centerTable',
    label: 'centerTable',
    icon: <CircleRing />,
    details: '',
    link: '',
    type: 'center',
  },
  {
    value: 'brain',
    label: 'GitHub',
    icon: brain,
    details: '',
    link: 'https://github.com/ahyiru',
    type: '',
  },
  {
    value: 'trend',
    label: 'NPM',
    icon: trend,
    details: '',
    link: 'https://www.npmjs.com/settings/huxy/packages',
    type: '',
  },
  {
    value: 'coder',
    label: 'Gitee',
    icon: coder,
    details: '',
    link: 'https://gitee.com/yiru',
    type: '',
  },
  {
    value: 'dataAnalysis',
    label: 'ihuxy',
    icon: dataAnalysis,
    details: '',
    link: 'http://ihuxy.com/',
    type: '',
  },
  {
    value: 'light',
    label: '专栏',
    icon: light,
    details: '',
    link: 'https://www.zhihu.com/people/hu-yong-20',
    type: '',
  },
  {
    value: 'debug',
    label: 'DOC',
    icon: debug,
    details: '',
    link: 'https://juejin.cn/user/4177799915506701',
    type: '',
  },
  {
    value: 'chat',
    label: '场景设计',
    icon: chat,
    details: '',
    link: 'https://mp.weixin.qq.com/s/A6_Robhv6kl3R_m9Z7yk3A',
    type: '',
  },
];

export default objs;
