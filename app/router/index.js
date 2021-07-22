import {utils} from '@common';
const {traverItem}=utils;

import staticRouters from './staticRouter';
import dynamicRouter from './dynamicRouter';

staticRouters[0].children=dynamicRouter;

const routers=(nameList,routerList)=>traverItem((item,parent)=>{
  item.name=nameList[item.path]||item.name;
  const fullPath=[...parent,item].slice(1).map(item=>item.path).join('');
  item.id=routerList?.find(route=>route.path===fullPath)?._id;
  if(typeof item.componentPath==='string'){
    item.component=()=>import(`@app/views${item.componentPath}`);
  }
})(staticRouters);

export default routers;





