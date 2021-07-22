import {useRef} from 'react';
import useFetchList from './useFetchList';

const useHandleList=(fetchList,commonParams=null,initParams=null)=>{
  const search=useRef({});
  const page=useRef({current:1,size:10});
  const [result,update]=useFetchList(fetchList,commonParams,{...page.current,...search.current,...initParams});

  const pageChange=(current,size)=>{
    page.current={current,size};
    update({
      ...page.current,
      ...search.current,
    });
  };
  const searchList=values=>{
    search.current=values;
    page.current={...page.current,current:1};
    update({...page.current,...search.current});
  };

  return [result,params=>update({...page.current,...search.current,...params}),pageChange,searchList];
};

export default useHandleList;


