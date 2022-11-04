import {Time, Search, Location, Loading, Spot} from '@huxy/materials';

import Taiji from './taiji';
import Bagua from './taiji/bagua';

const box = {
  position: 'relative',
  margin: '20px auto',
  background: 'rgba(0, 0, 0, 0.1)',
  padding: '25px',
  width: '320px',
  textAlign: 'center',
};

const Index = props => {
  return (
    <div>
      <div style={box}>
        <Time />
      </div>
      <div style={box}>
        <Search />
      </div>
      <div style={box}>
        <Location />
      </div>
      <div style={box}>
        <Loading size="32px" />
      </div>
      <div style={box}>
        <Spot />
      </div>
      <div style={box}>
        <Spot type="scale" />
      </div>
      <div style={box}>
        <Taiji />
      </div>
      <div style={box}>
        <Bagua />
      </div>
    </div>
  );
};

export default Index;
