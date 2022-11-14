import {uuidv4} from '@huxy/utils';

import report from './report';

let prevUuid = null;

window.addEventListener('beforeunload', e => {
  const isLogin = e.target.location.pathname.indexOf('/user/') === 0 || e.target.location.hash.indexOf('#/user/') === 0;
  if (!isLogin) {
    report({actionType: 'close', prevUuid});
  }
}, false);

const routeReport = () => {
  const uuid = uuidv4();
  report({actionType: 'routeChange', uuid, prevUuid});
  prevUuid = uuid;
};

export default routeReport;