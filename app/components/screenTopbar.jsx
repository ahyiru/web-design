import {Button} from 'antd';
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {components,use} from '@common';

import './index.less';

const {FullPage}=components;
const {useTime}=use;

const leftBar=[
  {
    key:'year',
    label:'年',
  },
  {
    key:'month',
    label:'月',
  },
  {
    key:'day',
    label:'日',
  },
];

export const Index=({contentRef})=>{
  const [time]=useTime();
  return <div className="top-bar">
    <ul className="left-bar">
      {
        leftBar.map(item=><li key={item.key}><Button type="primary" ghost>{item.label}</Button></li>)
      }
    </ul>
    <ul className="right-bar">
      <li>
        <a>{time}</a>
      </li>
      <li>
        <a><FullPage panel={contentRef} fullIcon={FullscreenOutlined} exitIcon={FullscreenExitOutlined} /></a>
      </li>
    </ul>
  </div>;
};

export default Index;

