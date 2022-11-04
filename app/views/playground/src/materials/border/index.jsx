import {Row, Col, Panel} from '@huxy/components';
import {TitleHeader, CornerBorder, HalfBorder, BgBox, TitleBorder, AnimateBorder} from '@huxy/materials';

import writeIcon from '@app/models/icons/write.png';

const box = {
  width: '100%',
  height: '120px',
};

const Index = props => {
  return (
    <BgBox type="dot" style={{minHeight: 600}}>
      <div style={{overflow: 'hidden', margin: '10px 0'}}><TitleHeader title="XXX 云平台" /></div>
      <Row>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <CornerBorder>
                <BgBox type="strip">
                  <Panel style={{opacity: '0.2'}}>
                    <div style={box}>CornerBorder <a>strip background</a></div>
                  </Panel>
                </BgBox>
              </CornerBorder>
            </Col>
            <Col span={4}>
              <HalfBorder>
                <BgBox type="cubestrip">
                  <Panel style={{opacity: '0.2'}}>
                    <div style={box}>HalfBorder <a>cubestrip background</a></div>
                  </Panel>
                </BgBox>
              </HalfBorder>
            </Col>
            <Col span={4}>
              <TitleBorder title="TitleBorder">
                <BgBox type="cube">
                  <Panel style={{opacity: '0.2'}}>
                    <div style={{...box, height: '100px'}}>TitleBorder <a>cube background</a></div>
                  </Panel>
                </BgBox>
              </TitleBorder>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <AnimateBorder type="dash">
                <BgBox type="grid">
                  <Panel style={{opacity: '0.2'}}>
                    <div style={box}>AnimateBorder1 <a>grid background</a></div>
                  </Panel>
                </BgBox>
              </AnimateBorder>
            </Col>
            <Col span={4}>
              <AnimateBorder type="solid">
                <BgBox url={writeIcon}>
                  <Panel style={{opacity: '0.2'}}>
                    <div style={box}>AnimateBorder2 <a>image background</a></div>
                  </Panel>
                </BgBox>
              </AnimateBorder>
            </Col>
          </Row>
        </Col>
      </Row>
    </BgBox>
  );
};

export default Index;
