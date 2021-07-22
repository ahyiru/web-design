import {useMemo} from 'react';
import {leftNav,rightNav} from '@app/configs/nav';

const useNavList=props=>{
  const {store}=props;
  const i18ns=store.getState('i18ns');

  const leftList=useMemo(()=>leftNav?.({store}),[i18ns]);
  const rightList=useMemo(()=>rightNav?.({store}),[i18ns]);

  return [leftList,rightList];
};

export default useNavList;


