import {HandleError} from '@huxy/components';

import report from './report';

const pageError = ({error}) => {
  const errStack = error?.message?.slice(0, 120).split('. ').slice(0, 2).join('. ');
  report({actionType: 'pageError', text: errStack});
};

const errorBoundary = props => <HandleError {...props} report={pageError} />;

export default errorBoundary;