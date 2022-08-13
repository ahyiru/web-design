import {useRef} from 'react';
import useFetchList from './useFetchList';

const useHandleList = (fetchList, initParams = null, handleResult, commonParams = null) => {
  const {current, size, ...rest} = initParams || {};
  const search = useRef(rest || {});
  const page = useRef({current: current || 1, size: size || 10});
  const [result, update] = useFetchList(fetchList, {...page.current, ...search.current}, handleResult, commonParams);

  const pageChange = (current, size) => {
    page.current = {current, size};
    update({
      ...page.current,
      ...search.current,
    });
  };
  const searchList = values => {
    search.current = values;
    page.current = {...page.current, current: 1};
    update({...page.current, ...search.current});
  };
  const handleUpdate = params => {
    const {current, size, ...rest} = params;
    page.current = {current: current ?? page.current.current, size: size ?? page.current.size};
    search.current = {...search.current, ...rest};
    update({...page.current, ...search.current});
  };

  return [result, handleUpdate, pageChange, searchList];
};

export default useHandleList;
