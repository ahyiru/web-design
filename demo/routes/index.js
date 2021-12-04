import {utils} from '@common';
const {traverItem}=utils;

import staticRoutes from './staticRoutes';
import {configRoutes,dashboardRoutes,commonRoutes,pageRoutes,playgroundRoutes} from './dynamicRoutes';

const dynamicRoutes=[configRoutes,dashboardRoutes,commonRoutes,pageRoutes,playgroundRoutes];

const allRoutes=[
  {
    path:'/',
    component:()=>import('@common/layout'),
    children:dynamicRoutes,
  },
  ...staticRoutes,
];

const routes=(nameList,routerList)=>traverItem((item,parent)=>{
  const fullPath=[...parent,item].map(item=>item.path).join('').replace('//','/');
  item.name=nameList?.[fullPath]??item.name;
  item.id=routerList?.find(route=>route.path===fullPath)?._id;
  if(typeof item.componentPath==='string'){
    item.component=()=>import(`@app/views${item.componentPath}`);
  }
})(allRoutes);

export default routes;



