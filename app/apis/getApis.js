import fetcher from './fetcher';
import {defProject} from '@app/configs';

const getApis = () => fetcher({url: '/api/list', params: {projectId: defProject?._id, current: 1, size: 100}});

export default getApis;
