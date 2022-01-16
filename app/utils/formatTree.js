import traverItem from 'ihuxy-utils/traverItem';
import {arr2TreeByPath} from 'ihuxy-utils/arr2Tree';
import isValidArr from 'ihuxy-utils/isValidArr';
import fixIcons from './fixIcons';

const fixIcon = (router) =>
  router.map((item) => {
    item.key = item.key || item.path;
    item.icon = fixIcons(item.iconKey || 'EyeInvisibleOutlined');
    return item;
  });

const formatTree = (arr) =>
  traverItem((item) => {
    if (!isValidArr(item.children)) {
      item.isLeaf = true;
    }
  })(arr2TreeByPath(fixIcon(arr)));

export default formatTree;
