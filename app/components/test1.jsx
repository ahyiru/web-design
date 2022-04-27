import {useState, useEffect, useRef} from 'react';
import {Row,Col} from '@huxy/components';

const TimeBar = ({lastTime, lastText}) => {
  const timeRef = useRef();
  const [leaveTime, setLeaveTime] = useState('');
  useEffect(() => {
    const getLeaveTime = () => {
      setInterval(() => {
        let time = lastTime - new Date();
        const d = ~~(time / (1000 * 60 * 60 * 24));
        time -= 1000 * 60 * 60 * 24 * d;
        const h = ~~(time / (1000 * 60 * 60));
        time -= 1000 * 60 * 60 * h;
        const M = ~~(time / (1000 * 60));
        time -= 1000 * 60 * M;
        const s = ~~(time / 1000);
        timeRef.current = setLeaveTime(`${d}天${h}小时${M}分${s}秒`);
      }, 1000);
    };
    getLeaveTime();
    return () => clearInterval(timeRef);
  }, []);
  return (
    <Row>
      <Col>
        <span>距离：</span>
        <span style={{color: 'red'}}>{lastText}</span>
        <span> 还有 </span>
        <span style={{color: 'blue'}}>{leaveTime}</span>
      </Col>
    </Row>
  );
};

export default TimeBar;
