import fetcher from './fetcher';
import {defProject} from '@app/configs';

export const getApis = () => fetcher({url: '/apis/listAll', params: {projectId: defProject?.id}});
