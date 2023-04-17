import {useEffect} from 'react';
import {str2Html} from '@huxy/utils';
export const useSafeSetHTML = (ref, htmlStr = '') => {
  useEffect(() => {
    if (ref?.current instanceof Element && typeof htmlStr === 'string') {
      ref.current.appendChild(str2Html(htmlStr));
    }
  }, [htmlStr]);
};
