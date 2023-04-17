import {RateScore} from '@huxy/materials';
import {Row as DefRow, Col} from '@app/components/row';
import ReactChart from '../components/reactChart';

import CarModel from '../webgl/src/car';

import {evaluation} from './data/configs';

import overview from './data/overview';
import power from './data/power';
import accelerate from './data/accelerate';
import brake from './data/brake';
import noise from './data/noise';
import battery from './data/battery';
import sales from './data/sales';

import './index.less';

const Row = props => <DefRow gutter={[12, 0]} {...props} />;

const ItemHeader = ({index}) => {
  const {name, score} = evaluation[index];
  return (
    <div className="model-item-header">
      <h3>{name}</h3>
      {score ? (
        <div className="model-rate-score">
          <RateScore score={score} style={{fontSize: '1.8rem'}}>
            ★★★★★
          </RateScore>
        </div>
      ) : null}
    </div>
  );
};

const CarDashboard = props => {
  return (
    <div className="car-model-dashboard">
      <h2 className="car-model-header">车辆状态监测系统</h2>
      <div className="car-model-container">
        <div className="car-model-top">
          <Row>
            <Col span={3}>
              <Row>
                <Col>
                  <div className="car-model-item">
                    <ItemHeader index={0} />
                    <div className="car-model-item-content">
                      <ReactChart option={overview()} style={{height: '100%'}} />
                      <div className="item-content-affix">
                        <p>总分</p>
                        <p>
                          <span>74.5</span> / 100
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="car-model-item">
                    <ItemHeader index={1} />
                    <div className="car-model-item-content">
                      <ReactChart option={power()} style={{height: '100%'}} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div className="car-model-center">
                <CarModel />
              </div>
            </Col>
            <Col span={3}>
              <Row>
                <Col>
                  <div className="car-model-item">
                    <ItemHeader index={2} />
                    <div className="car-model-item-content">
                      <ReactChart option={battery()} style={{height: '100%'}} />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="car-model-item">
                    <ItemHeader index={3} />
                    <div className="car-model-item-content">
                      <ReactChart option={brake()} style={{height: '100%'}} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="car-model-bottom">
          <Row>
            <Col span={3}>
              <div className="car-model-item">
                <ItemHeader index={4} />
                <div className="car-model-item-content">
                  <ReactChart option={noise()} style={{height: '100%'}} />
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="car-model-item">
                <div className="model-item-header">
                  <h3>销售量</h3>
                </div>
                <div className="car-model-item-content">
                  <ReactChart option={sales()} style={{height: '100%'}} />
                </div>
              </div>
            </Col>
            <Col span={3}>
              <div className="car-model-item">
                <ItemHeader index={5} />
                <div className="car-model-item-content">
                  <ReactChart option={accelerate()} style={{height: '100%'}} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CarDashboard;
