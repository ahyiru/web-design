import {Link} from '@huxy/router';
import {Anico} from '@huxy/components';
import './index.less';

const Index = ({collapsed, setCollapsed}) => {
  return (
    <div className="menu-collapsed">
      <a className="collapsed-bar" onClick={() => setCollapsed(!collapsed)}>
        <Anico type={collapsed ? 'right' : ''} />
      </a>
      {!collapsed && (
        <Link to="http://ihuxy.com:8088/" target="_blank" className="link-bar">
          文档
        </Link>
      )}
    </div>
  );
};

export default Index;
