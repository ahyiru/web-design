import {useState,useEffect,useMemo} from 'react';
import Settings from '@app/components/settings';
import Bugua from './bagua';
import './index.less';

const Child1=props=>{
  console.log('Child1');
  return <h1>Child1</h1>;
};

const Child2=props=>{
  console.log('Child2');
  return <h1>Child2</h1>;
};

const Child3=props=>{
  console.log('Child3');
  return <h1>Child3</h1>;
};

const Index=props=>{
  const [state,setState]=useState(0);
  const C2=useMemo(()=><Child2 />,[state]);
  const C3=useMemo(()=><Child3 />);
  return <div className="demo-container">
    <h1>{state}</h1>
    <button onClick={()=>setState(state+1)}>test</button>
    {/* <Child1 />
    {C2}
    {C2} */}
  </div>;
};

export default Index;


