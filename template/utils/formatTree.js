import fixIcons from './fixIcons';
import {utils} from '@common';

const {traverItem,arr2TreeByPath,isValidArr}=utils;

const fixIcon=router=>router.map(item=>{
  item.key=item.key||item.path;
  item.icon=fixIcons(item.iconKey||'EyeInvisibleOutlined');
  return item;
});

const formatTree=arr=>traverItem(item=>{
  if(!isValidArr(item.children)){
    item.isLeaf=true;
  }
})(arr2TreeByPath(fixIcon(arr)));


export default formatTree;
