import formatTree from './formatTree';

import getComponent from './getComponent';

const formatRouter = (arr) => formatTree(arr.map((item) => getComponent(item)));

export default formatRouter;
