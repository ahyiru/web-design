import Ellipsis from '@app/components/ellipsis';

const defCols = () => ({render: text => <Ellipsis>{text}</Ellipsis>});

const getColumns = (columns, colsCfg, initCols = defCols()) => columns.map(col => ({...initCols, ...col, ...colsCfg?.find(({dataIndex}) => dataIndex === col.dataIndex)}));

export default getColumns;

export const RenderItem = ({index, style, item, isItemLoaded}) => {
  let content;
  if (!isItemLoaded(index)) {
    content = 'Loading...';
  } else {
    content = item.name;
  }
  return <div style={{...style, borderBottom: '1px solid #333'}}>
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>{content}</div>
  </div>;
};
