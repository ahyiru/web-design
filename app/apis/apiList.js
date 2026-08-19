import fetcher from '@app/apis/report/fetchError';
import {dlApi, suspense} from '@app/apis/fetcher';
import {allUserMock, allUserSuspenseMock} from '@app/apis/userMock';
import {getApis} from '@app/apis/getApis';

const apiList = {
  allUserMock,
};

const suspenseList = {
  allUserSuspenseMock,
};

const getSuspense = apis => {
  const susList = apis.filter(api => ['profile', 'allUser'].includes(api.name));
  susList.map(sus => {
    const {name, fnName, dataType, url, isDl, ...restApi} = sus;
    const fetchFn = isDl ? dlApi : suspense;
    const funcName = fnName ?? `${name}Suspense`;
    const paramsKey = dataType || restApi.method === 'post' ? 'data' : 'params';
    suspenseList[funcName] = (data, ...rest) => fetchFn({...restApi, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data, ...rest});
  });
  return suspenseList;
};

export const getApiFn = async () => {
  let apis = [];
  try {
    apis = (await getApis()).result?.list ?? [];
  } catch (err) {
    console.error(err.message);
  }
  apis.map(api => {
    const {name, fnName, dataType, url, isDl, ...restApi} = api;
    const fetchFn = isDl ? dlApi : fetcher;
    const funcName = fnName ?? `${name}Fn`;
    const paramsKey = dataType || (restApi.method === 'post' ? 'data' : 'params');
    apiList[funcName] = (data, ...rest) => fetchFn({...restApi, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data, ...rest});
  });
  getSuspense(apis);
  return {apis: apiList, suspenseApis: suspenseList};
};
