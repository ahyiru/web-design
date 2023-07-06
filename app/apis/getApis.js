import fetcher from './fetcher';
import {defProject} from '@app/configs';

/* const apiList = projectId => [
  {
    name: 'login',
    url: '/auth/login',
    method: 'post',
  },
  {
    name: 'logout',
    url: '/auth/logout',
  },
  {
    name: 'signup',
    url: '/auth/signup',
    method: 'post',
  },
  {
    name: 'profile',
    url: '/users/profile',
    method: 'get',
  },
  {
    name: 'allUser',
    url: '/users/allUser',
  },
]; */

const getApis = () => fetcher({url: '/api/list', params: {projectId: defProject?._id, current: 1, size: 100}});

export default getApis;
