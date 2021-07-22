import {useState,useEffect,useCallback} from 'react';

import {utils,use,components} from '@common';

import {Input,Select,InputNumber,Switch,Button} from 'antd';

import Panel from '@app/components/panel';
import {Row,Col} from '@app/components/row';

const {ErrorBoundary,HandleError}=components;

const {loadError}=utils;

const Temp=({state,name})=><div>{state[name]}</div>;

const EB1=()=>{
  return <Panel>
    <h2>loadError</h2>
    <div>
      {loadError({error:new Error('loadError')})}
    </div>
  </Panel>;
};
const EB2=()=>{
  return <Panel>
    <h2>ErrorBoundary</h2>
    <ErrorBoundary fallback={(error,info)=>loadError({error,info})}>
      <Temp state={null} name="eb2" />
    </ErrorBoundary>
  </Panel>;
};
const EB3=()=>{
  const [state,setState]=useState({eb3:'eb3'});
  return <Panel>
    <div style={{overflow:'hidden'}}>
      <h2 style={{float:'left'}}>ErrorBoundary</h2>
      <Button style={{float:'right'}} type="primary" onClick={()=>setState(null)}>error</Button>
    </div>
    <ErrorBoundary fallback={(error,info)=>loadError({error,info})}>
      <Temp state={state} name="eb3" />
    </ErrorBoundary>
  </Panel>;
};
const EB4=()=>{
  return <Panel>
    <h2>HandleError</h2>
    <HandleError>
      <Temp state={null} name="eb4" />
    </HandleError>
  </Panel>;
};

const Index=props=>{
  return <div>
    <Row>
      <Col span={6}>
        <EB1 />
      </Col>
      <Col span={6}>
        <EB2 />
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <EB3 />
      </Col>
      <Col span={6}>
        <EB4 />
      </Col>
    </Row>
  </div>;
};

export default Index;


