import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import {useLangStore, useThemeStore} from '@app/store/stores';

const uiLang = {
  zh: zhCN,
  en: enUS,
  jp: jaJP,
};

const Index = props => {
  const [language] = useLangStore();
  const [theme] = useThemeStore();
  const colors = theme?.list?.colors ?? {};
  return <ConfigProvider
    locale={uiLang[language] || zhCN}
    theme={{
      token: {
        colorBgBase: colors['--appBgColor'],
        colorTextBase: colors['--appColor'],
        colorBorder: colors['--borderColor'],
        colorText: colors['--appColor'],
        colorTextDisabled: colors['--appColor'],
        controlOutline: 'transparent',
        colorBgContainerDisabled: '',
        colorTextPlaceholder: '',
      },
    }}
  >
    {props.children}
  </ConfigProvider>;
};

export default Index;
