import Layout from '@huxy/layout';
import {i18nsStore} from '@app/store/stores';
import getLang from '@app/utils/getLang';
import {leftNav, rightNav} from '@app/configs/nav';
import registerSocket from '@app/globals/registerSocket';
import useFormatMenu from './components/useFormatMenu';

import * as configs from './configs';

const Index = props => {
  registerSocket();
  const i18ns = i18nsStore.getState();
  const language = getLang();
  const [menus, noHeader] = useFormatMenu(props);
  return <Layout
    title={i18ns?.title}
    {...menus}
    leftList={noHeader ? null : leftNav(language)}
    rightList={noHeader ? null : rightNav(language)}
    {...configs}
    {...props}
    language={language}
  />;
};

export default Index;
