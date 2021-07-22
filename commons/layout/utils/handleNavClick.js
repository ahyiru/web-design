import getThemeList from '@app/configs/theme';
import {utils} from '@common';
const {storage}=utils;
const types={
  link:({item})=>window.open(item.link),
  language:({store,item})=>store.setState({'huxy-language':item.key}),
  theme:({store,item,themeList})=>{
    const current=themeList.find(v=>v.key===item.key);
    if(current){
      storage.set('theme',current);
      store.setState({'huxy-theme':current});
    }
  },
  collapse:({store})=>store.setState({'huxy-collapsed':!store.getState('huxy-collapsed')}),
};
const handleNavClick=(props,item)=>{
  const {store,router}=props;
  const {handle,path,type}=item;
  const i18ns=store.getState('i18ns');
  const themeList=getThemeList?.(i18ns?.theme)??[];
  if(typeof handle==='function'){
    return handle(item);
  }
  if(path){
    return router.push(path);
  }
  types[type]?.({store,item,themeList});
};

export default handleNavClick;

