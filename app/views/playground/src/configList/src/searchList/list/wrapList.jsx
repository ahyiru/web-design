import {useEffect, useRef} from 'react';
import {List} from 'react-window';
import {InfiniteLoader} from 'react-window-infinite-loader';

const DefRenderRow = ({index, style, totalList, isRowLoaded}) =>
  <div style={{...style, borderBottom: '1px solid #333'}}>
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
      {isRowLoaded(index) ? totalList[index]?.name : 'Loading...'}
    </div>
  </div>;

const Index = props => {
  const {result, pageChange, RenderItem, rowHeight = 45, paramsKey, width = '100%', height = 500, threshold = 5} = props;
  const {pending, data} = result;
  const {list = [], total = 1, size = 10, current = 1} = data || {};

  const handlePageChange = (start, end) => {
    if (pending) {
      return;
    }
    const current = ~~((end + 1) / size);
    pageChange?.(current, size);
  };

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToRow({
        index: 0,
      });
    }
    tempList.current = {};
  }, [paramsKey]);

  const tempList = useRef({
    [current]: list,
  });
  if (!pending) {
    tempList.current[current] = list;
  }
  const totalList = [];
  Object.keys(tempList.current).map(key => totalList.push(...tempList.current[key]));

  const len = totalList.length;
  const hasNextPage = len < total;
  const rowCount = hasNextPage ? len + size : len;
  const isRowLoaded = index => !hasNextPage || index < len;

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} rowCount={rowCount} loadMoreRows={handlePageChange} threshold={threshold}>
      {({onRowsRendered}) => (
        <List
          rowKey={key => `${paramsKey}_${key}`}
          listRef={listRef}
          style={{width, height}}
          className="virtual-list"
          rowHeight={rowHeight}
          rowCount={rowCount}
          onRowsRendered={onRowsRendered}
          rowComponent={typeof RenderItem === 'function' ? RenderItem : DefRenderRow}
          rowProps={{totalList, isRowLoaded}}
        />
      )}
    </InfiniteLoader>
  );
};

export default Index;
