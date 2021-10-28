import {Tooltip} from 'antd';
import {utils} from '@common';
import fixIcons from './fixIcons';
const tooltipIcon=icon=>{
  if(utils.isObject(icon)){
    return <Tooltip title={icon.label}>{fixIcons(icon.icon)}</Tooltip>;
  }
  return fixIcons(icon);
};

export default tooltipIcon;