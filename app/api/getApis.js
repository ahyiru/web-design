import fetcher from './fetcher';
import defProject from '@app/configs/projects';
const getApis=()=>fetcher({url:'/api/list',params:{projectId:defProject._id,current:1,size:1000}});

export default getApis;

