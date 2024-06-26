import {useRef} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import Input from '@app/components/base/input';

const GlobalSearch = props => {
  const searchValue = useRef();
  const onSearch = e => {
    e.stopPropagation();
    console.log(searchValue.current);
  };
  return (
    <div className="suffix-input">
      <Input
        placeholder="search..."
        // suffix={<SearchOutlined onClick={onSearch} />}
        onChange={e => (searchValue.current = e.target.value)}
        onPressEnter={onSearch}
      />
      <SearchOutlined onClick={onSearch} className="suffix" />
    </div>
  );
};

export default GlobalSearch;
