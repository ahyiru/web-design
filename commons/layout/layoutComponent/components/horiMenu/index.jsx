import {Link} from '@common';
import './index.less';
const render=(data,fixIcons)=>data.map(item=>{
  const {name,path,icon,active,open,children}=item;
  const hasChildren=children&&children.length;
  if(hasChildren){
    return <li key={path||name} has-children="true">
      <Link to={path} className={active?'active':''} preventDefault>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{render(children,fixIcons)}</ul>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} stopPropagation className={active?'active target':''}>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});
const Index=({menu,fixIcons,...rest})=>{
  const {float,...restStyle}=rest?.style??{};
  const menuStyle=float?{'--menuFloat':float,...restStyle}:restStyle;
  return <div className="nav-menu" {...rest} style={menuStyle}>
    <div className="menu-track">
      <ul className="tree-root">
        {render(menu,fixIcons)}
      </ul>
    </div>
  </div>;
};

export default Index;

