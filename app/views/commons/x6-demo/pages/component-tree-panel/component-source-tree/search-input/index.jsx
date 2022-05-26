import { useState } from 'react';
import { Input } from 'antd';
import { useDebounce } from '@huxy/use';
import useModel from '@app/views/commons/x6-demo/models';
import styles from './index.less';
const { Search } = Input;
export const SearchInput = () => {
  const [value, setValue] = useState('');
  const { search, setKeyword } = useModel('guide-algo-component');
  const onDebouncedSearch = useDebounce((v) => {
    if (!v) {
      return;
    }
    search({ keyword: v });
  }, 500);
  return (<div className={styles.searchInput}>
    <Search className={styles.input} placeholder="请输入组件名称或描述" value={value} allowClear={true} onChange={(e) => {
      const v = e.target.value;
      if (!v) {
        setKeyword('');
      }
      setValue(v);
    }} onSearch={onDebouncedSearch}/>
  </div>);
};
