import fetcher, {dlApi, suspense} from '@app/apis/fetcher';
import getApis from '@app/apis/getApis';

const apiList = {};

const suspenseApis = {};

const getSuspense = (apis) => {
  const susList = apis.filter((api) => ['profile', 'allUser'].includes(api.name));
  susList.map((sus) => {
    const {name, fnName, type, url, isDl, ...rest} = sus;
    const fetchFn = isDl ? dlApi : suspense;
    const funcName = fnName ?? `${name}Suspense`;
    const paramsKey = type || rest.method === 'post' ? 'data' : 'params';
    suspenseApis[funcName] = (data) => fetchFn({...rest, url: typeof url==='function' ? url(data) : url, [paramsKey]: data});
  });
};

/* const {userApis,routerApis,authApis,layoutApis,projectApis,handleApis,pageApis}=require('@configs/apis');
export const getList1=async ()=>{
  return [...userApis,...routerApis,...authApis,...layoutApis,...projectApis,...handleApis,...pageApis];
}; */

export const getList = async () => {
  const {result} = await getApis();
  return result?.list ?? [];
};

export const getApiFn = async () => {
  let apis = [];
  try{
    apis = await getList();
  }catch(err){}
  apis.map((api) => {
    const {name, fnName, type, url, isDl, ...rest} = api;
    const fetchFn = isDl ? dlApi : fetcher;
    const funcName = fnName ?? `${name}Fn`;
    const paramsKey = type || (rest.method === 'post' ? 'data' : 'params');
    apiList[funcName] = (data) => fetchFn({...rest, url: typeof url==='function' ? url(data) : url, [paramsKey]: data});
  });
  getSuspense(apis);
  return apiList;
};

export {suspenseApis};

export default apiList;
