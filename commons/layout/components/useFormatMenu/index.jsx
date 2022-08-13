import {useRoute} from '@huxy/router';
import {useMenuTypeStore} from '@app/store/stores';

const formatMenu = (menu, curPath, type = 'vertical', cb = null) => {
  const menuConfig = {
    vertical: [],
    horizontal: [],
  };
  if (type === 'horizontal') {
    menuConfig[type] = menu /* .length>1?menu:menu[0]?.children */;
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

  const menu = menus[0]?.children ?? [];

  const [menuType] = useMenuTypeStore('vertical');

  const {vertical, horizontal} = formatMenu(menu, current[1]?.path, menuType);

  return {vertical, horizontal, menu};
};

export default useFormatMenu;
