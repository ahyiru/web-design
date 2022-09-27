import {useState, useEffect} from 'react';
import { loadImage, fixSize } from '@huxy/utils';

const FixedSizeImage = props => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const fixedSize = async src => {
      try {
        const img = await loadImage(src);
        setWidth(fixSize(img));
      } catch (err) {
        setWidth('100%');
      }
    };
    fixedSize(props.src);
  }, []);
  return <img {...props} width={width} />;
};

export default FixedSizeImage;
