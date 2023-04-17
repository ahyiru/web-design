import {IconAnimate, Css3dModel, Fliper, IconCarousel} from '@huxy/materials';

import models from '@app/models/models';

import animateObjs from '@app/models/animateObjs';
import cssModels from '@app/models/cssModels';

const box = {
  position: 'relative',
  minHeight: '100px',
  margin: '20px auto',
  background: 'rgba(0, 0, 0, 0.1)',
  padding: '15px',
  overflow: 'hidden',
};

const fliperStyle = {
  height: '200px',
  lineHeight: '200px',
  color: '#fff',
  textAlign: 'center',
  fontSize: '32px',
};

const Index = props => {
  return (
    <div>
      <div style={box}>
        <IconAnimate objs={animateObjs} models={cssModels} />
      </div>
      <div style={box}>
        <Fliper
          front={<div style={{background: 'var(--blue1)', ...fliperStyle}}>正面</div>}
          back={<div style={{background: 'var(--orange1)', ...fliperStyle}}>反面</div>}
          style={{height: 200, width: 200, margin: '0 auto'}}
        />
      </div>
      <div style={box}>
        <IconCarousel list={models} />
      </div>
    </div>
  );
};

export default Index;
