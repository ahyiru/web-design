import {Layout,useRoute} from '@common';
import UiI18n from './components/uiI18n';
import useNavList from './components/useNavList';

import * as configs from './configs';

const Index=props=>{
  const routes=useRoute();
  const {store}=props;
  const i18ns=store.getState('i18ns');
  const [leftList,rightList]=useNavList({store});
  return <UiI18n store={store}><Layout title={i18ns?.title} {...props} menu={routes.menu} leftList={leftList} rightList={rightList} {...configs} /></UiI18n>;
};

export default Index;

