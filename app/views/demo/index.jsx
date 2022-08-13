import {useState, useCallback, useEffect, useMemo, memo} from 'react';
// import {usePrevious} from '@huxy/use';
// import Settings from '@app/components/settings';
// import Intls from '@app/components/intl';
import './index.less';

const Layout = props => {
  console.log('Layout', props.state);
  return (
    <div>
      <h1>Layout</h1>
      {props.children}
    </div>
  );
};
const Parent1 = props => {
  console.log('Parent1', props.state);
  return (
    <div>
      <h2>Parent1</h2>
      {props.children}
    </div>
  );
};
const Parent2 = props => {
  console.log('Parent2', props.state);
  return (
    <div>
      <h2>Parent2</h2>
      {props.children}
    </div>
  );
};
const Child1_1 = props => {
  console.log('Child1_1', props.state);
  return (
    <div>
      <h4>Child1_1</h4>
    </div>
  );
};
const Child2_1 = props => {
  console.log('Child2_1', props.state);
  return (
    <div>
      <h4>Child2_1</h4>
    </div>
  );
};
const Child2_2 = props => {
  console.log('Child2_2', props.state);
  props.eventBus.on('test-memo', data => {
    console.log('Child2_2 new data', data);
  });
  return (
    <div>
      <h4>Child2_2</h4>
    </div>
  );
};

const key21 = 21;

const Child22 = memo(Child2_2, () => true);

const Index = props => {
  const [state, setState] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setState(1);
      props.eventBus.emit('test-memo', 1);
    }, 2000);
  }, []);
  // const Layout1 = useMemo(()=><Layout state={state} />,[]);
  // const Child22 = useMemo(()=><Child2_2 state={state} eventBus={props.eventBus} />,[]);
  // const Child22 = memo(Child2_2, ()=>true);
  return (
    <div className="demo-container">
      <Layout state={state}>
        <Parent1 key="1" state={state}>
          <Child1_1 state={state} />
        </Parent1>
        <Parent2 state={state}>
          <Child2_1 key={key21} state={state} />
          <Child22 state={state} eventBus={props.eventBus} />
        </Parent2>
      </Layout>
    </div>
  );
};

export default Index;
