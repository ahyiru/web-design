import {useEffect} from 'react';
import useModel from '@app/views/commons/x6-demo/models';
import {useFirstMounted} from '@huxy/use';
import {CategoryTree} from './category-tree';
import {SearchResultList} from './search-result-list';
import styles from './index.less';
export const ComponentTree = () => {
  const {keyword, loadComponentNodes} = useModel('guide-algo-component');
  const isFirst = useFirstMounted();
  useEffect(() => {
    if (isFirst) {
      loadComponentNodes();
    }
  }, []);
  return <div className={styles.componentTree}>{keyword ? <SearchResultList /> : <CategoryTree />}</div>;
};
