import {rmUnit} from '@huxy/utils';
import {Row, Col, Panel} from '@huxy/components';
import {Barchart, Card, Circle, Dashboard, List, Piechart, Progress, Ring, Container, Table, Wave} from '@huxy/materials';

const centerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const CircleRing = ({height = '240px', padding = '30px'}) => <div style={{position: 'relative', height, padding}}>
  <div style={centerStyle}><Circle size={`${(rmUnit(height) - rmUnit(padding))}px`} /></div>
  <div style={centerStyle}><Ring size={`${(rmUnit(height) - rmUnit(padding))}px`} color="rgba(2, 254, 255, 0.8)" itemWidth="16px" /></div>
</div>;

const Index = props => {
  return (
    <Row>
      <Col span={6}>
        <Row gutter={8}>
          {[...new Array(2)].map((v, k) => (
            <Col span={6} key={k}>
              <Panel>
                <Wave>
                  <Card height="120px" />
                </Wave>
              </Panel>
            </Col>
          ))}
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Panel>
              <Container>
                <Wave>
                  <Table row={4} />
                </Wave>
              </Container>
            </Panel>
          </Col>
          <Col span={12}>
            <Panel>
              <Container hasTitle>
                <Piechart height="172px" />
              </Container>
            </Panel>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row gutter={8}>
          <Col span={12}>
            <Panel>
              <div style={{marginTop: '10px'}}><Progress /></div>
              <div style={{marginTop: '10px'}}><Progress /></div>
              <div style={{marginTop: '10px'}}><Progress /></div>
              <div style={{marginTop: '10px'}}><Progress /></div>
            </Panel>
          </Col>
          <Col span={12}>
            <Panel>
              <Container hasTitle>
                <Barchart height="176px" />
              </Container>
            </Panel>
          </Col>
          <Col span={12}>
            <Panel>
              <Wave>
                <List row={6} />
              </Wave>
            </Panel>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={8}>
          <Col span={6}>
            <Panel>
              <div style={{padding: '30px 0'}}><Dashboard size="200px" /></div>
            </Panel>
          </Col>
          <Col span={6}>
            <Panel>
              <CircleRing />
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
