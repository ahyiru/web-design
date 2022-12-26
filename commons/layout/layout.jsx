import Layout from '@huxy/layout';
import {i18nsStore} from '@app/store/stores';
import getLang from '@app/utils/getLang';
import {leftNav, rightNav} from '@app/configs/nav';
import useFormatMenu from './components/useFormatMenu';

import * as configs from './configs';

const Index = props => {
  const i18ns = i18nsStore.getState();
  const language = getLang();
  const menus = useFormatMenu(props);
  return <Layout title={i18ns?.title} {...menus} leftList={leftNav(language)} rightList={rightNav(language)} {...configs} {...props} language={language} />;
};

export default Index;
