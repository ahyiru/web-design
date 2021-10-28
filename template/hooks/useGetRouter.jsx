import {useState,useEffect} from 'react';
import apiList from '@app/utils/getApis';
import formatRouter from '@app/utils/formatRouter';
const useGetRouter=()=>{
  const [routers,setRouters]=useState();
  useEffect(()=>{
    const getRouter=async ()=>{
      const {code,result}=await apiList.listRouterFn();
      if(code===200){
        setRouters(formatRouter(result||[]));
      }
    };
    getRouter();
  },[]);
  return [routers];
};

export default useGetRouter;