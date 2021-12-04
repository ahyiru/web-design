// import {utils} from '@common';
import fetcher,{suspense} from '@app/apis/fetcher';
import getApis from '@app/apis/getApis';

const apiList={};

const suspenseApis={};

const getSuspense=apis=>{
  const susList=apis.filter(api=>['profile','allUser'].includes(api.name));
  susList.map(sus=>{
    const {name,type,...rest}=sus;
    const funcName=`${name}Suspense`;
    const paramsKey=type||rest.method==='post'?'data':'params';
    suspenseApis[funcName]=data=>suspense({...rest,[paramsKey]:data});
  });
};

export const getList=async ()=>{
  const {result}=await getApis();
  return result?.list??[];
};

export const getApiFn=async ()=>{
  const apis=await getList();
  apis.map(api=>{
    const {name,type,...rest}=api;
    const funcName=`${name}Fn`;
    const paramsKey=type||(rest.method==='post'?'data':'params');
    apiList[funcName]=data=>fetcher({...rest,[paramsKey]:data});
  });
  getSuspense(apis);
  return apiList;
};

export {suspenseApis};

export default apiList;