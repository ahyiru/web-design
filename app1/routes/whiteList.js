import {traverItem} from '@huxy/utils';
import staticRoutes from './routerComp/staticRoutes';

const whiteList = [];

traverItem((item, parent) => {
  const path = `${parent.map(v => v.path).join('')}${item.path}`;
  whiteList.push(path);
})(staticRoutes);

export default whiteList;
