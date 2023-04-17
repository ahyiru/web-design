import {Table as AntTable} from 'antd';

import {tableCfg} from '@app/utils/configs';

const Table = ({style, ...rest}) => (
  <div style={{height: style?.height ?? 300, overflow: 'auto'}}>
    <AntTable {...rest} {...tableCfg} />
  </div>
);

export default Table;
