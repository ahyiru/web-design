import {useEffect, useRef, useState} from 'react';

import startScene from './scene';

import './index.less';

const areas = [
  {
    key: 'body',
    value: '#f5222d',
    label: '机身',
  },
  {
    key: 'details',
    value: '#1890ff',
    label: '纹路',
  },
  {
    key: 'glass',
    value: '#fadb14',
    label: '玻璃',
  },
];

const Index = props => {
  const mountDom = useRef();
  const [areaInfo, setAreaInfo] = useState(areas);
  useEffect(() => {
    return startScene(areaInfo, mountDom.current);
  }, []);
  const changeColor = (type, e) => {
    const item = areaInfo.find(({key}) => key === type);
    item.value = e.target.value;
    item.setColor?.(e.target.value);
    setAreaInfo([...areaInfo]);
  };

  return <div className="webgl-car-page">
    <div className="change-color">
      {
        areaInfo.map(({key, value, label}) => <div key={key} className="color-picker">
          <span>{label}：</span>
          <input type="color" value={value} onChange={e => changeColor(key, e)} />
        </div>)
      }
    </div>
    <div className="webgl-car-model" ref={mountDom} />
  </div>;
};

export default Index;
