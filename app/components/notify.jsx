import {Badge} from 'antd';
import {BellOutlined} from '@ant-design/icons';

const Notify = props => {
  return (
    <a className="notify-item" title="notify">
      <span className="node-icon">
        <Badge count={~~(Math.random() * 10)} size="small">
          <BellOutlined />
        </Badge>
      </span>
    </a>
  );
};

export default Notify;
