import {Link} from '@common';
import RenderChild from './renderChild';

export const render=(data,toggle,fixIcons)=>data.map(item=>{
  const {name,path,icon,active,open,children}=item;
  const hasChildren=children?.length;
  if(hasChildren){
    return <li key={path||name} onClick={e=>toggle(e,item)} has-children="true" className={open?'open':''}>
      <Link to={path} className={active?'active':''} preventDefault>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <RenderChild item={item}>{render(children,toggle,fixIcons)}</RenderChild>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} className={active?'active target':''} stopPropagation>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});
let timer=0;
export const renderCollapsed=(data,menuRef,fixIcons,level=0)=>data.map(item=>{
  const {name,path,icon,active,children}=item;
  const hasChildren=children?.length;
  if(hasChildren){
    const mouseEvents=level?{}:{
      onMouseEnter:e=>{
        clearTimeout(timer);
        menuRef.current.style.width='100vw';
      },
      onMouseLeave:e=>{
        timer=setTimeout(()=>menuRef.current.style.width='',200);
      },
    };
    return <li key={path||name} has-children="true" {...mouseEvents}>
      <Link to={path} className={active?'active':''} preventDefault>
        {typeof fixIcons==='function'?fixIcons(icon):icon}
        <span className="txt has-right-icon">{name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{renderCollapsed(children,menuRef,fixIcons,level+1)}</ul>
    </li>;
  }
  return <li key={path||name}>
    <Link to={path} className={active?'active target':''} stopPropagation>
      {typeof fixIcons==='function'?fixIcons(icon):icon}
      <span className="txt">{name}</span>
    </Link>
  </li>;
});

