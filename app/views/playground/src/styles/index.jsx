import {useState} from 'react';
import {Spinner, Anico, LoadError, HandleError} from '@huxy/components';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import Ellipsis from '@app/components/ellipsis';
import Button from '@app/components/base/button';
import Menu from '@app/components/base/menu';
import {typeList, data} from './config';

const ErrorComp = ({state, name}) => <div>{state[name]}</div>;

const Index = props => {
  const [type, setType] = useState('');
  const [demoError, setDemoError] = useState({});

  return (
    <Row>
      <Col span={6}>
        <Panel>
          <div style={{width: 200}}>
            <Ellipsis>12233345657688967i8ijhfgrtrrfgthtgryhhyt</Ellipsis>
          </div>
          <div style={{width: 200}}>
            <Ellipsis>33333</Ellipsis>
          </div>
          <div style={{width: 100}}>
            <Ellipsis>12233345657688967i8ijhfgrtrrfgthtgryhhyt</Ellipsis>
          </div>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <div style={{padding: 20}}>
            <Anico type={type} />
          </div>
          <div>
            {
              typeList.map(({key, name}) => (
                <Button style={{marginRight: 10}} key={key} type={key === type ? 'primary' : ''} onClick={e => setType(key)}>
                  {name}
                </Button>
              ))
            }
          </div>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <Spinner />
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <div>{LoadError({error: 'load error demo'})}</div>
          <HandleError>
            <ErrorComp state={demoError} name="eb" />
          </HandleError>
          {demoError && <Button onClick={e => setDemoError(null)}>load</Button>}
        </Panel>
      </Col>
      <Col>
        <Panel style={{height: '300px'}}>
          <Menu data={data} />
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
