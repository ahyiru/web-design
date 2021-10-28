import {useState,useEffect} from 'react';
import getI18n from '@app/utils/getI18n';

const useGetI18ns=()=>{
  const [i18ns,setI18ns]=useState(null);
  useEffect(()=>{
    const loadI18n=async ()=>{
      const i18ns=await getI18n();
      setI18ns(i18ns);
    };
    loadI18n();
  },[]);
  return [i18ns];
};

export default useGetI18ns;

