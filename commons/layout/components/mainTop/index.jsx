import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {Link,components,use} from '@common';
import './index.less';

const {FullPage}=components;
// const {useTime}=use;

const Index=({current,leftBar,contentRef})=>{
  // const [time]=useTime();
  return <div className="main-top">
    {
      leftBar?.length?<ul className="left-bar">
        {
          leftBar.map(item=><li key={item.key}><a className="btn-bar">{item.label}</a></li>)
        }
      </ul>:<ul className="bread">
        {current?.filter(v=>v.name).map(v=><li key={v.path}><Link to={v.path}>{v.name}</Link></li>)}
      </ul>
    }
    <ul className="right-bar">
      {/* <li>
        <a>{time}</a>
      </li> */}
      <li>
        <a><FullPage panel={contentRef} fullIcon={FullscreenOutlined} exitIcon={FullscreenExitOutlined} /></a>
      </li>
    </ul>
  </div>;
};

export default Index;



