import {useEffect, useRef} from 'react';
import {utils} from '@common';

const {scrollToTop, scrollTop, throttle, sort, validObj} = utils;

const Anchor = ({router, curName, itemList, children}) => {
  const timer = useRef(0);
  const isScrolling = useRef(false);
  const currentName = useRef('');
  useEffect(() => {
    itemList.current = validObj(itemList.current);
    if (!curName) {
      const items = Object.keys(itemList.current).map((key) => ({name: key, offsetTop: itemList.current[key]?.offsetTop ?? 0}));
      router.push({query: {name: items[0]?.name}});
    }
    if (currentName.current !== curName) {
      currentName.current = curName;
      const offsetTop = itemList.current[curName]?.offsetTop ?? 0;
      isScrolling.current = true;
      scrollToTop(offsetTop);
      timer.current = setTimeout(() => (isScrolling.current = false), 500);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [curName]);
  useEffect(() => {
    const scrollToAnchor = throttle(() => {
      if (!isScrolling.current) {
        const offsetTops = sort(
          Object.keys(itemList.current).map((key) => ({name: key, offsetTop: itemList.current[key]?.offsetTop ?? 0})),
          'offsetTop',
          true,
        );
        const name = offsetTops.find((item) => item.offsetTop < scrollTop())?.name;
        if (currentName.current !== name) {
          currentName.current = name;
          router.push({query: {name}});
        }
      }
    });
    window.addEventListener('scroll', scrollToAnchor, false);
    return () => window.removeEventListener('scroll', scrollToAnchor, false);
  }, []);

  return <div>{children}</div>;
};

export default Anchor;
