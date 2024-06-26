import {Wave} from '@huxy/materials';

import ImageIcon from './icons/image';

const ImageSkeleton = () => {
  return (
    <Wave style={{width: '64%'}}>
      <ImageIcon width="100%" height="100%" style={{color: 'rgba(0, 0, 0, 0.2)'}} />
    </Wave>
  );
};

export default ImageSkeleton;
