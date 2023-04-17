import {Button} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import DateSelect from './datePicker';
const btnStyls = {
  height: '100%',
  lineHeight: '100%',
  marginLeft: '10px',
};
const TopRight = props => {
  return (
    <div style={{display: 'flex', height: '100%'}}>
      <DateSelect />
      <Button type="primary" style={btnStyls} icon={<FilterOutlined />}>
        Filter
      </Button>
    </div>
  );
};

export default TopRight;
