import {useState} from 'react';
import {Button} from 'antd';
import {LoadError, ErrorBoundary, HandleError} from '@huxy/components';

import Panel from '@app/components/panel';
import {Row, Col} from '@app/components/row';

import {useIntls} from '@app/components/intl';

const Temp = ({state, name}) => <div>{state[name]}</div>;

const EB1 = ({title}) => {
  return (
    <Panel>
      <h2>{title}</h2>
      <div>
        <LoadError error={new Error('loadError')} />
      </div>
    </Panel>
  );
};
const EB2 = ({title}) => {
  return (
    <Panel>
      <h2>{title}</h2>
      <ErrorBoundary fallback={(error, info) => <LoadError error={error} info={info} />}>
        <Temp state={null} name="eb2" />
      </ErrorBoundary>
    </Panel>
  );
};
const EB3 = ({title}) => {
  const [state, setState] = useState({eb3: 'eb3'});
  return (
    <Panel>
      <div style={{overflow: 'hidden'}}>
        <h2 style={{float: 'left'}}>{title}</h2>
        <Button style={{float: 'right'}} type="primary" onClick={() => setState(null)}>
          error
        </Button>
      </div>
      <ErrorBoundary fallback={(error, info) => <LoadError error={error} info={info} />}>
        <Temp state={state} name="eb3" />
      </ErrorBoundary>
    </Panel>
  );
};
const EB4 = ({title}) => {
  return (
    <Panel>
      <h2>{title}</h2>
      <HandleError>
        <Temp state={null} name="eb4" />
      </HandleError>
    </Panel>
  );
};

const Index = props => {
  const getIntls = useIntls();
  return (
    <div>
      <Row>
        <Col span={6}>
          <EB1 title={getIntls('main.suspense.loadError')} />
        </Col>
        <Col span={6}>
          <EB2 title={getIntls('main.suspense.errorBoundary')} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <EB3 title={getIntls('main.suspense.handleErrorBoundary')} />
        </Col>
        <Col span={6}>
          <EB4 title={getIntls('main.suspense.handleError')} />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
