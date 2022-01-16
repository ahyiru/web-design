import {useRoute} from 'ihuxy/router';
import {useWinResize} from 'ihuxy-use/useViewSize';
import Anico from 'ihuxy-components/anico';

const CustomCollapse = (props) => {
  const {useStore} = useRoute();
  const {width} = useWinResize();
  const [collapsed, setCollapsed] = useStore('huxy-collapse');
  return width < 1024 ? (
    <a {...props} onClick={(e) => setCollapsed(!collapsed)}>
      <Anico type={collapsed ? 'right' : ''} />
    </a>
  ) : null;
};

export default CustomCollapse;
