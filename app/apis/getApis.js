import fetcher from './fetcher';
import {defProject} from '@app/configs';

const getApis = () => fetcher({url: '/apis/list', params: {projectId: defProject?.id, current: 1, size: 300}});

const apis = (await getApis()).result?.list ?? [];

export default apis;
