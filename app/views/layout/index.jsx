import {useState,useEffect} from 'react';

import {Input,InputNumber,Switch,Button,message} from 'antd';

import {utils,use} from '@common';

import {Row,Col} from '@app/components/row';

import Panel from '@app/components/panel';

const {storage}=utils;

const {useDebounce}=use;

const delay=500;

const labelStyle={
  display:'block',
  textAlign:'right',
  lineHeight:'32px',
};

const validValues=item=>{
  const {value}=item;
  if(item.key==='--maxWidth'){
    const mpx=value.match(/px$/);
    const mper=value.match(/%$/);
    if(!mpx&&!mper){
      message.warning('请输入合法数据！');
      return;
    }
    if(mpx){
      const val=value.slice(0,-2);
      if(!val||isNaN(val)){
        message.warning('请输入合法数据！');
        return;
      }
      if(val<500||val>5000){
        message.warning('请输入500-5000内数据！');
        return;
      }
      // item.value=val;
      return true;
    }
    if(mper){
      const val=value.slice(0,-1);
      if(!val||isNaN(val)){
        message.warning('请输入合法数据！');
        return;
      }
      if(val<50||val>100){
        message.warning('请输入50-100内数据！');
        return;
      }
      // item.value=val;
      return true;
    }
  }else{
    const mpx=value.match(/px$/);
    if(!mpx){
      message.warning('请输入合法数据！');
      return;
    }
    const val=value.slice(0,-2);
    if(!val||isNaN(val)){
      message.warning('请输入合法数据！');
      return;
    }
    if(val<0||val>300){
      message.warning('请输入0-300内数据！');
      return;
    }
    console.log(val);
    // item.value=val;
    return true;
  }
};

const Index=props=>{
  const {store}=props;
  const themeLang=store.getState('i18ns')?.theme??{};
  const localTheme=store.getState('huxy-theme')?.list;
  const [theme,setTheme]=useState(localTheme||[]);
  const [size,setSize]=useState('10');
  const [menuType,setMenuType]=useState(false);
  const changeFontSize=useDebounce(value=>document.documentElement.style.setProperty('--rootSize',value),delay);
  const changeLayout=useDebounce((item,value,save=false)=>{
    if(item&&!item.key.includes('Color')){
      const val=validValues(item);
      if(!val){
        return;
      }
    }
    const newTheme={
      name:'custom',
      key:'custom',
      list:value,
    };
    store.setState({'huxy-theme':newTheme});
    if(save){
      storage.set('theme',newTheme);
      message.success('主题保存成功！！');
    }
  },delay);
  useEffect(()=>{
    store.subscribe('huxy-theme',result=>setTheme(result.list));
  },[]);
  const changeTheme=(e,item)=>{
    // e.persist();
    const curItem=theme.find(v=>v.key===item.key);
    if(curItem){
      curItem.value=e.target.value;
    }
    setTheme([...theme]);
    changeLayout(curItem,[...theme]);
  };
  const changeFont=value=>{
    // const {value}=e.target;
    setSize(value);
    changeFontSize(`${value*100/16}%`);
  };
  const saveConfig=()=>{
    changeLayout(null,theme,true);
  };
  const sizes=theme.filter(v=>!v.key.includes('Color')).map(v=>({...v,type:'text'}));
  const colors=theme.filter(v=>v.key.includes('Color')).map(v=>({...v,type:'color'}));
  return <div>
    <Row>
      <Col>
        <Panel>
          <div style={{padding:'15px 0',float:'right'}}>
            <Button type="primary" onClick={saveConfig}>保存配置</Button>
          </div>
          <div style={{marginTop:10}}>
            <span>切换横纵菜单：</span>
            <Switch checkedChildren="横" unCheckedChildren="纵" checked={menuType} onChange={type=>{
              setMenuType(type);
              store.setState({'huxy-menuType':{menuType:type}});
            }} />
          </div>
          <div style={{marginTop:10}}>
            <span>字体比例大小：</span>
            <InputNumber min={0} max={18} value={size} onChange={e=>changeFont(e)} />
          </div>
        </Panel>
      </Col>
      <Col>
        <Row>
          <Col span={6}>
            <Panel>
              <h2>大小设计</h2>
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
              <h2>颜色设计</h2>
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

