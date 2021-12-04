import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';

const uiLang={
  zh:zhCN,
  en:enUS,
  jp:jaJP,
};

const Index=props=>{
  const {useStore,children}=props;
  const [language]=useStore('huxy-language');
  return <ConfigProvider locale={uiLang[language]||zhCN}>
    {children}
  </ConfigProvider>;
};

export default Index;
