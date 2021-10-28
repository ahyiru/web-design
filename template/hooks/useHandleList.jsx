import {useRef} from 'react';
import useFetchList from './useFetchList';

const useHandleList=(fetchList,commonParams=null,initParams=null)=>{
  const {current,size,...rest}=initParams||{};
  const search=useRef(rest||{});
  const page=useRef({current:current||1,size:size||10});
  const [result,update]=useFetchList(fetchList,commonParams,{...page.current,...search.current});

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

