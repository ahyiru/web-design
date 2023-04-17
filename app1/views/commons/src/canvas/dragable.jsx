import {useState, useCallback, useEffect, useRef} from 'react';
// import Panel from '@app/components/panel';
import {Row, Col} from '@app/components/row';
import drag from './drag';

const dragStyles = {
  minHeight: 300,
  background: '#eee',
  cursor: 'move',
};

const Index = props => {
  const panel1 = useRef();
  const panel2 = useRef();
  useEffect(() => {
    const destroy1 = drag(panel1.current);
    const destroy2 = drag(panel2.current);
    return () => {
      destroy1();
      destroy2();
    };
  }, []);
  return (
    <div>
      <Row>
        <Col span={6}>
          <div ref={panel1} style={dragStyles}>
            block1
          </div>
        </Col>
        <Col span={6}>
          <div ref={panel2} style={dragStyles}>
            block2
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
