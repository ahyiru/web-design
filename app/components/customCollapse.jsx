import {useRoute} from '@huxy/router';
import {useWinResize} from '@huxy/use';
import {Anico} from '@huxy/components';

const CustomCollapse = props => {
  const {useStore} = useRoute();
  const {width} = useWinResize();
  const [collapsed, setCollapsed] = useStore('huxy-collapse');
  return width < 1024 ? (
    <a
      {...props}
      onClick={e => {
        e.stopPropagation();
        setCollapsed(!collapsed);
      }}
    >
      <Anico type={collapsed ? 'right' : ''} />
    </a>
  ) : null;
};

export default CustomCollapse;
