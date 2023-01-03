import {useRoute} from '@huxy/router';
import {useWinResize} from '@huxy/use';
import {Anico} from '@huxy/components';

import report from '@app/apis/report/report';

const CustomCollapse = props => {
  const {useStore} = useRoute();
  const {width} = useWinResize();
  const [collapsed, setCollapsed] = useStore('huxy-collapse');
  return width <= 1024 ? (
    <a
      {...props}
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
    </a>
  ) : null;
};

export default CustomCollapse;
