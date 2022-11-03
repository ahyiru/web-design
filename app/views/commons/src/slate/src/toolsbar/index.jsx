import {forwardRef} from 'react';
import MarkIcon from './markIcon';

import {formats, editorI18n} from '../../configs';

const Index = ({className, ...rest}, ref) => {
  return (
    <div {...rest} ref={ref} className={`tools-bar ${className || ''}`}>
      {formats.map(item => (
        <MarkIcon key={item.format} {...item} name={editorI18n[item.format] || item.name} />
      ))}
    </div>
  );
};

export default forwardRef(Index);
