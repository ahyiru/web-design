// import {notAdmin} from '@app/utils/isAdmin';

const routes = {
  path: '/payer',
  name: '会员管理',
  icon: 'AccountBookOutlined',
  // denied: notAdmin,
  children: [
    {
      path: '/count',
      name: '包次会员',
      icon: 'FundViewOutlined',
      children: [
        {
          path: '/member',
          name: '开通会员',
          icon: 'ShoppingOutlined',
          component: () => import('./src/count/member'),
        },
        {
          path: '/order',
          name: '订单列表',
          icon: 'AuditOutlined',
          component: () => import('./src/count/order'),
        },
        {
          path: '/pay',
          name: '支付',
          icon: 'DollarOutlined',
          hideMenu: true,
          component: () => import('./src/count/pay'),
        },
      ],
    },
    {
      path: '/month',
      name: '包月会员',
      icon: 'CoffeeOutlined',
      children: [
        {
          path: '/member',
          name: '开通会员',
          icon: 'ShoppingOutlined',
          component: () => import('./src/month/member'),
        },
        {
          path: '/order',
          name: '订单列表',
          icon: 'AuditOutlined',
          component: () => import('./src/month/order'),
        },
        {
          path: '/pay',
          name: '支付',
          icon: 'DollarOutlined',
          hideMenu: true,
          component: () => import('./src/month/pay'),
        },
      ],
    },
  ],
};

export default routes;
