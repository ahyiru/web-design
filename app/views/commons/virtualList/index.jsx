import {FixedSizeList as List} from 'react-window';
import './index.less';

const Row = ({index, style}) => (
  <div className={index % 2 ? 'odd-item' : 'even-item'} style={style}>
    Row {index}
  </div>
);

const VertList = () => (
  <List className="list" height={150} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);

const Column = ({index, style}) => (
  <div className={index % 2 ? 'odd-item' : 'even-item'} style={style}>
    Column {index}
  </div>
);

const HoriList = () => (
  <List className="list" height={75} itemCount={1000} itemSize={100} layout="horizontal" width={300}>
    {Column}
  </List>
);

const VirtualList = (props) => {
  return (
    <div className="virtual-list">
      <div>
        <h4>纵向列表</h4>
        <VertList />
      </div>
      <div>
        <h4>水平列表</h4>
        <HoriList />
      </div>
    </div>
  );
};

export default VirtualList;
