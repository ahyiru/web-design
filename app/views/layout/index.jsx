import {useState} from 'react';
import {Input,InputNumber,Switch,Button,message} from 'antd';
import {Row,Col} from '@app/components/row';
import Panel from '@app/components/panel';
import {utils,use} from '@common';
const {storage}=utils;
const {useDebounce}=use;

const delay=500;

const labelStyle={
  display:'block',
  textAlign:'right',
  lineHeight:'32px',
};

const validValues=(item,i18nCfg)=>{
  const {value}=item;
  if(item.key==='--maxWidth'){
    const mpx=value.match(/px$/);
    const mper=value.match(/%$/);
    if(!mpx&&!mper){
      message.warning(i18nCfg.data_valid_msg);
      return;
    }
    if(mpx){
      const val=value.slice(0,-2);
      if(!val||isNaN(val)){
        message.warning(i18nCfg.data_valid_msg);
        return;
      }
      if(val<500||val>5000){
        message.warning(i18nCfg.data_px_msg);
        return;
      }
      // item.value=val;
      return true;
    }
    if(mper){
      const val=value.slice(0,-1);
      if(!val||isNaN(val)){
        message.warning(i18nCfg.data_valid_msg);
        return;
      }
      if(val<50||val>100){
        message.warning(i18nCfg.data_percent_msg);
        return;
      }
      // item.value=val;
      return true;
    }
  }else{
    const mpx=value.match(/px$/);
    if(!mpx){
      message.warning(i18nCfg.data_valid_msg);
      return;
    }
    const val=value.slice(0,-2);
    if(!val||isNaN(val)){
      message.warning(i18nCfg.data_valid_msg);
      return;
    }
    if(val<0||val>300){
      message.warning(i18nCfg.menu_width_msg);
      return;
    }
    console.log(val);
    // item.value=val;
    return true;
  }
};

const Index=props=>{
  const {store,useStore}=props;
  const [theme,setTheme]=useStore(store,'huxy-theme');
  const [menuType,setMenuType]=useStore(store,'huxy-menuType');
  const i18ns=store.getState('i18ns');
  const themeLang=i18ns?.theme??{};
  const i18nCfg=i18ns?.main.layout??{};

  const [themeList,setThemeList]=useState(theme?.list??[]);
  const [size,setSize]=useState('10');

  const changeFontSize=useDebounce(value=>document.documentElement.style.setProperty('--rootSize',value),delay);
  const changeLayout=useDebounce((item,value,save=false)=>{
    if(item&&!item.key.includes('Color')){
      const val=validValues(item,i18nCfg);
      if(!val){
        return;
      }
    }
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
  const changeTheme=(e,item)=>{
    // e.persist();
    const curItem=themeList.find(v=>v.key===item.key);
    if(curItem){
      curItem.value=e.target.value;
    }
    setThemeList([...themeList]);
    changeLayout(curItem,[...themeList]);
  };
  const changeFont=value=>{
    // const {value}=e.target;
    setSize(value);
    changeFontSize(`${value*100/16}%`);
  };
  const saveConfig=()=>{
    changeLayout(null,themeList,true);
  };
  const sizes=themeList.filter(v=>!v.key.includes('Color')).map(v=>({...v,type:'text'}));
  const colors=themeList.filter(v=>v.key.includes('Color')).map(v=>({...v,type:'color'}));
  return <div>
    <Row>
      <Col>
        <Panel>
          <div style={{padding:'15px 0',float:'right'}}>
            <Button type="primary" onClick={saveConfig}>{i18nCfg.saveConfig}</Button>
          </div>
          <div style={{marginTop:10}}>
            <span>{i18nCfg.switchMenu}</span>
            <Switch checkedChildren={i18nCfg.checkedChildren} unCheckedChildren={i18nCfg.unCheckedChildren} checked={menuType==='navMenu'} onChange={type=>{
              setMenuType(type?'navMenu':'sideMenu');
            }} />
          </div>
          <div style={{marginTop:10}}>
            <span>{i18nCfg.fontSize}</span>
            <InputNumber min={0} max={18} value={size} onChange={e=>changeFont(e)} />
          </div>
        </Panel>
      </Col>
      <Col>
        <Row>
          <Col span={6}>
            <Panel>
              <h2>{i18nCfg.sizeDesign}</h2>
              {
                sizes.map(v=><Row key={v.key} style={{marginTop:8}}>
                  <Col span={4}><span style={labelStyle}>{themeLang[v.key]}：</span></Col>
                  <Col span={6}><Input disabled={v.key==='--topbarHeight'} type={v.type} value={v.value} onChange={e=>changeTheme(e,v)} /></Col>
                </Row>)
              }
            </Panel>
          </Col>
          <Col span={6}>
            <Panel>
              <h2>{i18nCfg.colorDesign}</h2>
              {
                colors.map(v=><Row key={v.key} style={{marginTop:8}}>
                  <Col span={4}><span style={labelStyle}>{themeLang[v.key]}：</span></Col>
                  <Col span={6}><Input type={v.type} value={v.value} onChange={e=>changeTheme(e,v)} /></Col>
                </Row>)
              }
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>;
};

export default Index;

