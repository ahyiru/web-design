import {useCallback,useEffect} from 'react';
import {use} from '@common';
const {useAsync}=use;
const useFetchList=(fetchList,commonParams=null,initParams=null)=>{
  const [result,updateResult]=useAsync({});
  const update=useCallback(params=>updateResult({res:fetchList({...params,...commonParams})}),[]);
  useEffect(()=>{
    update({...initParams});
  },[]);
  const {res}=result;
  const isPending=!res||res.pending;

  return [{isPending,data:res?.result},update];
};

export default useFetchList;

