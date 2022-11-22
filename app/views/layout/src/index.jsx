import {useState} from 'react';
import {Input, InputNumber, Slider, Button, message, Select, Radio} from 'antd';
import {storage, copyToClipboard} from '@huxy/utils';
import {useDebounce} from '@huxy/use';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import {sizeRules} from '@app/utils/sizeRules';
// import TimeBar from '@app/components/test1';
import getThemeList from '@app/configs/theme';
import {useMenuTypeStore, useThemeStore} from '@app/store/stores';
import {useIntls} from '@app/components/intl';

import report from '@app/apis/report/report';

const {Option} = Select;

const delay = 500;

const labelStyle = {
  display: 'block',
  textAlign: 'right',
  lineHeight: '32px',
};

const getSizeList = list =>
  Object.keys(list).map(key => {
    const size = list[key];
    const value = size.replace(/[^0-9]/gi, '') - 0;
    const unit = size.replace(value, '');
    const units = Object.keys(sizeRules[key]);
    const range = sizeRules[key][unit];
    return {
      key,
      value,
      unit,
      units,
      min: range[0],
      max: range[1],
    };
  });

const Index = props => {
  const getIntls = useIntls();
  const [theme, setTheme] = useThemeStore();
  const [menuType, setMenuType] = useMenuTypeStore('vertical');
  const themeLang = getIntls('theme', {});
  const [size, setSize] = useState(10);
  const changeFontSize = useDebounce(value => document.documentElement.style.setProperty('--rootSize', value), delay);
  const changeLayout = useDebounce((value, save = false) => {
    const newTheme = {
      name: 'custom',
      key: 'custom',
      list: value,
    };
    setTheme(newTheme);
    if (save) {
      storage.set('theme', newTheme);
      message.success(getIntls('main.layout.save_cfg_msg'));
    }
  }, delay);
  const changeSizes = (key, value, unit) => {
    // e.persist();
    theme.list.sizes[key] = `${value || ''}${unit}`;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: `${value || ''}${unit}`,
      value: key,
    });
  };
  const changeColors = (e, key) => {
    const {value} = e.target;
    theme.list.colors[key] = value;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: value,
      value: key,
    });
  };
  const changeFont = value => {
    setSize(value);
    changeFontSize(`${(value * 100) / 16}%`);
    report({
      actionType: 'change',
      category: 'layout',
      text: value,
      value: 'fontSize',
    });
  };
  const saveConfig = () => {
    changeLayout(theme.list, true);
    report({
      actionType: 'click',
      category: 'layout',
      text: '保存配置',
      value: 'saveConfig',
    });
  };
  const copyConfig = () => {
    copyToClipboard(JSON.stringify(theme.list));
    message.success(getIntls('main.layout.copy_cfg_msg'));
    report({
      actionType: 'click',
      category: 'layout',
      text: '拷贝配置',
      value: 'copyConfig',
    });
  };
  const changeUnit = (key, unit) => {
    const value = unit === 'px' ? 1200 : 100;
    theme.list.sizes[key] = `${value}${unit}`;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: `${value}${unit}`,
      value: key,
    });
  };
  const selectTheme = current => {
    storage.set('theme', current);
    setTheme(current);
    report({
      actionType: 'click',
      category: 'layout',
      text: current.name,
      value: 'switchTheme',
    });
  };
  return (
    <div className="layout-setting">
      <Row>
        <Col>
          <Panel>
            <div className="block-justify">
              <h3 style={{margin: '0', height: '32px', lineHeight: '32px'}}>{getIntls('main.layout.layoutDesign')}</h3>
              <div>
                <Button type="primary" onClick={saveConfig} style={{marginRight: '10px'}}>
                  {getIntls('main.layout.saveConfig')}
                </Button>
                <Button type="primary" onClick={copyConfig}>
                  {getIntls('main.layout.copyConfig')}
                </Button>
              </div>
            </div>
          </Panel>
        </Col>
        <Col>
          <Row>
            <Col span={4}>
              <Panel>
                <h3>{getIntls('main.layout.layoutDesign')}</h3>
                <div className="vertical-item">
                  <label>{getIntls('main.layout.menuType')}</label>
                  <div>
                    <Radio.Group style={{marginTop: '5px'}} value={menuType} onChange={e => {
                      setMenuType(e.target.value);
                      report({
                        actionType: 'click',
                        category: 'layout',
                        text: e.target.value,
                        value: 'switchMenuType',
                      });
                    }}>
                      <Radio value="vertical">{getIntls('main.layout.vertical')}</Radio>
                      <Radio value="horizontal">{getIntls('main.layout.horizontal')}</Radio>
                      <Radio value="compose">{getIntls('main.layout.compose')}</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="vertical-item">
                  <label>{getIntls('main.layout.fontSize')}</label>
                  <div>
                    <Slider min={6} max={16} value={size} onChange={e => changeFont(e)} />
                  </div>
                </div>
                <Row className="select-item">
                  {getThemeList(getIntls).map(item => (
                    <Col key={item.key} span={6} onClick={e => selectTheme(item)}>
                      <a className={`item${item.key === theme.key ? ' selected' : ''}`}>{item.name}</a>
                    </Col>
                  ))}
                </Row>
              </Panel>
            </Col>
            <Col span={4}>
              <Panel>
                <h3>{getIntls('main.layout.sizeDesign')}</h3>
                {getSizeList(theme.list.sizes).map(({key, value, unit, units, min, max}) => (
                  <Row key={key} gutter={[10, 10]}>
                    <Col span={5}>
                      <span style={labelStyle}>{themeLang[key]}：</span>
                    </Col>
                    <Col span={6}>
                      <InputNumber
                        min={min}
                        max={max}
                        value={value}
                        onChange={value => changeSizes(key, value, unit)}
                        addonAfter={
                          units.length > 1 ? (
                            <Select value={unit} onChange={val => changeUnit(key, val)}>
                              {units.map(u => (
                                <Option key={u} value={u}>
                                  {u}
                                </Option>
                              ))}
                            </Select>
                          ) : (
                            units[0]
                          )
                        }
                      />
                    </Col>
                  </Row>
                ))}
              </Panel>
            </Col>
            <Col span={4}>
              <Panel className="color-picker-panel">
                <h3>{getIntls('main.layout.colorDesign')}</h3>
                {Object.keys(theme.list.colors).map(key => (
                  <Row key={key} gutter={[10, 10]}>
                    <Col span={5}>
                      <span style={labelStyle}>{themeLang[key]}：</span>
                    </Col>
                    <Col span={6}>
                      <Input type="color" value={theme.list.colors[key]} onChange={e => changeColors(e, key)} />
                    </Col>
                  </Row>
                ))}
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <TimeBar lastTime={new Date('2021-09-30 18:00:00')} lastText="放假" /> */}
    </div>
  );
};

export default Index;
