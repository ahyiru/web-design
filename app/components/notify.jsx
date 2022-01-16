import {Badge} from 'antd';
import {BellOutlined} from '@ant-design/icons';

const Notify = (props) => {
  return (
    <a className="notify-item">
      <Badge count={~~(Math.random() * 10)} size="small">
        <BellOutlined />
      </Badge>
    </a>
  );
};

export default Notify;
