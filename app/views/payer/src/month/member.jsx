import {useState} from 'react';
import {Select, Button, Modal} from 'antd';
import {Row, Col} from '@huxy/components';
import {message} from '@huxy/utils';
import {roleList, periodList} from '@app/utils/configs';

import {userInfoStore} from '@app/store/stores';

import apiList from '@app/apis/apiList';

import './member.less';

const orderList = roleList.slice(1, 4);

const getLeftPrice = ({role, deadline}) => {
  const orderPrice = roleList.find(item => item.value === role)?.price ?? 0;

  const leftDate = deadline ? Math.floor((deadline - new Date()) / 86400000) : 0;

  const leftPrice = (orderPrice / 30) * leftDate;

  return leftPrice.toFixed(2);
};

const getMemberInfo = ({role, deadline}) => {
  const roleLabel = roleList.find(item => item.value === role)?.label ?? '普通用户';
  const leftDate = deadline ? Math.floor((deadline - new Date()) / 86400000) : 0;
  return {roleLabel, leftDate};
};

const Index = props => {
  const profile = userInfoStore.getState() || {};
  // const {role} = profile;
  // const leftPrice = getLeftPrice(profile);
  const {roleLabel, leftDate} = getMemberInfo(profile);
  const orderRoleList = roleList.slice(0); // role
  const [list, setList] = useState(orderList);
  // const [orderRole, setOrderRole] = useState(role);
  // const orderPrice = roleList.find(item => item.value === orderRole)?.price ?? 0;

  const handleChange = (role, value) => {
    const currentItem = list.find(item => item.value === role);
    currentItem.period = value;
    setList([...list]);
  };

  const handleOrder = async ({label, orderRole, period}) => {
    const tips = leftDate ? `${roleLabel} 还剩余 ${leftDate} 天，开通新会员后会将剩余金额累加至新会员。` : '';
    Modal.confirm({
      title: `订单确认`,
      // icon: <ExclamationCircleOutlined />,
      content: `${tips}确定开通 ${label} 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const {code, message: msg, info} = await apiList.addOrderFn({orderRole, period});
        if (code === 200) {
          message.success(msg);
          props.router.push({
            path: `/payer/month/pay`,
            state: {info},
          });
        }
      },
    });
  };

  return (
    <div>
      <h4 className="member-info">
        当前会员等级：<i>{roleLabel}</i>，会员还剩 <i>{leftDate}</i> 天
      </h4>
      <Row gutter={20}>
        {list.map(({value, label, price, period, description}) => {
          return (
            <Col span={4} xs={12} key={label}>
              <div className="month-card">
                <h4 className="order-title">{label}</h4>
                <div className="order-price">
                  <span className="price-num">{price}</span>
                  <span> /月</span>
                </div>
                {description.split('\n\n').map((des, i) => (
                  <p key={`des-${i}`} className="order-desc">
                    {des}
                  </p>
                ))}
                <div className="order-role">
                  <span>等级：</span>
                  <Select
                    value={value}
                    // onChange={val => setOrderRole(val)}
                    options={orderRoleList}
                    style={{width: '120px'}}
                    disabled={true}
                  />
                </div>
                <div className="order-period">
                  <span>时间：</span>
                  <Select value={period} onChange={val => handleChange(value, val)} options={periodList} style={{width: '120px'}} />
                </div>
                <p className="order-cost">
                  <span>消费：</span>
                  {/* <span className="cost-num">¥ {(period * price - leftPrice).toFixed(2)}</span> */}
                  <span className="cost-num">¥ {period * price}</span>
                </p>
                <Button type="primary" style={{width: '120px', paddingBottom: '15px'}} onClick={e => handleOrder({label, orderRole: value, period})}>
                  下单
                </Button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Index;
