import {Layout} from '@common';
import UiI18n from './components/uiI18n';
import useNavList from './components/useNavList';
import useFormatMenu from './components/useFormatMenu';

import * as configs from './configs';

const Index=props=>{
  const {store,useStore}=props;
  const i18ns=store.getState('i18ns');
  const [leftList,rightList]=useNavList({store,useStore});
  const menus=useFormatMenu();
  return <UiI18n useStore={useStore}><Layout title={i18ns?.title} {...props} {...menus} leftList={leftList} rightList={rightList} {...configs} /></UiI18n>;
};

export default Index;

