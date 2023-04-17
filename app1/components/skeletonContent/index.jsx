import {Row, Col} from '@huxy/components';

import './index.less';

const barList = [
  {
    color: 'rgba(0,0,0,.2)',
    height: '60%',
  },
  {
    color: 'rgba(0,0,0,.15)',
    height: '70%',
  },
  {
    color: 'rgba(0,0,0,.25)',
    height: '40%',
  },
  {
    color: 'rgba(0,0,0,.3)',
    height: '80%',
  },
  {
    color: 'rgba(0,0,0,.35)',
    height: '60%',
  },
  {
    color: 'rgba(0,0,0,.30)',
    height: '90%',
  },
  {
    color: 'rgba(0,0,0,.2)',
    height: '50%',
  },
  {
    color: 'rgba(0,0,0,.3)',
    height: '15%',
  },
  {
    color: 'rgba(0,0,0,.1)',
    height: '65%',
  },
  {
    color: 'rgba(0,0,0,.15)',
    height: '45%',
  },
];

const Index = props => {
  return (
    <div className="skeleton-content">
      {/* <Setting {...props} /> */}
      <Row gutter={8}>
        {[...new Array(4)].map((v, k) => (
          <Col span={3} key={k}>
            <div className="skeleton-card">
              <div className="left">
                <div className="img" />
              </div>
              <div className="right">
                <h4 />
                <p />
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <div className="sk-container">
            <div className="sk-table">
              <table>
                <thead>
                  <tr>
                    {[...new Array(6)].map((v, k) => (
                      <th key={`th-${k}`}>
                        <span />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...new Array(5)].map((v, k) => (
                    <tr key={k}>
                      {[...new Array(6)].map((sv, sk) => (
                        <td key={`${k}-${sk}`}>
                          <span />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className="chart-container">
            <div className="sk-piechart" />
          </div>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <div className="chart-container">
            <div className="sk-barchart">
              {barList.map((item, i) => {
                const space = 25;
                const itemWidth = 30;
                const style = {
                  '--space': `${space}px`,
                  '--itemWidth': `${itemWidth}px`,
                  '--bgColor': item.color,
                  '--itemHeight': item.height,
                  left: `${i * (space + itemWidth)}px`,
                };
                return <div key={i} className="item" style={style} />;
              })}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="sk-list">
            {[...new Array(7)].map((v, k) => (
              <div key={k} className="item" />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
