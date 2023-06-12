import {traverItem, arr2TreeByPath, isValidArr} from '@huxy/utils';
import Icon from '@app/components/icon';

const formatTree = arr =>
  traverItem(item => {
    if (!isValidArr(item.children)) {
      item.isLeaf = true;
    }
    item.key = item.key || item.path;
    if (typeof item.icon === 'string') {
      item.iconKey = item.icon;
    }
    item.icon = <Icon icon={item.icon || 'EyeInvisibleOutlined'} />;
  })(arr2TreeByPath(arr));

export default formatTree;
