import {useState,useEffect} from 'react';
import {use,utils} from '@common';
// import Topbar from '../topbar';
import Header from '../header';
import Main from '../main';
import useCollapsed from '../hooks/useCollapsed';
import './index.less';

const {useWinResize}=use;
const {a2o}=utils;

const formatMenu=(menu,curPath,type='sideMenu',cb=null)=>{
  const menuConfig={
    sideMenu:null,
    navMenu:null,
  };
  if(type==='navMenu'){
    menuConfig[type]=menu.length>1?menu:menu[0]?.children;
    return menuConfig;
  }
  const navMenu=menu.map(v=>{
    const {children,...rest}=v;
    if(v.path===curPath){
      menuConfig.sideMenu=children;
    }
    return rest;
  });
  menuConfig.navMenu=menu.length>1?navMenu:null;
  return menuConfig;
};

const Index=props=>{
  const {store,current,headerStyle}=props;
  const menu=store.getState('appMenu');

  const [menuType,setMenuType]=useState(props.menuType||'sideMenu');

  const [collapsed]=useCollapsed(store);

  const [theme,setTheme]=useState(store.getState('huxy-theme'));

  const {width}=useWinResize();
  
  useEffect(()=>{
    const {subscribe}=store||{};
    if(subscribe){
      subscribe('huxy-theme',theme=>{
        setTheme(theme);
      });
      subscribe('huxy-menuType',result=>setMenuType(result.menuType?'navMenu':'sideMenu'));
    }
  },[]);
  
  const {sideMenu,navMenu}=formatMenu(menu,current[0]?.path,menuType);

  return <div className={`frame ${theme?.key??''}${collapsed?' collapsed':''}`} style={a2o(theme?.list)}>
    <header className="frame-header" style={headerStyle}>
      {/* <Topbar {...props} /> */}
      <Header {...props} navMenu={width<768?[]:navMenu} />
    </header>
    <main className="frame-main">
      <Main {...props} menu={width<768?menu:sideMenu} />
    </main>
  </div>;
};

export default Index;

