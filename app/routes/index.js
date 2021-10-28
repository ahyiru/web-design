import {utils} from '@common';
const {traverItem}=utils;

import staticRoutes from './staticRoutes';
import {dynamicRoutes,dynamicRootRoutes} from './dynamicRoutes';

staticRoutes[0].children=dynamicRoutes;

const routers=(nameList,routerList)=>traverItem((item,parent)=>{
  const fullPath=[...parent,item].map(item=>item.path).join('').replace('//','/');
  item.name=nameList?.[fullPath]??item.name;
  item.id=routerList?.find(route=>route.path===fullPath)?._id;
  if(typeof item.componentPath==='string'){
    item.component=()=>import(`@app/views${item.componentPath}`);
  }
})([...staticRoutes,...dynamicRootRoutes]);

export default routers;





