import storage from 'ihuxy-utils/storage';
import {sysLang} from 'ihuxy-utils/sysInfo';

const getLang = () => storage.get('language') || sysLang();

export default getLang;
