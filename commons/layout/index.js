import Layout from '@huxy/layout';
import Antdi18n from './components/antdi18n';
import useNavList from './components/useNavList';

import * as configs from './configs';

const Index=props=>{
  const {store}=props;
  const [leftList,rightList]=useNavList({store});
  return <Antdi18n store={store}><Layout {...props} leftList={leftList} rightList={rightList} {...configs} /></Antdi18n>;
};

export default Index;

