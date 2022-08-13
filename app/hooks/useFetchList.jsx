import {useCallback, useEffect} from 'react';
import {useAsync} from '@huxy/use';

const useFetchList = (fetchList, initParams = null, handleResult, commonParams = null) => {
  const [result, updateResult] = useAsync({});
  const update = useCallback(params => updateResult({res: fetchList({...commonParams, ...params})}, handleResult), []);
  useEffect(() => {
    update({...initParams});
  }, []);
  const {res} = result;
  const isPending = !res || res.pending;

  return [{isPending, data: res?.result}, update];
};

export default useFetchList;
