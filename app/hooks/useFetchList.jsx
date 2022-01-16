import {useCallback, useEffect} from 'react';
import useAsync from 'ihuxy-use/useAsync';

const useFetchList = (fetchList, commonParams = null, initParams = null, handleResult) => {
  const [result, updateResult] = useAsync({});
  const update = useCallback((params) => updateResult({res: fetchList({...params, ...commonParams})}, handleResult), []);
  useEffect(() => {
    update({...initParams});
  }, []);
  const {res} = result;
  const isPending = !res || res.pending;

  return [{isPending, data: res?.result}, update];
};

export default useFetchList;
