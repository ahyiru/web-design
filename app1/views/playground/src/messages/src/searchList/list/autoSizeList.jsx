import AutoSizer from 'react-virtualized-auto-sizer';
import WrapList from './wrapList';

const AutoSizeList = props => (
  <div style={{width: '100%', minHeight: '50vh'}}>
    <AutoSizer>{({height, width}) => <WrapList {...props} height={height} width={width} />}</AutoSizer>
  </div>
);

export default AutoSizeList;
