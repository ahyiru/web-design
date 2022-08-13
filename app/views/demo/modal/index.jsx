import {useState} from 'react';
import {Button} from 'antd';
import {Portal, Mask, Modal} from '@huxy/components';
import {message} from '@huxy/utils';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';

const Index = props => {
  const [maskOpen, setMaskOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Row>
      <Col>
        <Panel>
          <div id="portal-test">portal demo</div>
          <Portal>
            <div style={{zIndex: 100, position: 'fixed', top: '40%', right: 0, color: 'var(--red2)'}}>mounted at body</div>
          </Portal>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Button onClick={e => setMaskOpen(true)}>openMask</Button>
          <Mask open={maskOpen} close={() => setMaskOpen(false)} delay={0}>
            mask test
          </Mask>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Button onClick={e => setModalOpen(true)}>openModal</Button>
          <Modal open={modalOpen} cancel={() => setModalOpen(false)} delay={250}>
            <div>modal test</div>
          </Modal>
        </Panel>
      </Col>
      <Col>
        <Panel>
          <Button onClick={e => message.success('message success')}>success</Button>
          <Button onClick={e => message.warn('message warn')}>warn</Button>
          <Button onClick={e => message.error('message error')}>error</Button>
          <Button onClick={e => message.info('message info')}>info</Button>
        </Panel>
      </Col>
    </Row>
  );
};

export default Index;
