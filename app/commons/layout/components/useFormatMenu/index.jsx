import {useRoute} from '@huxy/router';
import {useMenuTypeStore} from '@app/store/stores';

import {getSelected} from '@huxy/utils';

const formatMenu = (menu, curPath, type, cb = null) => {
  const menuConfig = {
    vertical: [],
    horizontal: [],
  };
  if (type === 'horizontal') {
    menuConfig[type] = menu;
    return menuConfig;
  }
  if (type === 'vertical') {
    menuConfig[type] = menu.length > 1 ? menu : menu[0]?.children;
    return menuConfig;
  }
  const horizontal = menu.map(item => {
    const {children, ...rest} = item;
    if (item.path === curPath) {
      menuConfig.vertical = children;
    }
    return rest;
  });
  menuConfig.horizontal = menu.length > 0 ? horizontal : [];
  return menuConfig;
};

const useFormatMenu = props => {
  const {current, menu: menus} = useRoute();
  const [type] = useMenuTypeStore(props.menuType ?? 'vertical');

  let menu = menus.find(({path}) => path === current[0]?.path)?.children ?? [];
  let firstLevel = 1;

  if (props.onlyCurrentMenu) {
    const selectedItems = getSelected(menu, props.onlyCurrentMenu, 'path');
    menu = selectedItems.slice(-1);
    firstLevel = current.length - selectedItems.length;
  }

  const {vertical, horizontal} = formatMenu(menu, current[firstLevel]?.path, type);

  return {vertical, horizontal, menu};
};

export default useFormatMenu;
