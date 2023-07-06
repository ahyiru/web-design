import {useEffect} from 'react';
import {Badge} from 'antd';
import {BellOutlined} from '@ant-design/icons';
import {useRoute} from '@huxy/router';
import apiList from '@app/apis/apiList';
import {useNotifyStore} from '@app/store/stores';

const Notify = props => {
  const {router} = useRoute();
  const [count, setCount] = useNotifyStore();
  useEffect(() => {
    const getMes = async () => {
      const {result} = await apiList.listMessageFn({current: 1, size: 100, status: 0});
      setCount(result.total);
    };
    getMes();
  }, []);
  const handleClick = e => {
    router.push('/messages');
  };
  return (
    <span className="link notify-item" title="notify" onClick={handleClick}>
      <span className="node-icon">
        <Badge count={count} size="small">
          <BellOutlined />
        </Badge>
      </span>
    </span>
  );
};

export default Notify;
