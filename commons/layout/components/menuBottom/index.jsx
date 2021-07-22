import {useMemo} from 'react';
import {utils} from '@common';
import './index.less';
const {cacheData}=utils;

const {getList,record}=cacheData();

const Index=props=>{
  const {curPath}=props;
  useMemo(()=>record(curPath||'/'),[curPath]);
  
  return <div className="menu-btbar">
    <h4 className="btbar-title">history list</h4>
    <ul className="btbar-list">
      {
        getList().reverse().map(({data},i)=><li key={`${data}-${i}`}><a href={data}>{data}</a></li>)
      }
    </ul>
  </div>;
};

export default Index;


