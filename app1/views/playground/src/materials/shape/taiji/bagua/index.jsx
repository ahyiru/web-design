import {useState} from 'react';

import {Taiji} from '@huxy/materials';

import Gua from './gua';

const containerStyle = {
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Index = props => {
  const [rotate, setRotate] = useState(0);
  return (
    <div style={{height: '380px'}}>
      <div style={containerStyle}>
        <Gua width="24px" yaoProps={{height: '4px'}} rotate={rotate} />
        <Taiji width="60px" />
      </div>
      <div style={{padding: '20px 0', textAlign: 'center'}}>
        <button onClick={() => setRotate(~~(Math.random() * 10))}>测一测</button>
        <button onClick={() => setRotate(0)} style={{marginLeft: '12px'}}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Index;
