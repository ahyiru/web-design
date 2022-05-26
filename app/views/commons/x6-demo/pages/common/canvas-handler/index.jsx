import { Popover } from 'antd';
import { CompressOutlined, OneToOneOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import styles from './index.less';
export const CanvasHandler = (props) => {
  const { className='', onZoomIn, onZoomOut, onFitContent, onRealContent } = props;
  return (<ul className={`${styles.handler} ${className}`}>
    <Popover overlayClassName={styles.popover} content="放大" placement="left">
      <li onClick={onZoomIn} className={styles.item}>
        <ZoomInOutlined />
      </li>
    </Popover>
    <Popover overlayClassName={styles.popover} content="缩小" placement="left">
      <li onClick={onZoomOut} className={styles.item}>
        <ZoomOutOutlined />
      </li>
    </Popover>
    <Popover overlayClassName={styles.popover} content="实际尺寸" placement="left">
      <li onClick={onRealContent} className={styles.item}>
        <OneToOneOutlined />
      </li>
    </Popover>
    <Popover overlayClassName={styles.popover} content="适应画布" placement="left">
      <li onClick={onFitContent} className={styles.item}>
        <CompressOutlined />
      </li>
    </Popover>
  </ul>);
};
