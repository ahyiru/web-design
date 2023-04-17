import fetcher from '@app/apis/fetcher';

import report from './report';

const whiteCode = [401, 403, 429];
const whitePath = ['/report', '/auth'];

const fetch = props =>
  fetcher(props).catch(err => {
    const {url} = props;
    const isPermission = !whiteCode.includes(err.code);
    const authedPath = !whitePath.find(path => url.includes(`${path}/`));
    if (isPermission && authedPath) {
      report({actionType: 'fetchError', text: err.message, value: url});
    }
    throw Error(err.message);
  });

export default fetch;
