import {Link} from '@common';
import TopRight from '@app/components/topRight';
import './index.less';

const Index=({current,Right=TopRight})=>{
  current=current.filter(v=>v.name);
  const name=<li><a style={{fontSize:'1.6rem'}}>{current.slice(-1)[0]?.name}</a></li>;
  const bread=current.map(({path,name})=><li key={path}><Link to={path}>{name}</Link></li>);
  const isRightBread=current.length>1;
  const leftBar=isRightBread?name:bread;
  const rightBar=isRightBread?bread:<Right />;
  return <div className="main-top">
    <ul className={`left-bar${isRightBread?'':' bread'}`}>
      {leftBar}
    </ul>
    <ul className={`right-bar${isRightBread?' bread':''}`}>
      {rightBar}
    </ul>
  </div>;
};

export default Index;



