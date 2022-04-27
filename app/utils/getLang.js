import {storage, sysLang} from '@huxy/utils';

const getLang = () => storage.get('language') || sysLang();

export default getLang;
