const types={
  language:({store,item})=>store.setState({'huxy-language':item.key}),
  /* theme:({store,item})=>{
    const i18ns=store.getState('i18ns');
    const themeList=getThemeList(i18ns?.theme)??[];
    const current=themeList.find(v=>v.key===item.key);
    if(current){
      storage.set('theme',current);
      store.setState({'huxy-theme':current});
    }
  }, */
};
const handleNavClick=(props,item)=>{
  const {handle,path,link,type}=item;
  const {router,store}=props;
  if(typeof handle==='function'){
    return handle(item);
  }
  if(link){
    return window.open(link);
  }
  if(path){
    return router.push(path);
  }
  types[type]?.({store,item});
};

export default handleNavClick;

