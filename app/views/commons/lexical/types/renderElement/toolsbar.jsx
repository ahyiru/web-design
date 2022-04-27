import {forwardRef} from 'react';
import MarkIcon from './markIcon';
import formats from '../formats';
import './index.less';
const Index = ({className, i18nCfg, ...rest}, ref) => {
  return (
    <div {...rest} ref={ref} className={`tools-bar ${className || ''}`}>
      {formats.map((item) => (
        <MarkIcon key={item.format} {...item} name={i18nCfg[item.format] || item.name} />
      ))}
    </div>
  );
};

export default forwardRef(Index);
