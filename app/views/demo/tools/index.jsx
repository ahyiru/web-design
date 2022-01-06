import {useEffect, useRef} from 'react';
import {components, utils, use} from '@common';
import {Row, Col} from '@app/components/row';

import SkeletonContent from '@app/components/skeletonContent';

const {Panel} = components;

const {watermark} = utils;

const {useEleResize} = use;

const Index = (props) => {
  const watermarkRef = useRef();
  const skeletonRef = useRef();
  const {width} = useEleResize(skeletonRef, 250);

  useEffect(() => {
    watermark({
      container: watermarkRef,
    });
  }, []);
  return (
    <Row>
      <Col>
        <Panel title="watermark">
          <div ref={watermarkRef} style={{height: '300px'}}>
            <span>hello world</span>
          </div>
        </Panel>
      </Col>
      <Col>
        <Panel ref={skeletonRef} title="skeleton" plugins={[() => <div style={{padding: '0.3rem 2rem', fontSize: '1.2rem', color: 'var(--appColor)'}} style={{background: 'var(--panelBgColor)'}}>panelWidth: {width}</div>]}>
          <SkeletonContent />
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
