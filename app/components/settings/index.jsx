import {useState} from 'react';
import {Drawer, Space, Input, InputNumber, Slider, Button, Select, Radio, Checkbox} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import {TabHeader} from '@huxy/components';
import {useDebounce} from '@huxy/use';
import {storage, copyToClipboard, message} from '@huxy/utils';
import {Row, Col} from '@app/components/row';
// import Panel from '@app/components/panel';
import {sizeRules} from '@app/utils/sizeRules';
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

const tabs = i18nCfg => [
  {
    key: 'layout',
    value: i18nCfg.layoutDesign,
  },
  {
    key: 'size',
    value: i18nCfg.sizeDesign,
  },
  {
    key: 'color',
    value: i18nCfg.colorDesign,
  },
];

const Index = props => {
  const getIntls = useIntls();
  const themeLang = getIntls('theme', {});
  const i18nCfg = getIntls('main.layout', {});
  const [theme, setTheme] = useThemeStore();
  const [menuType, setMenuType] = useMenuTypeStore({
    menu: 'vertical',
    header: '',
  });

  const [active, setActive] = useState('layout');
  const [open, setOpen] = useState(false);

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
      message.success(i18nCfg.save_cfg_msg);
    }
  }, delay);

  const saveConfig = () => {
    changeLayout(theme.list, true);
    setOpen(false);
    report({
      actionType: 'click',
      category: 'settings',
      text: '保存配置',
      value: 'saveConfig',
    });
  };
  const copyConfig = () => {
    copyToClipboard(JSON.stringify(theme.list));
    setOpen(false);
    message.success(i18nCfg.copy_cfg_msg);
    report({
      actionType: 'click',
      category: 'settings',
      text: '拷贝配置',
      value: 'copyConfig',
    });
  };

  const changeFont = value => {
    setSize(value);
    changeFontSize(`${(value * 100) / 16}%`);
    report({
      actionType: 'change',
      category: 'settings',
      text: 'fontSize',
      value,
    });
  };
  const selectTheme = current => {
    storage.set('theme', current);
    setTheme(current);
    report({
      actionType: 'click',
      category: 'settings',
      text: 'switchTheme',
      value: current.name,
    });
  };

  const changeSizes = (key, value, unit) => {
    // e.persist();
    theme.list.sizes[key] = `${value || ''}${unit}`;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'settings',
      text: key,
      value: `${value || ''}${unit}`,
    });
  };
  const changeUnit = (key, unit) => {
    const value = unit === 'px' ? 1280 : unit === 'rem' ? 128 : 100;
    theme.list.sizes[key] = `${value}${unit}`;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'settings',
      text: key,
      value: `${value}${unit}`,
    });
  };

  const changeColors = (e, key) => {
    const {value} = e.target;
    theme.list.colors[key] = value;
    changeLayout(theme.list);
    report({
      actionType: 'change',
      category: 'settings',
      text: key,
      value,
    });
  };

  const comps = {
    layout: (
      <>
        <div className="vertical-item">
          <label>{i18nCfg.hideHeader}</label>
          <div>
            <Checkbox checked={menuType.header === 'noHeader'} onChange={e => setMenuType({
              header: e.target.checked ? 'noHeader' : '',
              menu: menuType.menu,
            })}>
              {i18nCfg.hidden}
            </Checkbox>
          </div>
        </div>
        <div className="vertical-item">
          <label>{i18nCfg.menuType}</label>
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
                  category: 'settings',
                  text: 'switchMenuType',
                  value: e.target.value,
                });
              }}
            >
              <Radio value="vertical">{i18nCfg.vertical}</Radio>
              <Radio value="horizontal">{i18nCfg.horizontal}</Radio>
              <Radio value="compose">{i18nCfg.compose}</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="vertical-item">
          <label>{i18nCfg.fontSize}</label>
          <div>
            <Slider min={6} max={16} value={size} onChange={e => changeFont(e)} />
          </div>
        </div>
        <Row className="select-item">
          {getThemeList(getIntls).map(item => (
            <Col key={item.key} span={6} sm={6} xs={6} onClick={e => selectTheme(item)}>
              <span className={`link item${item.key === theme.key ? ' selected' : ''}`}>{item.name}</span>
            </Col>
          ))}
        </Row>
      </>
    ),
    size: getSizeList(theme.list.sizes).map(({key, value, unit, units, min, max, step}) => (
      <Row key={key} gutter={[10, 10]}>
        <Col span={6} sm={6} xs={6}>
          <span style={labelStyle}>{themeLang[key] || key.slice(2)}：</span>
        </Col>
        <Col span={6} sm={6} xs={6}>
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
            step={step}
          />
        </Col>
      </Row>
    )),
    color: Object.keys(theme.list.colors).map(key => (
      <Row key={key} gutter={[10, 10]}>
        <Col span={6} sm={6} xs={6}>
          <span style={labelStyle}>{themeLang[key] || key.slice(2)}：</span>
        </Col>
        <Col span={6} sm={6} xs={6}>
          <Input type="color" value={theme.list.colors[key]} onChange={e => changeColors(e, key)} />
        </Col>
      </Row>
    )),
  };

  return (
    <>
      <span className={`link${open ? ' active' : ''}`} onClick={e => setOpen(true)} title="setting">
        <SettingOutlined />
      </span>
      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        className="configs-drawer"
        width="300px"
        extra={
          <Space>
            <Button onClick={() => saveConfig()}>{i18nCfg.saveConfig}</Button>
            <Button type="primary" onClick={() => copyConfig()}>
              {i18nCfg.copyConfig}
            </Button>
          </Space>
        }
      >
        <TabHeader flex tabs={tabs(i18nCfg)} switchTab={key => setActive(key)} />
        <div className="layout-setting" style={{padding: '15px'}}>
          {comps[active]}
        </div>
      </Drawer>
    </>
  );
};
export default Index;
