import {useCallback, useState, useRef} from 'react';
import {Link} from '@huxy/router';
import {unescapeHTML} from '@huxy/utils';
import {Popover, Tag} from 'antd';
import {useDrag} from 'react-dnd';
import {DatabaseFilled, ReadOutlined} from '@ant-design/icons';
import {marked} from 'marked';
import {useSafeSetHTML} from '../../../../common/hooks/useSafeSetHtml';
import {DRAGGABLE_ALGO_COMPONENT} from '../../../../../constants/graph';
import styles from './node-title.less';
marked.setOptions({
  gfm: true,
  breaks: true,
});
const Document = props => {
  const {node} = props;
  const descriptionNodeRef = useRef(null);
  const {description, id, tag = ''} = node;
  const htmlStr = marked(unescapeHTML(description || '暂无文档').replace(/\\n/gi, ' \n '));
  useSafeSetHTML(descriptionNodeRef, htmlStr);
  return (
    <div className={styles.popover}>
      {tag ? (
        <div className={styles.tag}>
          <span className={styles.label}> 标签: </span>
          {tag.split(',').map(str => (
            <Tag key={str}>{str}</Tag>
          ))}
        </div>
      ) : null}
      <div className={styles.description}>
        <div ref={descriptionNodeRef} />
        <div className={styles.doclink}>
          <Link to={`/x6-demo/${id}`} target="_blank" rel="noopener noreferrer">
            查看更多
          </Link>
        </div>
      </div>
    </div>
  );
};

export const NodeTitle = ({node = {}, searchKey = ''}) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DRAGGABLE_ALGO_COMPONENT,
    item: node,
  }));
  const {name = '', isDir} = node;
  const [open, setOpen] = useState(false);
  const onMouseIn = useCallback(() => {
    setOpen(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setOpen(false);
  }, []);
  if (isDir) {
    return <div className={styles.folder}>{name}</div>;
  }
  const keywordIdx = searchKey ? name.toLowerCase().indexOf(searchKey.toLowerCase()) : -1;
  if (keywordIdx > -1) {
    const beforeStr = name.substr(0, keywordIdx);
    const afterStr = name.substr(keywordIdx + searchKey.length);
    return dragPreview(
      drag(
        <span className={styles.node}>
          <DatabaseFilled className={styles.nodeIcon} />
          <span className={styles.label}>
            {beforeStr}
            <span className={styles.keyword}>{searchKey}</span>
            {afterStr}
          </span>
        </span>,
      ),
    );
  }
  return (
    <div className={styles.nodeTitleWrapper} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
      {dragPreview(
        drag(
          <div className={styles.node}>
            <DatabaseFilled className={styles.nodeIcon} />
            <span className={styles.label}>{name}</span>
          </div>,
        ),
      )}
      {open && (
        <Popover open={true} title={name} placement="right" content={<Document node={node} />} key="description">
          <a className={styles.doc}>
            <ReadOutlined /> 文档
          </a>
        </Popover>
      )}
    </div>
  );
};
