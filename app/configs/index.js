import {utils} from '@common';

import whiteList from '../router/whiteList';

const {storage}=utils;

export const browserRouter=!process.env.isDev;

const {DEV_ROOT_DIR,PRD_ROOT_DIR}=require('@configs');

export const basepath=browserRouter?PRD_ROOT_DIR:DEV_ROOT_DIR;

const initPath=`${browserRouter?'':'#'}/`;

const whiteRouters=browserRouter?whiteList:whiteList.map(path=>`#${path}`);

const routerListen={};

const routerListenFn=(path,prevPath)=>{
  if(!routerListen[path]){
    routerListen[path]={};
  }
  let delay=0;
  if(!prevPath){
    routerListen[path].start=new Date();
  }else{
    if(!routerListen[prevPath]){
      routerListen[prevPath]={};
    }
    routerListen[path].start=routerListen[prevPath].end=new Date();
    delay=routerListen[prevPath].end-routerListen[prevPath].start;
  }
  console.log(`${prevPath||'初始化'}页面停留时间：`,delay,routerListen);
};

const beforeRender=input=>{
  const token=storage.get('token');
  const {path,prevPath}=input;
  const validPath=path.split('?')[0];
  if(validPath===initPath){
    return {path:'/'};
  }
  if(!token&&!whiteRouters.includes(validPath)){
    return {path:'/user/signin'};
  }

  // routerListenFn(path,prevPath);
};

export default {
  browserRouter,
  beforeRender,
  basepath,
  // afterRender,
  // store:createStore(),
};



