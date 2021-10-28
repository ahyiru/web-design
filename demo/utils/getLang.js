import {utils} from '@common';
const {storage,sysLang}=utils;

const getLang=()=>storage.get('language')||sysLang();

export default getLang;