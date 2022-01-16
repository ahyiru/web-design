import {Link} from 'ihuxy/router';
import Anico from 'ihuxy-components/anico';
import './index.less';

const Index=({useStore})=>{
  const [collapsed,setCollapsed]=useStore('huxy-collapse');
  return <div className="menu-collapsed">
    <a className="collapsed-bar" onClick={()=>setCollapsed(!collapsed)}><Anico type={collapsed?'right':''} /></a>
    {!collapsed&&<Link to="http://ihuxy.com:8088/" target="_blank" className="link-bar">文档</Link>}
  </div>;
};

export default Index;


