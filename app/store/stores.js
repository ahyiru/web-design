import {store, useStore} from '.';
import {langName, themeName, menuTypeName, i18nsName, userInfoName, permissionName, routersName} from './names';

export const langStore = store(langName);
export const menuTypeStore = store(menuTypeName);
export const themeStore = store(themeName, {});
export const i18nsStore = store(i18nsName, {});
export const userInfoStore = store(userInfoName, {});
export const permissionStore = store(permissionName, []);
export const routersStore = store(routersName, []);

export const useLangStore = initState => useStore(langName, initState);
export const useMenuTypeStore = initState => useStore(menuTypeName, initState);
export const useThemeStore = (initState = {}) => useStore(themeName, initState);
export const useI18nsStore = (initState = {}) => useStore(i18nsName, initState);
export const useUserInfoStore = (initState = {}) => useStore(userInfoName, initState);
export const usePermissionStore = (initState = []) => useStore(permissionName, initState);
export const useRoutersStore = (initState = []) => useStore(routersName, initState);
