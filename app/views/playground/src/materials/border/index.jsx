import {Row, Col, Panel, materials} from '@huxy/components';

const {TitleHeader, CornerBorder, HalfBorder, BgBox, TitleBorder, AnimateBorder} = materials;

const Index = props => {
  return (
    <BgBox type="dot" style={{minHeight: 600}}>
      <div style={{overflow: 'hidden', margin: '10px 0'}}><TitleHeader title="XXX 云平台" /></div>
      <Row>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <CornerBorder><Panel>CornerBorder <a href="/">111</a></Panel></CornerBorder>
            </Col>
            <Col span={4}>
              <HalfBorder><Panel>HalfBorder</Panel></HalfBorder>
            </Col>
            <Col span={4}>
              <TitleBorder><Panel>TitleBorder</Panel></TitleBorder>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <AnimateBorder type="dash"><Panel>AnimateBorder1</Panel></AnimateBorder>
            </Col>
            <Col span={4}>
              <AnimateBorder type="solid"><Panel>AnimateBorder2</Panel></AnimateBorder>
            </Col>
          </Row>
        </Col>
      </Row>
    </BgBox>
  );
};

export default Index;
