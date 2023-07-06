import {TitleHeader, CornerBorder, HalfBorder, BgBox, AnimateBorder} from '@huxy/materials';
import apiList from '@app/apis/apiList';
import useHandleList from '@app/hooks/useHandleList';
import {Row, Col} from '@app/components/row';
import darkTheme from '@app/configs/themes/dark';
import DefPanel from '../components/panel';
import ReactChart from '../components/reactChart';

import {getOsTypeOpt, getBrowserTypeOpt, getViewsOpt, getRouteVisitOpt, getVisitCityOpt, getFirstloadOpt} from '../utils';

import ModelCss from './modelCss';
import TextData from './textData';
import Timebar from './timebar';

const Panel = ({style, ...rest}) => <DefPanel style={{background: 'rgba(0, 0, 0, 0.08)', ...style}} {...rest} />;

const borderColor = '#00b4dcdd';

const Bigscreen = props => {
  const [result] = useHandleList(apiList.listReportFn, {size: 5000}, null, {isFromBigscreen: true});
  const list = result?.data?.list ?? [];
  const osTypeOpt = getOsTypeOpt(list);
  const browserTypeOpt = getBrowserTypeOpt(list);
  const viewsOpt = getViewsOpt(list);
  const routeVisitOpt = getRouteVisitOpt(list);
  const visitCityOpt = getVisitCityOpt(list, {key: 'dark'});
  const firstloadOpt = getFirstloadOpt(list);
  return (
    <div style={{...darkTheme.colors, minHeight: 'var(--containerHeight)', background: 'var(--appBgColor)', padding: '10px 15px'}}>
      <BgBox type="dot">
        <div style={{position: 'relative'}}>
          <TitleHeader title="前端监控大屏" />
          <Timebar />
        </div>
        <Row>
          <Col span={8}>
            <HalfBorder borderColor={borderColor}>
              <Panel title="star 排行榜">
                <ModelCss height="420px" />
              </Panel>
            </HalfBorder>
          </Col>
          <Col span={4}>
            <CornerBorder borderColor={borderColor}>
              <Panel title="热搜词">
                <TextData width="420px" bgColor="transparent" />
              </Panel>
            </CornerBorder>
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
          <Col span={5}>
            <CornerBorder borderColor={borderColor}>
              <Panel title={viewsOpt.name}>
                <ReactChart option={viewsOpt.opt} style={{height: '240px'}} notMerge />
              </Panel>
            </CornerBorder>
          </Col>
          <Col span={4}>
            <CornerBorder borderColor={borderColor}>
              <Panel title={browserTypeOpt.name}>
                <ReactChart option={browserTypeOpt.opt} style={{height: '240px'}} />
              </Panel>
            </CornerBorder>
          </Col>
          <Col span={3}>
            <AnimateBorder borderColor={borderColor}>
              <Panel title={osTypeOpt.name}>
                <ReactChart option={osTypeOpt.opt} style={{height: '240px'}} />
              </Panel>
            </AnimateBorder>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Panel title={firstloadOpt.name}>
              <ReactChart option={firstloadOpt.opt} style={{height: '200px'}} />
            </Panel>
          </Col>
        </Row>
      </BgBox>
    </div>
  );
};

export default Bigscreen;
