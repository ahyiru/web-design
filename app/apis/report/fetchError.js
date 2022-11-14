import fetcher from '@app/apis/fetcher';

import report from './report';

const fetch = props => fetcher(props).catch(err => {
  const {url} = props;
  if (!url.includes('/report/') && !url.includes('/auth/')) {
    report({actionType: 'fetchError', text: err.message, value: url});
  }
  throw err.message;
});

export default fetch;
