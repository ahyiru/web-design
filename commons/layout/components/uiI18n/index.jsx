import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';
import {useLangStore} from '@app/store/stores';

const uiLang = {
  zh: zhCN,
  en: enUS,
  jp: jaJP,
};

const Index = props => {
  const [language] = useLangStore();
  return <ConfigProvider locale={uiLang[language] || zhCN}>{props.children}</ConfigProvider>;
};

export default Index;
