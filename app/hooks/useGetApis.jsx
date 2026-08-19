import {useEffect} from 'react';
import {getApiFn} from '@app/apis/apiList';
import {apisStore} from '@app/store/stores';

const useGetApis = () => {
  useEffect(() => {
    const loadApis = async () => {
      try {
        const apis = await getApiFn();
        apisStore.setState(apis);
      } catch (err) {
        console.log('获取 api 失败：', err);
      }
    };
    loadApis();
  }, []);
};

export default useGetApis;
