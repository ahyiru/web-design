import {useMemo} from 'react';
import {leftNav,rightNav} from '@app/configs/nav';

const useNavList=props=>{
  const {store,useStore}=props;
  const i18ns=store.getState('i18ns');

  const leftList=useMemo(()=>leftNav?.({store,useStore}),[i18ns]);
  const rightList=useMemo(()=>rightNav?.({store,useStore}),[i18ns]);

  return [leftList,rightList];
};

export default useNavList;


