import {useState} from 'react';
import {ComponentSourceTree} from './component-source-tree';
import styles from './index.less';
export const ComponentTreePanel = (props) => {
  const {className = ''} = props;
  const [activeTab, setActiveTab] = useState('component');
  const tabCls = activeTab === 'component' ? `${styles.tab} ${styles.active}` : styles.tab;
  return (
    <div className={`${className} ${styles.nodeSourceTreeContainer}`}>
      <div className={styles.tabWrapper}>
        <div
          className={tabCls}
          onClick={() => {
            setActiveTab('component');
          }}
        >
          组件库
        </div>
      </div>
      <div className={styles.tabContentWrapper}>
        <ComponentSourceTree className={activeTab !== 'component' ? styles.hide : ''} />
      </div>
    </div>
  );
};
