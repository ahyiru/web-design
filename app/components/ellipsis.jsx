import {Tooltip} from 'antd';
import {Ellipsis} from '@huxy/components';

const Index = ({children, ...rest}) => {
  return <Ellipsis {...rest}>
    <Tooltip placement="topLeft" title={children}>
      {children}
    </Tooltip>
  </Ellipsis>;
};

export default Index;