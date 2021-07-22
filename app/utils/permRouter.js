const permRouter=(routers,permList,permKey='path',prefix='')=>{
  prefix=prefix==='/'?'':prefix;
  return routers.map(router=>{
    const path=prefix+router[permKey];
    const isRouterDenied=router.denied!=null&&path!=='/';
    if(!isRouterDenied&&router.children?.length){
      router.children=permRouter(router.children,permList,permKey,path);
    }
    router.denied=router.denied!=null?router.denied:!permList?.includes(path);
    return router;
  });
};

export default permRouter;


