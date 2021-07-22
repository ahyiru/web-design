import {utils} from '@common';
const {storage,sysLang}=utils;

const getI18n=async ()=>{
  const language=storage.get('language')||sysLang();
  const i18ns=await import(`@app/i18n/${language}`);
  return {i18ns:i18ns.default??i18ns,language};
};

export default getI18n;