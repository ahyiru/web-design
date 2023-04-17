import {useState, useEffect, useRef} from 'react';
import {Dropdown, Button, Tag, Upload} from 'antd';
import {FontColorsOutlined, BgColorsOutlined} from '@ant-design/icons';
import {useIntls} from '@app/components/intl';
import {message} from '@app/utils/staticFunction';
import draw from './draw';
import img from './1.jpg';

import './index.less';

// const {useEleResize}=use;

const colorCfg = [
  {
    key: '#f5222d',
    label: '红色画笔',
    name: 'red_pen',
  },
  {
    key: '#1890ff',
    label: '蓝色画笔',
    name: 'blue_pen',
  },
  {
    key: '#52c41a',
    label: '绿色画笔',
    name: 'green_pen',
  },
  {
    key: '#fa8c16',
    label: '橙色画笔',
    name: 'orange_pen',
  },
];
const sizeCfg = [
  {
    key: '1',
    label: '小',
    name: 'small_pen',
  },
  {
    key: '3',
    label: '中',
    name: 'middle_pen',
  },
  {
    key: '5',
    label: '大',
    name: 'large_pen',
  },
];

const imgList = ['image/jpeg', 'image/png'];

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ToolsBar = ({actions, defCfg, beforeUpload, imgUrl, rmImg, i18nCfg}) => {
  const [color, setColor] = useState(defCfg.color);
  const [size, setSize] = useState(defCfg.size);
  const [type, setType] = useState(defCfg.type);

  const handleColorMenuClick = value => {
    setType('draw');
    actions.color(value.key);
    setColor(colorCfg.find(item => item.key === value.key));
  };
  const handleSizeMenuClick = value => {
    setType('draw');
    actions.size(value.key);
    setSize(sizeCfg.find(item => item.key === value.key));
  };

  const colorMenuCfg = {
    onClick: handleColorMenuClick,
    items: colorCfg.map(item => ({
      key: item.key,
      icon: <BgColorsOutlined style={{color: type === 'draw' ? item.key : ''}} />,
      label: <Tag color={item.key}>{i18nCfg[item.name]}</Tag>,
    })),
  };
  const sizeMenuCfg = {
    onClick: handleSizeMenuClick,
    items: sizeCfg.map(item => ({
      key: item.key,
      icon: <FontColorsOutlined />,
      label: i18nCfg[item.name],
    })),
  };
  return (
    <div className="tools-area">
      <Dropdown.Button trigger={['click']} menu={colorMenuCfg} icon={<BgColorsOutlined style={{color: type === 'draw' ? color.key : ''}} />}>
        <span style={{color: type === 'draw' ? color.key : ''}}>{i18nCfg[color.name]}</span>
      </Dropdown.Button>
      <Dropdown.Button trigger={['click']} menu={sizeMenuCfg} icon={<FontColorsOutlined />}>
        <span style={{color: type === 'draw' ? 'var(--red2)' : ''}}>{i18nCfg[size.name]}</span>
      </Dropdown.Button>
      <Button
        onClick={() => {
          actions.text();
          setType('text');
        }}
      >
        <span style={{color: type === 'text' ? 'var(--red2)' : ''}}>{i18nCfg.add_text}</span>
      </Button>
      <Button
        // disabled={imgUrl}
        onClick={() => {
          actions.eraser();
          setType('eraser');
        }}
      >
        <span style={{color: type === 'eraser' ? 'var(--red2)' : ''}}>{i18nCfg.eraser}</span>
      </Button>
      <Button onClick={() => actions.undo()}>{i18nCfg.undo}</Button>
      <Button onClick={() => actions.redo()}>{i18nCfg.redo}</Button>
      <Button
        // disabled={imgUrl}
        onClick={() => {
          actions.clean();
          setType('draw');
        }}
      >
        {i18nCfg.clean_canvas}
      </Button>
      <Button
        onClick={() => {
          actions.save(); /* setType('draw'); */
        }}
      >
        {i18nCfg.save_canvas}
      </Button>
      <Upload maxCount={1} beforeUpload={file => beforeUpload(file, () => setType('draw'))} showUploadList={false}>
        <Button>{i18nCfg.replace_pic}</Button>
      </Upload>
      <Button
        onClick={() => {
          rmImg();
          setType('draw');
        }}
      >
        {i18nCfg.clean_pic}
      </Button>
    </div>
  );
};

const Index = props => {
  const getIntls = useIntls();
  const [imgUrl, setImgUrl] = useState(img);
  const [actions, setActions] = useState();
  const defCfg = {color: colorCfg[0], size: sizeCfg[0], type: 'draw'};
  const container = useRef();
  const canvas = useRef();
  const imgCanvas = useRef();
  // const {width,height}=useEleResize(container.current);
  useEffect(() => {
    canvas.current.width = container.current.clientWidth;
    canvas.current.height = container.current.clientHeight;
    const {destroy, ...rest} = draw(canvas.current, {...defCfg, color: defCfg.color.key, size: defCfg.size.key}, imgCanvas.current, imgUrl);
    setActions(rest);
    return () => destroy();
  }, [imgUrl]);
  const beforeUpload = (file, cb) => {
    const isImg = imgList.includes(file.type);
    const isLt8M = file.size / 1024 / 1024 < 8;
    if (!isImg) {
      message.error(getIntls('main.canvas.up_image_msg'));
      return false;
    }
    if (!isLt8M) {
      message.error(getIntls('main.canvas.up_image_size_msg'));
      return false;
    }
    getBase64(file, imgUrl => setImgUrl(imgUrl));
    cb();
    return false;
  };
  return (
    <div className="page">
      <div className="tools-bar">
        {actions && <ToolsBar actions={actions} defCfg={defCfg} beforeUpload={beforeUpload} imgUrl={imgUrl} rmImg={() => setImgUrl(null)} i18nCfg={getIntls('main.canvas')} />}
      </div>
      <div ref={container} className="canvas-container">
        <canvas ref={imgCanvas} />
        <canvas ref={canvas} />
      </div>
    </div>
  );
};

export default Index;
