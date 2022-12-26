import fetcher from '@app/apis/fetcher';

import report from './report';

const fetch = props => fetcher(props).catch(err => {
  const {url} = props;
  const isPermission = err.code != 401 && err.code != 403 && err.code != 429;
  const authedPath = !url.includes('/report/') && !url.includes('/auth/');
  if (isPermission && authedPath) {
    report({actionType: 'fetchError', text: err.message, value: url});
  }
  throw err.message;
});

export default fetch;
