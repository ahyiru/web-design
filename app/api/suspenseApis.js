// import {suspense} from './fetcher';
// const apis=require('@configs/apis/userApis');

const suspenseApis={};

// const list=['profile','allUser'];

/* apis.map(api=>{
  if(list.includes(api.name)){
    const {name,type,...rest}=api;
    const funcName=`${name}Suspense`;
    const paramsKey=type||rest.method==='post'?'data':'params';
    suspenseApis[funcName]=data=>suspense({...rest,[paramsKey]:data});
  }
}); */

export default suspenseApis;



