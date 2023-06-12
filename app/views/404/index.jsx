import {IconAnimate} from '@huxy/materials';
import darkTheme from '@app/configs/themes/dark';
import notFound from '@app/models/icons/not-found.png';
import animateObjs from '@app/models/animateObjs';
import cssModels from '@app/models/cssModels';

import './index.less';

const Index = props => {
  return (
    <div className="not-found-page" style={darkTheme.colors}>
      <h4 style={{color: 'var(--red2)', textAlign: 'center', position: 'absolute', width: '100%', top: 0}}>{props.inputPath} is not found</h4>
      <div className="not-found-icon">
        <img src={notFound} />
      </div>
      <div className="animation-info">
        <IconAnimate objs={animateObjs} models={cssModels} />
      </div>
    </div>
  );
};

export default Index;
