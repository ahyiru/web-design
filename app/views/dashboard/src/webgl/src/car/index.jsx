import {useEffect, useRef, useState} from 'react';
import {Spinner} from '@huxy/components';
import {TextLoading} from '@huxy/materials';
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const {start, cancel} = startScene(areaInfo, mountDom.current);
    const startDraw = async () => {
      try {
        await start();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    startDraw();
    return cancel;
  }, []);
  const changeColor = (type, e) => {
    const item = areaInfo.find(({key}) => key === type);
    item.value = e.target.value;
    item.setColor?.(e.target.value);
    setAreaInfo([...areaInfo]);
  };

  return (
    <div className="webgl-car-page">
      <div className="change-color">
        {areaInfo.map(({key, value, label}) => (
          <div key={key} className="color-picker">
            <span>{label}：</span>
            <input type="color" value={value} onChange={e => changeColor(key, e)} />
          </div>
        ))}
      </div>
      <div className="webgl-car-model" ref={mountDom} />
      {loading ? (
        <div className="model-loading">
          <TextLoading time="2s" backColor="rgba(0, 0, 0, 0.4)" className="model-loading-text">
            模型加载中...
          </TextLoading>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
};

export default Index;
