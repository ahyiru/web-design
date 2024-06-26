import {useHuxyStore} from '@huxy/router';
import {useWinResize, useUpdateEffect} from '@huxy/use';
import {Anico} from '@huxy/components';

import report from '@app/apis/report/report';

const CustomCollapse = ({item, ...rest}) => {
  const {width, height} = useWinResize();
  const [collapsed, setCollapsed] = useHuxyStore('huxy-collapse');
  useUpdateEffect(() => {
    document.documentElement.style.setProperty('--containerHeight', `${height}px`);
  }, [height]);
  return width <= 1024 ? (
    <span
      {...rest}
      onClick={e => {
        e.stopPropagation();
        setCollapsed(!collapsed);
        report({
          actionType: 'click',
          category: 'menuBottom',
          text: 'minscreen-collapsed',
          value: collapsed ? 'close' : 'open',
        });
      }}
      title="minscreen-collapse"
    >
      <Anico type={collapsed ? 'right' : ''} />
    </span>
  ) : null;
};

export default CustomCollapse;
