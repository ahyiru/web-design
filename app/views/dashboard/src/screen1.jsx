import {CornerBorder, HalfBorder, BgBox, TitleHeader, TitleBorder, AnimateBorder} from '@huxy/materials';
import {Row, Col} from '@app/components/row';
import {option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, columns1, columns2, dataSource1, dataSource2} from './data';

import Panel from './components/panel';
import ReactChart from './components/reactChart';
import Table from './components/table';


const Index = props => {
  return (
    <div>
      {/* <TitleHeader title="大屏监控测试平台" /> */}
      <Row>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={3}>
              <CornerBorder>
                <Panel title="使用统计量">
                  <ReactChart option={option6} style={{height: '160px'}} />
                </Panel>
              </CornerBorder>
            </Col>
            <Col span={3}>
              <HalfBorder>
                <Panel title="访问统计量">
                  <ReactChart option={option5} style={{height: '160px'}} />
                </Panel>
              </HalfBorder>
            </Col>
            <Col span={3}>
              <AnimateBorder>
                <Panel>
                  <ReactChart option={option7} style={{height: '160px'}} />
                </Panel>
              </AnimateBorder>
            </Col>
            <Col span={3}>
              <TitleBorder title="访问统计量">
                <Panel>
                  <ReactChart option={option12} style={{height: '160px'}} />
                </Panel>
              </TitleBorder>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <Row>
                <Col>
                  <Panel>
                    <ReactChart option={option8} />
                  </Panel>
                </Col>
                <Col>
                  <Panel>
                    <ReactChart option={option10} style={{height: '240px'}} />
                  </Panel>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={8}>
                  <Panel>
                    <ReactChart option={option2} />
                  </Panel>
                </Col>
                <Col span={4}>
                  <Panel>
                    <ReactChart option={option11} />
                  </Panel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Panel>
                    <Table columns={columns1} dataSource={dataSource1} style={{height: '240px'}} />
                  </Panel>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={6}>
              <Panel>
                <ReactChart option={option3} />
              </Panel>
            </Col>
            <Col span={6}>
              <Panel>
                <ReactChart option={option1} />
              </Panel>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <Panel>
                <ReactChart option={option9} />
              </Panel>
            </Col>
            <Col span={4}>
              <Panel>
                <ReactChart option={option4} />
              </Panel>
            </Col>
            <Col span={4}>
              <Panel>
                <Table columns={columns2} dataSource={dataSource2} />
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
