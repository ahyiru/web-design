import getThemeList from '@app/configs/theme';
import {utils} from '@common';
const {storage}=utils;
const types={
  link:({item})=>window.open(item.link),
  language:({store,item})=>store.setState({'huxy-language':item.key}),
  theme:({store,item})=>{
    const i18ns=store.getState('i18ns');
    const themeList=getThemeList(i18ns?.theme)??[];
    const current=themeList.find(v=>v.key===item.key);
    if(current){
      storage.set('theme',current);
      store.setState({'huxy-theme':current});
    }
  },
  collapse:({store},e)=>{
    e.stopPropagation();
    store.setState({'huxy-collapse':!store.getState('huxy-collapse')});
  },
};
const handleNavClick=(props,item,e)=>{
  const {handle,path,type}=item;
  const {router,store}=props;
  if(typeof handle==='function'){
    return handle(item);
  }
  if(path){
    return router.push(path);
  }
  types[type]?.({store,item},e);
};

export default handleNavClick;

