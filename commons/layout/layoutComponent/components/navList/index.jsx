import {useState,useRef,useMemo} from 'react';
import {use,utils} from '@common';
import useCollapsed from '../../hooks/useCollapsed';

const {useClickAway,useUpdate}=use;
const {traverItem}=utils;

const NavItem=({click,item,store,fixIcons})=>{
  const [collapsed]=useCollapsed(store);
  const navRef=useRef();
  const [open,setOpen]=useState(false);
  useClickAway(navRef,e=>setOpen(false));
  const {Custom,img,name,icon,children,Ricon,active,arrowDir,ChildRender}=item;
  const hasChildren=children?.length;
  const toggleNav=(e,item)=>{
    // e.stopPropagation();
    setOpen(prev=>!prev);
    click(item);
  };
  const itemClick=(e,item,isChild=false)=>{
    setOpen(false);
    click(item,isChild);
  };
  const ri=Ricon===true?<i className={`huxy-angle-${open?'top':'bt'}`} />:(Ricon?<Ricon status={open} />:null);
  const itemEl=Custom?<Custom collapsed={collapsed} />:img?<div className="avatar">
    <div className="img"><img src={img} crossOrigin="anonymous" alt="avatar" /></div>
    {name?<span className="txt">{name}</span>:null}
    {ri}
  </div>:<>
    {typeof fixIcons==='function'?fixIcons(icon):icon}
    {name?<span className="txt">{name}</span>:null}
    {ri}
  </>;
  return (hasChildren||ChildRender)?<li ref={navRef}>
    <a onClick={e=>toggleNav(e,item)} className={active?'active':''}>{itemEl}</a>
    <ul className={`huxy-arrow-${arrowDir||'rt'}${open?' show':''}`}>
      {
        hasChildren?children.map((v,k)=><li key={`subItem-${k}-${v.name}`}>
          <a onClick={e=>itemClick(e,v,true)} className={v.active?'active':''}>
            {typeof fixIcons==='function'?fixIcons(v.icon):v.icon}
            <span style={{display:'inline-block'}}>{v.name}</span>
          </a>
        </li>):<ChildRender status={open} />
      }
    </ul>
  </li>:<li>
    <a onClick={e=>itemClick(e,item)} className={active?'active':''}>{itemEl}</a>
  </li>;
};
const Index=({list,click,store,fixIcons})=>{
  const data=useMemo(()=>list||[],[list]);
  const rerender=useUpdate();
  const updateList=item=>{
    /* const newData= */traverItem(v=>{
      if(item.name===v.name){
        v.active=!item.active;
      }else{
        v.active=false;
      }
    })(data);
    rerender();
  };
  const handleClick=(item,update)=>{
    if(update){
      updateList(item);
    }
    click(item);
  };
  return <ul>
    {
      data.map((v,k)=><NavItem key={`navItem-${k}-${v.name}`} click={handleClick} item={v} store={store} fixIcons={fixIcons} />)
    }
  </ul>;
};

export default Index;


