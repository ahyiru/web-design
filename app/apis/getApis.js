import fetcher from './fetcher';
import {defProject} from '@app/configs';

const getApis = () => fetcher({url: '/apis/list', params: {projectId: defProject?.id, current: 1, size: 300}});

let apis = [];
try {
  apis = (await getApis()).result?.list ?? [];
} catch (err) {
  console.error(err.message);
}

export default apis;
