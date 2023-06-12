import {useState} from 'react';
import {Button, Modal} from 'antd';
import {Row, Col} from '@huxy/components';
import {message} from '@app/utils/staticFunction';
import {orderList} from '@app/utils/configs';

import {userInfoStore} from '@app/store/stores';

import apiList from '@app/utils/getApis';

import './member.less';

const Index = props => {
  const profile = userInfoStore.getState() || {};

  const handleOrder = async ({type, label}) => {
    const {payCount} = profile ?? {};
    const tips = payCount ? `您还剩余 ${payCount} 次聊天机会，开通新会员后会将剩余次数累加至新会员。` : '';
    Modal.confirm({
      title: `订单确认`,
      // icon: <ExclamationCircleOutlined />,
      content: `${tips}确定开通 ${label}会员 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg, info} = await apiList.addPayerFn({type});
        if (code === 200) {
          message.success(msg);
          props.router.push({
            path: `/payer/count/pay`,
            state: {info},
          });
        }
      },
    });
  };

  return (
    <div>
      <Row gutter={20}>
        {
          orderList.map(({type, label, price, period, count, description}) => {
            return <Col span={4} xs={12} key={type}>
              <div className="count-card">
                <h4 className="order-title">{label}</h4>
                <p className="order-info">有效期 {period} 个月</p>
                <p className="order-info">对话次数 {count} 次</p>
                {
                  description.split('\n\n').map((des, i) => <p key={`des-${i}`} className="order-desc">{des}</p>)
                }
                <p className="order-cost">
                  <span>消费：</span>
                  <span className="cost-num">¥ {price}</span>
                </p>
                <Button type="primary" style={{width: '120px', paddingBottom: '15px'}} onClick={e => handleOrder({type, label})}>开通</Button>
              </div>
            </Col>;
          })
        }
      </Row>
    </div>
  );
};

export default Index;
