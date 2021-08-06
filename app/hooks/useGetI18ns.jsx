import {useState,useEffect} from 'react';
import {getApiFn} from '@app/utils/getApis';
import getI18n from '@app/utils/getI18n';

const useGetI18ns=()=>{
  const [i18ns,setI18ns]=useState(null);
  useEffect(()=>{
    const loadApis=async i18ns=>{
      try{
        const apis=await getApiFn();
        setI18ns(i18ns);
      }catch(err){
        setI18ns(null);
      }
    };
    const loadI18n=async ()=>{
      const i18ns=await getI18n();
      loadApis(i18ns);
    };
    loadI18n();
  },[]);
  return [i18ns];
};

export default useGetI18ns;

