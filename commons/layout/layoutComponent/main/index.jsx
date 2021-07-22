import {useEffect,useRef,useState} from 'react';
import Footer from '../footer';
import Menu from '../menu';
import './index.less';

/* export const Breadcrumb=({current=[],bread})=><div className="top-bar">
  <span style={{float:'left'}}>{bread}：</span>
  <ul className="bread">
    {current.filter(v=>v.name).map(v=><li key={v.path}><Link to={v.path}>{v.name}</Link></li>)}
  </ul>
</div>; */

const time=450;
const Index=props=>{
  const {menu,current,MainTop,asideStyle,contentStyle,children}=props;
  const curPath=current.slice(-1)[0]?.path;
  // const i18ns=props.store.getState('i18ns')??{};
  // const {main:{bread}}=i18ns;
  const hasMenu=menu?.length;
  const style=hasMenu?null:{paddingLeft:0};
  const contentRef=useRef();

  const [aniCls,setAniCls]=useState('');

  const pathRef=useRef(curPath);
  const timer=useRef();
  useEffect(()=>{
    const curPath=current.slice(-1)[0]?.path;
    if(curPath!==pathRef.current){
      pathRef.current=curPath;
      setAniCls(' ani-in');
      timer.current=setTimeout(()=>{
        setAniCls('');
      },time);
    }
    return ()=>clearTimeout(timer.current);
  },[current]);
  return <div className="frame-container">
    {
      hasMenu?<aside className="frame-aside" style={asideStyle}>
        <Menu {...props} curPath={curPath} menu={menu} />
      </aside>:null
    }
    <div className="frame-view" style={style}>
      <div className="page-container">
        {/* <Breadcrumb current={current} bread={bread} /> */}
        {MainTop&&<MainTop current={current} contentRef={contentRef} />}
        <div className={`page-content${aniCls}`} ref={contentRef} style={contentStyle}>
          {children}
        </div>
      </div>
      <footer className="frame-footer">
        <Footer />
      </footer>
    </div>
  </div>;
};

export default Index;



