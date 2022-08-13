import {traverItem, arr2TreeByPath, isValidArr} from '@huxy/utils';
import Icon from '@app/components/icon';

const fixIcon = router =>
  router.map(item => {
    item.key = item.key || item.path;
    item.icon = <Icon icon={item.iconKey || 'EyeInvisibleOutlined'} />;
    return item;
  });

const formatTree = arr =>
  traverItem(item => {
    if (!isValidArr(item.children)) {
      item.isLeaf = true;
    }
  })(arr2TreeByPath(fixIcon(arr)));

export default formatTree;
