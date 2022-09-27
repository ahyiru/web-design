import Layout from '@huxy/layout';
import {i18nsStore} from '@app/store/stores';
import {leftNav, rightNav} from '@app/configs/nav';
import useFormatMenu from './components/useFormatMenu';

import * as configs from './configs';

const Index = props => {
  const i18ns = i18nsStore.getState();
  const menus = useFormatMenu(props);
  return <Layout title={i18ns?.title} {...menus} leftList={leftNav()} rightList={rightNav()} {...configs} {...props} />;
};

export default Index;
