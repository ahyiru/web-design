import fetcher from '@app/apis/report/fetchError';
import {dlApi, suspense} from '@app/apis/fetcher';
import getApis from '@app/apis/getApis';
import {allUserMock, allUserSuspenseMock} from '@app/apis/userMock';

const apiList = {
  allUserMock,
};

const suspenseApis = {
  allUserSuspenseMock,
};

const getSuspense = apis => {
  const susList = apis.filter(api => ['profile', 'allUser'].includes(api.name));
  susList.map(sus => {
    const {name, fnName, dataType, url, isDl, ...restApi} = sus;
    const fetchFn = isDl ? dlApi : suspense;
    const funcName = fnName ?? `${name}Suspense`;
    const paramsKey = dataType || restApi.method === 'post' ? 'data' : 'params';
    suspenseApis[funcName] = (data, ...rest) => fetchFn({...restApi, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data, ...rest});
  });
};

export {suspenseApis};

const getList = async () => {
  const {result} = await getApis();
  return result?.list ?? [];
};

export const getApiFn = async () => {
  let apis = [];
  try {
    apis = await getList();
  } catch (err) {}
  apis.map(api => {
    const {name, fnName, dataType, url, isDl, ...restApi} = api;
    const fetchFn = isDl ? dlApi : fetcher;
    const funcName = fnName ?? `${name}Fn`;
    const paramsKey = dataType || (restApi.method === 'post' ? 'data' : 'params');
    apiList[funcName] = (data, ...rest) => fetchFn({...restApi, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data, ...rest});
  });
  getSuspense(apis);
  return apiList;
};

export default apiList;
