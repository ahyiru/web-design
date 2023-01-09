import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
const GlobalSearch = props => {
  const onChange = value => {
    console.log(value);
  };
  return (
    <span className="link global-search">
      <Input placeholder="search..." suffix={<SearchOutlined />} onChange={onChange} />
    </span>
  );
};

export default GlobalSearch;
