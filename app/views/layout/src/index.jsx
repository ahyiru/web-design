import {useState} from 'react';
import {Input, InputNumber, Slider, Button, Select, Radio, Checkbox} from 'antd';
import {storage, copyToClipboard, message} from '@huxy/utils';
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
    const unit = size.replace(/\d+(\.\d)?/gi, '');
    const value = size.replace(unit, '') - 0;
    const rules = sizeRules(unit)[key];
    const units = Object.keys(rules);
    const [min, max] = rules[unit];
    return {
      key,
      value,
      unit,
      units,
      min,
      max,
      step: unit === 'rem' ? '0.1' : 1,
    };
  });

const Index = props => {
  const getIntls = useIntls();
  const [theme, setTheme] = useThemeStore();
  const [menuType, setMenuType] = useMenuTypeStore({
    menu: 'vertical',
    header: '',
  });
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
    const newTheme = JSON.parse(JSON.stringify(theme));
    newTheme.list.sizes[key] = `${value || ''}${unit}`;
    changeLayout(newTheme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: key,
      value: `${value || ''}${unit}`,
    });
  };
  const changeColors = (e, key) => {
    const {value} = e.target;
    const newTheme = JSON.parse(JSON.stringify(theme));
    newTheme.list.colors[key] = value;
    changeLayout(newTheme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: key,
      value,
    });
  };
  const changeFont = value => {
    setSize(value);
    changeFontSize(`${(value * 100) / 16}%`);
    report({
      actionType: 'change',
      category: 'layout',
      text: 'fontSize',
      value,
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
    const value = unit === 'px' ? 1280 : unit === 'rem' ? 128 : 100;
    const newTheme = JSON.parse(JSON.stringify(theme));
    newTheme.list.sizes[key] = `${value}${unit}`;
    changeLayout(newTheme.list);
    report({
      actionType: 'change',
      category: 'layout',
      text: key,
      value: `${value}${unit}`,
    });
  };
  const selectTheme = current => {
    storage.set('theme', current);
    setTheme(current);
    report({
      actionType: 'click',
      category: 'layout',
      text: 'switchTheme',
      value: current.name,
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
                  <label>{getIntls('main.layout.hideHeader')}</label>
                  <div>
                    <Checkbox
                      checked={menuType.header === 'noHeader'}
                      onChange={e =>
                        setMenuType({
                          header: e.target.checked ? 'noHeader' : '',
                          menu: menuType.menu,
                        })
                      }
                    >
                      {getIntls('main.layout.hidden')}
                    </Checkbox>
                  </div>
                </div>
                <div className="vertical-item">
                  <label>{getIntls('main.layout.menuType')}</label>
                  <div>
                    <Radio.Group
                      style={{marginTop: '5px'}}
                      value={menuType.menu}
                      onChange={e => {
                        setMenuType({
                          header: menuType.header,
                          menu: e.target.value,
                        });
                        report({
                          actionType: 'click',
                          category: 'layout',
                          text: 'switchMenuType',
                          value: e.target.value,
                        });
                      }}
                    >
                      <Radio value="vertical">{getIntls('main.layout.vertical')}</Radio>
                      <Radio value="horizontal">{getIntls('main.layout.horizontal')}</Radio>
                      <Radio value="compose">{getIntls('main.layout.compose')}</Radio>
                    </Radio.Group>
                  </div>
                </div>
                {/* <div className="vertical-item">
                  <label>{getIntls('main.layout.fontSize')}</label>
                  <div>
                    <Slider min={6} max={16} value={size} onChange={e => changeFont(e)} />
                  </div>
                </div> */}
                <div className="vertical-item">
                  <label>{getIntls('main.layout.themes')}</label>
                  <Row className="select-item">
                    {getThemeList(getIntls).map(item => (
                      <Col key={item.key} span={6} sm={6} xs={6} onClick={e => selectTheme(item)}>
                        <span className={`link item${item.key === theme.key ? ' selected' : ''}`}>{item.name}</span>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Panel>
            </Col>
            <Col span={4}>
              <Panel>
                <h3>{getIntls('main.layout.sizeDesign')}</h3>
                <div className="vertical-item">
                  <label>{getIntls('main.layout.fontSize')}</label>
                  <div>
                    <Slider min={6} max={16} value={size} onChange={e => changeFont(e)} />
                  </div>
                </div>
                <div className="vertical-item">
                  <label>{getIntls('main.layout.frameSize')}</label>
                  <div style={{paddingLeft: 0}}>
                    {getSizeList(theme.list.sizes).map(({key, value, unit, units, min, max, step}) => (
                      <Row key={key} gutter={[10, 10]}>
                        <Col span={6} sm={6} xs={6}>
                          <span style={labelStyle}>{themeLang[key] || key.slice(2)}：</span>
                        </Col>
                        <Col span={6} sm={6} xs={6}>
                          <InputNumber
                            aria-label="huxy-label"
                            min={min}
                            max={max}
                            value={value}
                            onChange={value => changeSizes(key, value, unit)}
                            addonAfter={
                              units.length > 1 ? (
                                <Select aria-label="huxy-label" value={unit} onChange={val => changeUnit(key, val)}>
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
                            step={step}
                          />
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </Panel>
            </Col>
            <Col span={4}>
              <Panel className="color-picker-panel">
                <h3>{getIntls('main.layout.colorDesign')}</h3>
                <div style={{paddingRight: '15px'}}>
                  {Object.keys(theme.list.colors).map(key => (
                    <Row key={key} gutter={[10, 10]}>
                      <Col span={6} sm={6} xs={6}>
                        <span style={labelStyle}>{themeLang[key] || key.slice(2)}：</span>
                      </Col>
                      <Col span={6} sm={6} xs={6}>
                        <Input aria-label="huxy-label" type="color" value={theme.list.colors[key]} onChange={e => changeColors(e, key)} />
                      </Col>
                    </Row>
                  ))}
                </div>
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
