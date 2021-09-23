import staticRouters from './staticRouter';
import {utils} from '@common';
const {traverItem}=utils;

const whiteList=[];

traverItem((item,parent)=>{
  const path=`${parent.map(v=>v.path).join('')}${item.path}`;
  whiteList.push(path);
})(staticRouters);

export default whiteList;



