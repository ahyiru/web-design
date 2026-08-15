import Ellipsis from '@app/components/ellipsis';

const defCols = () => ({render: text => <Ellipsis>{text}</Ellipsis>});

const getColumns = (columns, colsCfg, initCols = defCols()) => columns.map(col => ({...initCols, ...col, ...colsCfg?.find(({dataIndex}) => dataIndex === col.dataIndex)}));

export default getColumns;

export const RenderRow = ({index, style, totalList, isRowLoaded}) =>
  <div style={{...style, borderBottom: '1px solid #333'}}>
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
      {isRowLoaded(index) ? totalList[index]?.name : 'Loading...'}
    </div>
  </div>;
