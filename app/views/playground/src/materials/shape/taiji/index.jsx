import {useState} from 'react';

import {Taiji} from '@huxy/materials';

import './index.less';

const containerStyle = {
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Index = props => {
  const [value, setValue] = useState(1);
  return (
    <div>
      <div style={containerStyle}>
        <Taiji className="huxy-circle-animate-rotate" style={{'--rotate': `${value * 360 + 90}deg`}} />
      </div>
      <div style={{padding: '20px 0', textAlign: 'center'}}>
        <input type="number" min="1" max="360" value={value} onChange={e => setValue(e.target.value)} /> turn
      </div>
    </div>
  );
};

export default Index;
