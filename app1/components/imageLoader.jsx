import {useState, useEffect} from 'react';
import {loadImage} from '@huxy/utils';

import ImageSkeleton from './imageSkeleton';

const ImageLoader = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loader = async src => {
      try {
        await loadImage(src);
      } catch (err) {}
      setLoading(false);
    };
    loader(props.src);
  }, []);
  return loading ? <ImageSkeleton /> : <img {...props} />;
};

export default ImageLoader;
