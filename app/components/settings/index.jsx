import {useState} from 'react';
import {Drawer,Space,Input,InputNumber,Slider,Button,message,Select,Radio} from 'antd';
import {SettingOutlined} from '@ant-design/icons';

import {Row,Col} from '@app/components/row';
// import Panel from '@app/components/panel';
import {sizeRules} from '@app/utils/sizeRules';
import {utils,use,components} from '@common';
import getThemeList from '@app/configs/theme';


const {storage,copyToClipboard}=utils;
const {useDebounce}=use;

const {TabHeader}=components;

const {Option}=Select;

const delay=500;

const labelStyle={
  display:'block',
  textAlign:'right',
  lineHeight:'32px',
};

const getSizeList=list=>Object.keys(list).map(key=>{
  const size=list[key];
  const value=size.replace(/[^0-9]/ig,'')-0;
  const unit=size.replace(value,'');
  const units=Object.keys(sizeRules[key]);
  const range=sizeRules[key][unit];
  return {
    key,
    value,
    unit,
    units,
    min:range[0],
    max:range[1],
  };
});

const tabs=i18nCfg=>[
  {
    key:'layout',
    value:i18nCfg.layoutDesign,
  },
  {
    key:'color',
    value:i18nCfg.sizeDesign,
  },
  {
    key:'size',
    value:i18nCfg.colorDesign,
  },
];

const Index=props=>{
  const [active,setActive]=useState('layout');
  const [visible,setVisible]=useState(false);

  const {store,useStore}=props;
  const [theme,setTheme]=useStore('huxy-theme');
  const [menuType,setMenuType]=useStore('huxy-menuType','vertical');
  const i18ns=store.getState('i18ns');
  const themeLang=i18ns?.theme??{};
  const i18nCfg=i18ns?.main.layout??{};
  const [size,setSize]=useState(10);
  const changeFontSize=useDebounce(value=>document.documentElement.style.setProperty('--rootSize',value),delay);
  const changeLayout=useDebounce((value,save=false)=>{
    const newTheme={
      name:'custom',
      key:'custom',
      list:value,
    };
    setTheme(newTheme);
    if(save){
      storage.set('theme',newTheme);
      message.success(i18nCfg.save_cfg_msg);
    }
  },delay);

  const saveConfig=()=>{
    changeLayout(theme.list,true);
    setVisible(false);
  };
  const copyConfig=()=>{
    copyToClipboard(JSON.stringify(theme.list));
    setVisible(false);
    message.success(i18nCfg.copy_cfg_msg);
  };

  const changeFont=value=>{
    setSize(value);
    changeFontSize(`${value*100/16}%`);
  };
  const selectTheme=current=>{
    storage.set('theme',current);
    setTheme(current);
  };

  const changeSizes=(key,value,unit)=>{
    // e.persist();
    theme.list.sizes[key]=`${value||''}${unit}`;
    changeLayout(theme.list);
  };
  const changeUnit=(key,unit)=>{
    const value=unit==='px'?1200:100;
    theme.list.sizes[key]=`${value}${unit}`;
    changeLayout(theme.list);
  };

  const changeColors=(e,key)=>{
    const {value}=e.target;
    theme.list.colors[key]=value;
    changeLayout(theme.list);
  };

  const comps={
    layout:<>
      <div className="vertical-item">
        <label>{i18nCfg.menuType}</label>
        <Radio.Group style={{marginTop:'5px'}} value={menuType} onChange={e=>setMenuType(e.target.value)}>
          <Radio value="vertical">{i18nCfg.vertical}</Radio>
          <Radio value="horizontal">{i18nCfg.horizontal}</Radio>
          <Radio value="compose">{i18nCfg.compose}</Radio>
        </Radio.Group>
      </div>
      <div className="vertical-item">
        <label>{i18nCfg.fontSize}</label>
        <Slider min={6} max={16} value={size} onChange={e=>changeFont(e)} />
      </div>
      <Row className="select-item">
        {
          getThemeList(themeLang).map(item=><Col key={item.key} span={6} onClick={e=>selectTheme(item)}>
            <a className={`item${item.key===theme.key?' selected':''}`}>{item.name}</a>
          </Col>)
        }
      </Row>
    </>,
    color:getSizeList(theme.list.sizes).map(({key,value,unit,units,min,max})=><Row key={key} style={{marginTop:12}}>
      <Col span={5}><span style={labelStyle}>{themeLang[key]}：</span></Col>
      <Col span={6}>
        <InputNumber
          min={min}
          max={max}
          value={value}
          onChange={value=>changeSizes(key,value,unit)}
          addonAfter={units.length>1?<Select value={unit} onChange={val=>changeUnit(key,val)}>
            {
              units.map(u=><Option key={u} value={u}>{u}</Option>)
            }
          </Select>:units[0]}
        />
      </Col>
    </Row>),
    size:Object.keys(theme.list.colors).map(key=><Row key={key} style={{marginTop:12}}>
      <Col span={5}><span style={labelStyle}>{themeLang[key]}：</span></Col>
      <Col span={6}><Input type="color" value={theme.list.colors[key]} onChange={e=>changeColors(e,key)} /></Col>
    </Row>),
  };

  return <>
    <a className={visible?'active':''} onClick={e=>setVisible(true)}><SettingOutlined /></a>
    <Drawer onClose={()=>setVisible(false)} visible={visible}
      className="configs-drawer"
      width="300px"
      extra={
        <Space>
          <Button onClick={()=>saveConfig()}>{i18nCfg.saveConfig}</Button>
          <Button type="primary" onClick={()=>copyConfig()}>{i18nCfg.copyConfig}</Button>
        </Space>
      }
    >
      <TabHeader flex tabs={tabs(i18nCfg)} switchTab={key=>setActive(key)} />
      <div className="layout-setting" style={{padding:'15px 0'}}>
        {comps[active]}
      </div>
    </Drawer>
  </>;
};
export default Index;


