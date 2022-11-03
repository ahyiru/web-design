import {SearchInput} from './search-input';
import {ComponentTree} from './component-tree';
import styles from './index.less';
export const ComponentSourceTree = props => {
  const {className = ''} = props;
  return (
    <div className={`${styles.componentSourceTree} ${className}`}>
      <div className={styles.component}>
        <SearchInput />
        <ComponentTree />
      </div>
      <div className={styles.links} />
    </div>
  );
};
