import {useRef, useEffect} from 'react';
import {FixedSizeList as List} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

const Index = props => {
  const {result, pageChange, RenderItem, itemSize = 45, paramsKey, width = '100%', height = 600} = props;
  const {isPending, data} = result;
  const {list = [], total = 1, size = 10, current = 1} = data || {};

  const handlePageChange = (start, end) => {
    if (isPending) {
      return;
    }
    const current = ~~((end + 1) / size);
    pageChange?.(current, size);
  };

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetloadMoreItemsCache?.();
      listRef.current._listRef?.scrollTo(0);
    }
    tempList.current = {};
  }, [paramsKey]);

  const tempList = useRef({
    [current]: list,
  });
  if (!isPending) {
    tempList.current[current] = list;
  }
  const totalList = [];
  Object.keys(tempList.current).map(key => totalList.push(...tempList.current[key]));

  const len = totalList.length;
  const hasNextPage = len < total;
  const itemCount = hasNextPage ? len + size : len;
  const isItemLoaded = index => !hasNextPage || index < len;

  return (
    <InfiniteLoader ref={listRef} isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={handlePageChange}>
      {({onItemsRendered, ref}) => (
        <List height={height} width={width} className="virtual-list" ref={ref} itemSize={itemSize} itemCount={itemCount} onItemsRendered={onItemsRendered}>
          {({index, style}) => (typeof RenderItem === 'function' ? RenderItem({index, style, item: totalList[index], isItemLoaded}) : `${index}-${totalList[index].name}`)}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default Index;
