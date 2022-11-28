import {Button, Tooltip} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {Link} from '@huxy/router';
import apiList from '@app/utils/getApis';
import useHandleList from '@app/hooks/useHandleList';
import {useThemeStore} from '@app/store/stores';
import RangeTimePicker from '@app/components/rangeTimePicker';
import {Row, Col} from '@app/components/row';
import Panel from '../components/panel';
import ReactChart from '../components/reactChart';

import {totalViews, getOverview, getOsTypeOpt, getBrowserTypeOpt, getViewsOpt, getRouteVisitOpt, getVisitCityOpt, getFirstloadOpt} from '../utils';

import {actions} from './configs';

import './index.less';

const Monitor = props => {
  /* const timeRef = useRef({
    startTime: todaySatrt(),
    endTime: +new Date(),
  }); */
  const [theme] = useThemeStore();
  const [result, update] = useHandleList(apiList.listReportFn, {/* ...timeRef.current, */ size: 5000});
  const handleTimeChange = time => {
    update(time);
  };
  const list = result.data?.list ?? [];
  const overviewObj = getOverview(list);
  const osTypeOpt = getOsTypeOpt(list);
  const browserTypeOpt = getBrowserTypeOpt(list);
  const viewsOpt = getViewsOpt(list);
  const routeVisitOpt = getRouteVisitOpt(list);
  const visitCityOpt = getVisitCityOpt(list, theme);
  const firstloadOpt = getFirstloadOpt(list);
  return <div className="monitor-dashboard">
    <Row>
      <Col>
        <Panel>
          <div className="monitor-toolbar">
            <div className="toolbar-left">
              <h4>访问量：{totalViews(list)}</h4>
              <Tooltip title="刷新">
                <Button type="link" icon={<SyncOutlined />} loading={result.pending} onClick={e => update()} />
              </Tooltip>
            </div>
            <div className="toolbar-right">
              <Link to="/bigscreen" target="_blank" style={{marginRight: 8}}>
                <Button type="link">bigscreen</Button>
              </Link>
              <div className="monitor-toolbar-timepicker"><RangeTimePicker getTime={handleTimeChange} defaultValue={[]} /></div>
            </div>
          </div>
        </Panel>
      </Col>
    </Row>
    <Row>
      {
        actions.map(item => <Col key={item.value} span={3}>
          <Panel>
            <div className="overview-item">
              <div className="item-icon">
                <img src={item.icon} alt={item.label} />
              </div>
              <div className="item-text">
                <p className="text-desc">{item.description}</p>
                <p className="text-value"><b style={{color: item.color}}>{overviewObj[item.value]}</b></p>
              </div>
            </div>
          </Panel>
        </Col>)
      }
    </Row>
    <Row>
      <Col span={12}>
        <Panel title={firstloadOpt.name}>
          <ReactChart option={firstloadOpt.opt} style={{height: '200px'}} />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <Panel title={visitCityOpt.name}>
          <ReactChart option={visitCityOpt.opt} style={{height: '450px'}} />
        </Panel>
      </Col>
      <Col span={4}>
        <Panel title={routeVisitOpt.name}>
          <ReactChart option={routeVisitOpt.opt} style={{height: '450px'}} />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <Panel title={viewsOpt.name}>
          <ReactChart option={viewsOpt.opt} style={{height: '240px'}} />
        </Panel>
      </Col>
      <Col span={4}>
        <Panel title={browserTypeOpt.name}>
          <ReactChart option={browserTypeOpt.opt} style={{height: '240px'}} />
        </Panel>
      </Col>
      <Col span={4}>
        <Panel title={osTypeOpt.name}>
          <ReactChart option={osTypeOpt.opt} style={{height: '240px'}} />
        </Panel>
      </Col>
    </Row>
  </div>;
};

export default Monitor;
