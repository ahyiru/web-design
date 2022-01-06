import {useState} from 'react';
import {Button} from 'antd';
import {components} from '@common';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';

const {Portal, Mask, Modal} = components;

const Index = (props) => {
  const [maskOpen, setMaskOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Row>
      <Col>
        <Panel>
          <div>portal demo</div>
          <Portal>
            <div style={{zIndex: 100, position: 'fixed', top: '40%', right: 0, color: 'red'}}>mounted at body</div>
          </Portal>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Button onClick={(e) => setMaskOpen(true)}>openMask</Button>
          <Mask open={maskOpen} close={() => setMaskOpen(false)} delay={0}>
            mask test
          </Mask>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Button onClick={(e) => setModalOpen(true)}>openModal</Button>
          <Modal open={modalOpen} cancel={() => setModalOpen(false)} delay={250}>
            <div>modal test</div>
          </Modal>
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
