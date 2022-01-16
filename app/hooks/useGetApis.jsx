import {useState, useEffect} from 'react';
import {getApiFn} from '@app/utils/getApis';

const useGetApis = () => {
  const [apis, setApis] = useState(null);
  useEffect(() => {
    const loadApis = async () => {
      const apis = await getApiFn();
      setApis(apis);
    };
    loadApis();
  }, []);
  return [apis];
};

export default useGetApis;
