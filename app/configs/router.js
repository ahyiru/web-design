import {demoBackReg, confirmDesignPage} from '@app/utils/confirmDesignPage';

import whiteList from '@app/routes/whiteList';

import {isAuthed} from '@app/utils/utils';

import {browserRouter, basepath} from '.';

const initPath = `${browserRouter ? '' : '#'}/`;

const whiteRoutes = browserRouter ? whiteList : whiteList.map(path => `#${path}`);

const routerListen = {};

const routerListenFn = (path, prevPath) => {
  if (!routerListen[path]) {
    routerListen[path] = {};
  }
  let delay = 0;
  if (!prevPath) {
    routerListen[path].start = new Date();
  } else {
    if (!routerListen[prevPath]) {
      routerListen[prevPath] = {};
    }
    routerListen[path].start = routerListen[prevPath].end = new Date();
    delay = routerListen[prevPath].end - routerListen[prevPath].start;
  }
  console.log(`${prevPath || '初始化'}页面停留时间：`, delay, routerListen);
};

const beforeRender = (input, next) => {
  const {path, prevPath} = input;
  const validPath = path.split('?')[0];
  if (validPath === initPath) {
    return next({path: '/'});
  }
  if (!isAuthed() && !whiteRoutes.includes(validPath)) {
    return next({path: '/user/signin'});
  }
  if (path !== prevPath && demoBackReg.test(prevPath)) {
    // designReg
    return confirmDesignPage(next);
  }
  next();
  // routerListenFn(path,prevPath);
};

export default {
  browserRouter,
  beforeRender,
  basepath,
  // afterRender,
};
