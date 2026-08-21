import {useState, useEffect} from 'react';
import {langStore, apisStore} from '@app/store/stores';
import getI18n from '@app/utils/getI18n';
import {getApiFn} from '@app/apis/apiList';
import {useAsync} from '@huxy/use';

const useGetI18ns = () => {
  const [state, update] = useAsync();
  useEffect(() => {
    update({
      apis: getApiFn(),
      i18ns: getI18n(),
    });
  }, []);
  if (state.allPendding === false) {
    langStore.setState(state.i18ns.language);
    apisStore.setState(state.apis);
  }
  return [state.allPendding];
};

export default useGetI18ns;
