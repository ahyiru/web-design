import {useRef,useMemo} from 'react';
import {use,utils} from '@common';
import {render,renderCollapsed} from '../components/render';
import useCollapsed from '../hooks/useCollapsed';
import './index.less';

const {useClickAway,useUpdate,useWinResize}=use;
const {getSelected,uuidv4}=utils;

const Index=props=>{
  const {store,menu,MenuTop,MenuBottom,menuStyle,fixIcons}=props;
  const [collapsed]=useCollapsed(store);
  const {width}=useWinResize();
  const data=useMemo(()=>menu,[menu]);
  const menuRef=useRef();
  useClickAway(menuRef,e=>{
    if(width<1024&&collapsed){
      store.setState({'huxy-collapsed':false});
    }
  });
  const rerender=useUpdate();
  const toggle=(e,v)=>{
    e.stopPropagation();
    const selecteds=getSelected(data,v.path,'path');
    selecteds.map(item=>item.path===v.path?item.open=!item.open:item.uuid=uuidv4());
    rerender();
  };
  return <div className="menu" ref={menuRef} style={menuStyle}>
    {MenuTop&&<MenuTop {...props} />}
    <div className="menu-track">
      <ul className="tree-root">
        {width>1024&&collapsed?renderCollapsed(data,menuRef,fixIcons):render(data,toggle,fixIcons)}
      </ul>
    </div>
    {MenuBottom&&<MenuBottom {...props} />}
  </div>;
};

export default Index;


