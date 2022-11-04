import {IconAnimate} from '@huxy/materials';

import notFound from '@app/models/icons/not-found.png';
import animateObjs from '@app/models/animateObjs';
import cssModels from '@app/models/cssModels';

import './index.less';

const Index = props => {
  return (
    <div className="not-found-page">
      <div className="not-found-icon">
        <img  src={notFound} />
      </div>
      <div className="animation-info">
        <IconAnimate objs={animateObjs} models={cssModels} />
      </div>
    </div>
  );
};

export default Index;
