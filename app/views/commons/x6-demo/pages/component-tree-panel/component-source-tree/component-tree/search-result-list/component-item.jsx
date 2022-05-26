import { useRef } from 'react';
import { Popover, Tag, Tooltip } from 'antd';
import { DatabaseFilled, ProfileTwoTone } from '@ant-design/icons';
import {marked} from 'marked';
import { useDrag } from 'react-dnd';
import { ItemName } from '@app/views/commons/x6-demo/component/item-name';
import { unescapeHTML } from '@app/views/commons/x6-demo/common/utils';
import { useSafeSetHTML } from '@app/views/commons/x6-demo/pages/common/hooks/useSafeSetHtml';
import { DRAGGABLE_ALGO_COMPONENT } from '@app/views/commons/x6-demo/constants/graph';
import styles from './component-item.less';
marked.setOptions({
  gfm: true,
  breaks: true,
});
const Markdown2html = (props) => {
  const { description, tag } = props;
  const descriptionElementRef = useRef(null);
  useSafeSetHTML(descriptionElementRef, marked(unescapeHTML(description).replace(/\\n/gi, ' \n ')));
  return (<div className={styles.componentDescription}>
    <div ref={descriptionElementRef} key="1"/>
    {tag ? (<div className={styles.tag} key="2">
      <span className={styles.label}> 标签: </span>
      {tag.split(',').map((str, idx) => (<Tag key={str + idx}>{str}</Tag>))}
    </div>) : null}
  </div>);
};
const renderSearchInfo = (params) => {
  const { id, name, catName, description = '暂无数据', tag } = params;
  return (<>
    {catName && (<span className={`${styles.catLable} gray`} key="catName">
      {catName}
    </span>)}

    <span className={styles.link} key="link">
      <a target="_blank" rel="noopener noreferrer" href={`https://pai.alipay.com/component/detail/${id}`}>
        <Tooltip title="查看文档">
          <ProfileTwoTone />
        </Tooltip>
      </a>
    </span>

    {description && (<Popover title={name} placement="right" content={<Markdown2html description={description} tag={tag}/>} key="description">
      <div className={`${styles.description} gray text-overflow`}>
        {description}
      </div>
    </Popover>)}
  </>);
};
const renderStatus = (params) => {
  const { changeType, isDeprecated, changeMessage } = params;
  const renderItems = [];
  if (changeType) {
    renderItems.push(<Popover content={<p className={styles.statusTips}>{changeMessage}</p>} key="changeType">
      <span className={`${styles.itemLable} ${styles.gre}`}>
        {changeType.toLowerCase()}
      </span>
    </Popover>);
  }
  if (isDeprecated) {
    renderItems.push(<span className={`${styles.itemLable} gray`} key="status">
        已废弃
    </span>);
  }
  return renderItems;
};
const InnerNodeTitle1 = ({data}) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DRAGGABLE_ALGO_COMPONENT,
    item: data,
  }));
  const { keyword, algoSourceType, name } = data;
  const cls=algoSourceType === 2?`${styles.nodeItem} ${styles.orange}`:styles.nodeItem;
  return (<div>
    {dragPreview(drag(<span className={cls}>
      <DatabaseFilled className={styles.nodeIcon}/>
      <ItemName data={{ name, keyword }}/>
    </span>))}
    {keyword ? renderSearchInfo(data) : renderStatus(data)}
  </div>);
};
/* const InnerNodeTitle = (props) => {
  const { data, connectDragPreview, connectDragSource } = props;
  const { keyword, algoSourceType, name } = data;
  const cls=algoSourceType === 2?`${styles.nodeItem} ${styles.orange}`:styles.nodeItem;
  return (<div>
    {connectDragPreview(connectDragSource(<span className={cls}>
      <DatabaseFilled className={styles.nodeIcon}/>
      <ItemName data={{ name, keyword }}/>
    </span>))}
    {keyword ? renderSearchInfo(data) : renderStatus(data)}
  </div>);
};
const NodeTitle = DragSource(DRAGGABLE_ALGO_COMPONENT, {
  beginDrag: (props) => ({
    component: props.data,
  }),
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(InnerNodeTitle); */
export const ComponentItem = ({ data = {} }) => {
  return <div className={styles.itemBlock}>{<InnerNodeTitle1 data={data}/>}</div>;
};
