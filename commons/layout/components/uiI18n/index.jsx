import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import {useLangStore} from '@app/store/stores';

const uiLang = {
  zh: zhCN,
  en: enUS,
  jp: jaJP,
};

const Index = props => {
  const [language] = useLangStore();
  return <ConfigProvider
    locale={uiLang[language] || zhCN}
    theme={{
      token: {
        colorText: 'var(--appColor)',
        colorTextDisabled: '',
        colorBgContainerDisabled: '',
        colorTextPlaceholder: '',
      },
    }}
  >
    {props.children}
  </ConfigProvider>;
};

export default Index;
