import {useCallback, useEffect, useRef} from 'react';
import {useAsync} from '@huxy/use';

const useFetchList = (fetchList, initParams = null, handleResult, commonParams = null) => {
  const [result, updateResult] = useAsync({});
  const isMounted = useRef(false);
  const update = useCallback(params => fetchList && updateResult({res: fetchList({...commonParams, ...params})}, handleResult), []);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      update({...initParams});
    }
  }, []);
  const {res} = result;

  return [{pending: res?.pending, data: res?.result}, update];
};

export default useFetchList;
