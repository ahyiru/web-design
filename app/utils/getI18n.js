import {getValue} from '@huxy/utils';
import {i18nsStore} from '@app/store/stores';
import getLang from './getLang';

const getI18n = async () => {
  const language = getLang();
  let i18ns = await import(`@app/i18ns/${language}`);
  i18ns = i18ns.default ?? i18ns;
  Object.setPrototypeOf(i18ns, {getValue: keys => getValue(i18ns, keys)});
  i18nsStore.setState(i18ns);
  return {i18ns, language};
};

export default getI18n;
