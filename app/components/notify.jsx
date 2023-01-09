import {useState, useEffect} from 'react';
import {Badge} from 'antd';
import {BellOutlined} from '@ant-design/icons';
import {useRoute} from '@huxy/router';
import {useStore} from '@huxy/use';

import {apiList} from '@app/views/playground/src/messages/configs';

const Notify = props => {
  const {router} = useRoute();
  const [, , subscribe] = useStore('huxy-notify', []);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getMes = async () => {
      const {result} = await apiList.listMessage({current: 1, size: 1000});
      const mes = (result?.list ?? []).filter(item => item.active == 0);
      setCount(mes.length);
    };
    const cancelSub = subscribe(result => {
      const mes = (result ?? []).filter(item => item.active == 0);
      setCount(mes.length);
    });
    getMes();
    return cancelSub;
  }, []);
  const handleClick = e => {
    router.push({
      path: '/playground/messages',
      state: {tab: 0},
    });
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
