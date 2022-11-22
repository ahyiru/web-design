import {rmUnit} from '@huxy/utils';
import {Circle, Ring, Light} from '@huxy/materials';

const centerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const CircleRing = ({height = '240px', padding = '30px', style}) => <div style={{position: 'relative', height, padding, ...style}}>
  <div style={centerStyle}><Circle size={`${(rmUnit(height) - rmUnit(padding))}px`} /></div>
  <div style={centerStyle}><Ring size={`${(rmUnit(height) - rmUnit(padding))}px`} color="rgba(2, 254, 255, 0.8)" itemWidth="16px" /></div>
</div>;

export default props => <div>
  <Light width="168px" height="120px" space="30%" style={{top: '112px'}} />
  <CircleRing height="214px" style={{transform: 'rotateX(64deg)'}} />
</div>;
