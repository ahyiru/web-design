import {Button} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import wechat from './wechat.png';
import ali from './ali.png';

import './pay.less';

const Index = props => {
  const info = props.history.getState()?.info;
  if (!info) {
    props.router.push('/payer/count/order');
    return;
  }
  const {label, period, price, count, orderNo} = info ?? {};

  return (
    <div className="count-page">
      <div style={{padding: '10px 0'}}>
        <Button type="primary" ghost icon={<RollbackOutlined />} onClick={e => props.router.push('/payer/count/order')}>我的订单</Button>
      </div>
      <div className="pay-title">
        <p>当前订单信息：开通 <b>{label}，对话次数 {count} 次，有效期 <i>{period} 个月</i></b>，费用 <b>{price}元</b>，订单号：<b>{orderNo}</b></p>
        <h4 className="pay-tips">支付时请备注<b>订单号（如：{orderNo ?? 'huy-0'}）</b>。审核通过后立即生效。</h4>
      </div>
      <div className="pay-wrap">
        <div className="pay-item" style={{marginRight: '32px'}}>
          <h4>微信</h4>
          <img width="100%" src={wechat} alt="wechat" />
          <p>感谢赞助</p>
        </div>
        <div className="pay-item">
          <h4>支付宝</h4>
          <img width="100%" src={ali} alt="ali" />
          <p>感谢赞助</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
