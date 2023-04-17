import {IconAnimate} from '@huxy/materials';

import animateObjs from '@app/models/animateObjs';
import cssModels from '@app/models/cssModels';

const Index = props => {
  return (
    <div>
      <IconAnimate objs={animateObjs} models={cssModels} {...props} />
    </div>
  );
};

export default Index;
