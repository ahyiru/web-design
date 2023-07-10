import {useState, useEffect} from 'react';
import getI18n from '@app/utils/getI18n';
import {getApiFn} from '@app/apis/apiList';
import {langStore} from '@app/store/stores';

const useGetI18ns = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadI18n = async () => {
      setLoading(true);
      try {
        await getApiFn();
        const {language} = await getI18n();
        langStore.setState(language);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    loadI18n();
  }, []);
  return [loading];
};

export default useGetI18ns;
