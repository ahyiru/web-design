import {TextMasked} from '@huxy/materials';
import {useTime} from '@huxy/use';

const Timer = props => {
  const [time] = useTime();
  return <b>{time}</b>;
};

const Timebar = props => {
  return (
    <div style={{position: 'absolute', top: 0, right: 0, padding: '12px'}}>
      <TextMasked>
        <Timer />
      </TextMasked>
    </div>
  );
};

export default Timebar;
