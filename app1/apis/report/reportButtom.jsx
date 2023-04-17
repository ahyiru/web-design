import {Button} from 'antd';

import report from './report';

const ReportButton = props => {
  const {value, label, text, description, onClick, ...rest} = props;
  const handleClick = e => {
    report({
      text: text || props.children,
      value,
      label,
      description,
      type: 'click',
    });
    onClick?.(e);
  };
  return <Button {...rest} onClick={handleClick} />;
};

export default ReportButton;
