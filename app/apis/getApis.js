import fetcher from './fetcher';
import {defProject} from '@app/configs';

export const getApis = () => fetcher({url: '/apis/list', params: {projectId: defProject?.id, current: 1, size: 200}});
