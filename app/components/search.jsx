import {useRef} from 'react';
import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const GlobalSearch = props => {
  const searchValue = useRef();
  const onSearch = e => {
    e.stopPropagation();
    console.log(searchValue.current);
  };
  return (
    <span className="link global-search">
      <Input
        placeholder="search..."
        suffix={<SearchOutlined onClick={onSearch} />}
        onChange={e => searchValue.current = e.target.value}
        onPressEnter={onSearch}
      />
    </span>
  );
};

export default GlobalSearch;
