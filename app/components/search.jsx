import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
const GlobalSearch = props => {
  const onChange = value => {
    console.log(value);
  };
  return (
    <a className="global-search">
      <Input placeholder="search..." suffix={<SearchOutlined />} onChange={onChange} />
    </a>
  );
};

export default GlobalSearch;
