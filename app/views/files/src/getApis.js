import fetcher from '@app/apis/fetcher';
import report from '@app/apis/report/report';
import apis from './apis';

const getApis = () => {
  const apiList = {};
  apis.map(api => {
    const {name, fnName, dataType, url, ...rest} = api;
    const funcName = fnName ?? `${name}Fn`;
    const paramsKey = dataType || (rest.method === 'post' ? 'data' : 'params');
    apiList[funcName] = data => {
      report({
        actionType: 'filesystem',
        category: 'filesystem',
        text: 'action',
        value: name,
      });
      return fetcher({...rest, url: typeof url === 'function' ? url(data) : url, [paramsKey]: data, prefix: 'filesystem'});
    };
  });
  return apiList;
};

export default getApis();
