import {useState, useEffect} from 'react';
import ECharts from 'echarts-for-react';
import {Table as AntTable} from 'antd';
import {Spinner} from '@huxy/components';
import DefPanel from '@app/components/panel';
import {Row, Col} from '@app/components/row';
// import ScreenHeader from '@app/components/screenHeader';
import {option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, columns1, columns2, dataSource1, dataSource2} from '@app/models/screen1';
import defaultOpts from '@app/models/screen1/defaultOpts';
import {tableCfg} from '@app/utils/configs';

const Panel = props => <DefPanel {...props} style={{borderColor: 'rgba(0,180,220,0.08)'}} />;

const Table = ({style, ...rest}) => (
  <div style={{height: style?.height ?? 300, overflow: 'auto'}}>
    <AntTable {...rest} {...tableCfg} />
  </div>
);

const ReactECharts = props => <ECharts {...props} /* option={merge(props.option,defaultOpts)} */ theme="dark-screen" />;

const Index = props => {
  const [charts, setCharts] = useState(null);
  useEffect(() => {
    const getCharts = async () => {
      const echarts = await import('echarts');
      echarts.registerTheme('dark-screen', defaultOpts);
      setCharts(echarts);
    };
    getCharts();
  }, []);
  if (!charts) {
    return <Spinner global />;
  }
  const opt1 = option1(charts);
  return (
    <div>
      {/* <ScreenHeader title="大屏监控测试平台" /> */}
      <Row>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={3}>
              <DefPanel title="使用统计量" className="corner">
                <ReactECharts option={option6} style={{height: '160px'}} />
              </DefPanel>
            </Col>
            <Col span={3}>
              <Panel title="访问统计量" className="corner-half">
                <ReactECharts option={option5} style={{height: '160px'}} />
              </Panel>
            </Col>
            <Col span={3}>
              <Panel>
                <ReactECharts option={option7} style={{height: '160px'}} />
              </Panel>
            </Col>
            <Col span={3}>
              <Panel>
                <ReactECharts option={option12} style={{height: '160px'}} />
              </Panel>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <Row>
                <Col>
                  <Panel>
                    <ReactECharts option={option8} />
                  </Panel>
                </Col>
                <Col>
                  <Panel>
                    <ReactECharts option={option10} style={{height: '240px'}} />
                  </Panel>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={8}>
                  <Panel>
                    <ReactECharts option={option2} />
                  </Panel>
                </Col>
                <Col span={4}>
                  <Panel>
                    <ReactECharts option={option11} />
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
                <ReactECharts option={option3} />
              </Panel>
            </Col>
            <Col span={6}>
              <Panel>
                <ReactECharts option={opt1} />
              </Panel>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col span={4}>
              <Panel>
                <ReactECharts option={option9} />
              </Panel>
            </Col>
            <Col span={4}>
              <Panel>
                <ReactECharts option={option4} />
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
