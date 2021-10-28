import staticRoutes from './staticRoutes';
import {utils} from '@common';
const {traverItem}=utils;

const whiteList=[];

traverItem((item,parent)=>{
  const path=`${parent.map(v=>v.path).join('')}${item.path}`;
  whiteList.push(path);
})(staticRoutes);

export default whiteList;



