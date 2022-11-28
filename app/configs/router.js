import {demoBackReg, confirmDesignPage} from '@app/utils/confirmDesignPage';

import whiteList from '@app/routes/whiteList';

import {isAuthed} from '@app/utils/utils';

import {browserRouter, basepath} from '.';

import errorBoundary from '@app/apis/report/pageError';
import routeReport from '@app/apis/report/routeChange';

const initPath = `${browserRouter ? '' : '#'}/`;

const whiteRoutes = browserRouter ? whiteList : whiteList.map(path => `#${path}`);

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
};

let listenRouteInit = false;

const afterRender = output => {
  const {path, name, stay} = output;
  let firstLoadTime;
  if (!listenRouteInit) {
    firstLoadTime = stay;
    listenRouteInit = true;
  }
  if (!path.includes('/user/')) {
    routeReport({path, name, firstLoadTime});
  }
};

export default {
  browserRouter,
  beforeRender,
  basepath,
  errorBoundary,
  afterRender,
};
