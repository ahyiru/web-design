import {useCallback} from 'react';
import {useI18nsStore, i18nsStore} from '@app/store/stores';

const Intls = ({keys, children}) => {
  const [i18ns] = useI18nsStore();
  return (keys && i18ns?.getValue(keys)) ?? children ?? '';
};

export const useIntls = () => {
  const [i18ns] = useI18nsStore();
  return useCallback((keys, def) => (keys && i18ns?.getValue(keys)) ?? def ?? '', [i18ns]);
};

export const getIntls = (keys, def) => (keys && i18nsStore.getState()?.getValue(keys)) ?? def ?? '';

export default Intls;
