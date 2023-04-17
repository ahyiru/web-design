import {useEffect, useRef} from 'react';

import useAnchor from './useAnchor';
import RenderContext from './renderContext';

const RenderPage = ({router, curName, context}) => {
  const itemList = useRef({});
  const [name] = useAnchor({curName, itemList});
  useEffect(() => {
    name && router.push({query: {name}});
  }, [name]);

  return (
    <div className="anchor-page">
      {context.map((item, i) => (
        <div key={item.name} className="anchor-item" ref={ref => (itemList.current[item.name] = ref)}>
          <h2>{`${item.name}`}</h2>
          <RenderContext item={item} />
        </div>
      ))}
    </div>
  );
};

export default RenderPage;
