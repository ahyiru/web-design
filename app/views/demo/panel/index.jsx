import {useState, useEffect} from 'react';
import {DatePicker, Button, Input, Space} from 'antd';
import {timeGap,ten2Base,base2Ten,rgba2hex,hex2rgba,cacheData} from '@huxy/utils';
import {useTime} from '@huxy/use';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import FullPage from '@app/components/fullScreen';
import MaxSize from '@app/components/maxSize';
const {RangePicker} = DatePicker;
import './index.less';

const {record, undo, redo, clean} = cacheData();

const plugins = [({panel}) => <FullPage panel={panel} />, ({panel}) => <MaxSize panel={panel} />];
const Index = (props) => {
  const [beforeTime, setBeforeTime] = useState('');
  const [afterTime, setAfterTime] = useState('');
  const [customTime, setCustomTime] = useState([]);
  const [hexValue, setHexValue] = useState(10);
  const [colorValue, setColorValue] = useState('');

  const [currentItem, setCurrentItem] = useState({});

  const [time] = useTime();
  useEffect(() => {
    setCurrentItem(record(''));
    return () => clean();
  }, []);
  const prev = () => {
    const item = undo();
    setCurrentItem(item);
    setColorValue(item.data);
  };
  const next = () => {
    const item = redo();
    setCurrentItem(item);
    setColorValue(item.data);
  };

  const beforeChange = (value, dateString) => {
    setBeforeTime(dateString);
  };
  const afterChange = (value, dateString) => {
    setAfterTime(dateString);
  };
  const customChange = (value, dateString) => {
    setCustomTime(dateString);
  };
  const hexChange = (e, base) => {
    const {value} = e.target;
    const val = base2Ten(value, base);
    setHexValue(val);
  };
  const colorPicker = (e) => {
    let {value} = e.target;
    if (value.includes('rgb')) {
      value = rgba2hex(value);
    }
    setColorValue(value);
    setCurrentItem(record(value));
  };

  return (
    <Row className="demo-panel-container">
      <Col>
        <Panel plugins={[...plugins, () => <div style={{padding: '0.3rem 2rem', fontSize: '1.2rem', color: 'var(--appColor)'}}>{time}</div>]} title="时间转换">
          <Row>
            <Col span={2}>
              <DatePicker showTime onChange={afterChange} disabledDate={(current) => current && current > +new Date()} />
            </Col>
            <Col span={2}>
              <span style={{textAlign: 'left'}}> ～ 此刻</span>
            </Col>
            <Col span={2}>
              <i>{timeGap(afterTime)}</i>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <span>此刻 ～ </span>
            </Col>
            <Col span={2}>
              <DatePicker showTime onChange={beforeChange} disabledDate={(current) => current && current < +new Date()} />
            </Col>
            <Col span={2}>
              <i>{timeGap(beforeTime)}</i>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <RangePicker showTime onChange={customChange} />
            </Col>
            <Col span={2}>
              <i>{timeGap(...customTime)}</i>
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel plugins={plugins} title="进制转换">
          <Row>
            <Col span={3}>
              <span>二进制</span>
            </Col>
            <Col span={5}>
              <Input value={ten2Base(hexValue, 2)} onChange={(e) => hexChange(e, 2)} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <span>八进制</span>
            </Col>
            <Col span={5}>
              <Input value={ten2Base(hexValue, 8)} onChange={(e) => hexChange(e, 8)} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <span>十进制</span>
            </Col>
            <Col span={5}>
              <Input value={hexValue} onChange={(e) => hexChange(e, 10)} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <span>十六进制</span>
            </Col>
            <Col span={5}>
              <Input value={ten2Base(hexValue, 16)} onChange={(e) => hexChange(e, 16)} />
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel plugins={plugins} title="色值转换">
          <Space>
            <Button onClick={(e) => prev()} disabled={!currentItem.length || currentItem.index === 0}>
              撤回
            </Button>
            <Button onClick={(e) => next()} disabled={!currentItem.length || currentItem.index === currentItem.length - 1}>
              重做
            </Button>
          </Space>
          <Row>
            <Col span={3}>
              <span>hex</span>
            </Col>
            <Col span={5}>
              <Input value={colorValue} onChange={colorPicker} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <span>色值</span>
            </Col>
            <Col span={5}>
              <Input
                type="color"
                value={colorValue.length === 4 ? `${colorValue[0]}${colorValue[1]}${colorValue[1]}${colorValue[2]}${colorValue[2]}${colorValue[3]}${colorValue[3]}` : colorValue.slice(0, 7)}
                onChange={colorPicker}
              />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <span>rgba</span>
            </Col>
            <Col span={5}>
              <Input value={hex2rgba(colorValue)} />
            </Col>
          </Row>
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
