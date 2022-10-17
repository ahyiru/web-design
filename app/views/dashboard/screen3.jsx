import {useState, useEffect} from 'react';
import ECharts from 'echarts-for-react';
import {Table as AntTable} from 'antd';
import {Spinner} from '@huxy/components';
import CornerPanel from '@app/components/panel/cornerPanel';
import CornerHalfPanel from '@app/components/panel/cornerHalfPanel';
import {Row, Col} from '@app/components/row';
import ScreenHeader from '@app/components/screenHeader';

const ReactECharts = props => <ECharts {...props} /* option={merge(props.option,defaultOpts)} */ theme="dark-screen" />;

const Index = props => {

  return (
    <div className="page-bg-dot" style={{minHeight: 600}}>
      <ScreenHeader title="大屏监控测试平台" />
      <Row>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={3}>
              <CornerPanel>
                CornerPanel
              </CornerPanel>
            </Col>
            <Col span={3}>
              <CornerPanel>
                CornerPanel
              </CornerPanel>
            </Col>
            <Col span={3}>
              <CornerHalfPanel>
                CornerHalfPanel
              </CornerHalfPanel>
            </Col>
            <Col span={3}>
              <CornerHalfPanel>
                CornerHalfPanel
              </CornerHalfPanel>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
