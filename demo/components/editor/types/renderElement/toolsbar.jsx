import {forwardRef} from 'react';
import MarkIcon from './markIcon';
import formats from '../formats';
import './index.less';
const Index=({className,...rest},ref)=>{
  return <div {...rest} ref={ref} className={`tools-bar ${className||''}`}>
    {
      formats.map(item=><MarkIcon key={item.format} {...item} />)
    }
  </div>;
};

export default forwardRef(Index);