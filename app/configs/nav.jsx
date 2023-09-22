import {formatTime, message, storage} from '@huxy/utils';

import {langStore, userInfoStore} from '@app/store/stores';
import {getIntls} from '@app/components/intl';

import Settings from '@app/components/settings';
import CustomCollapse from '@app/components/customCollapse';
import Notify from '@app/components/notify';
import Search from '@app/components/search';
import ThemeModel from '@app/components/themeModel';
import Icon from '@app/components/icon';

import {logout} from '@app/utils/utils';

import defUser from '@app/assets/images/user/2.png';
import wx from '@app/assets/images/wx.jpg';
import langList from './langList';
import ProjectList from './project';
import AppTools from './appTools';

import {buildTime} from '.';

import pkg from '../../package.json';

const changeLang = ({key}) => langStore.setState(key);

const buildInfo = buildTime
  ? [
    {
      divider: true,
      key: 'version',
      type: 'version',
      name: 'version',
      icon: <Icon icon="EyeOutlined" />,
      handle: item => {
        message.info(`version：${pkg.version}，构建时间：${formatTime(buildTime)}`);
      },
    },
  ]
  : [];

export const leftNav = () => {
  const left = getIntls('nav.left', {});
  return [
    {
      key: 'collapse',
      name: left?.collapse ?? 'collapse',
      type: 'collapse',
      smShow: true,
      Custom: props => <CustomCollapse {...props} />,
    },
    {
      key: 'projectList',
      name: left?.projectList ?? 'projectList',
      type: 'projectList',
      arrowDir: 'lt',
      Ricon: true,
      smShow: true,
      ChildRender: props => <ProjectList {...props} i18ns={left ?? {}} />,
    },
    {
      key: 'wechat',
      title: 'wechat',
      icon: <Icon icon="WechatOutlined" />,
      arrowDir: 'lt',
      ChildRender: item => (
        <div className="follow-me">
          <img src={wx} alt="wechat" />
          <p>前端道萌</p>
          {/* <p>{left?.followMe ?? 'followMe'}：yiru_js</p> */}
        </div>
      ),
    },
    {
      key: 'chatbot',
      icon: <Icon icon="RobotOutlined" />,
      type: 'link',
      link: `https://ihuxy.com/chatbot?authed_token=${storage.get('token')}`,
      title: left?.chatbot ?? 'AI助手',
      smShow: true,
    },
  ];
};
export const rightNav = language => {
  const user = userInfoStore.getState();
  const right = getIntls('nav.right', {});
  return [
    {
      key: 'configs',
      icon: <Icon icon="ToolOutlined" />,
      type: 'configs',
      smShow: true,
      Custom: props => <Settings {...props} />,
    },
    {
      key: 'username',
      name: user?.name || right?.user,
      smShow: true,
      img: user?.avatar || defUser,
      children: user?.name ? [
        {
          key: 'profile',
          name: right?.profile ?? '个人中心',
          type: 'profile',
          icon: <Icon icon="UserOutlined" />,
          path: '/profile',
        },
        {
          key: 'order',
          name: right?.orders ?? '我的订单',
          type: 'order',
          icon: <Icon icon="ShoppingCartOutlined" />,
          path: '/payer/count/order',
        },
        {
          key: 'settings',
          name: right?.settings ?? '设置',
          type: 'setting',
          icon: <Icon icon="SettingOutlined" />,
          path: '/profile',
        },
        {
          // divider: true,
          key: 'logout',
          name: right?.logout ?? '退出',
          type: 'logout',
          icon: <Icon icon="PoweroffOutlined" />,
          handle: item => {
            logout();
          },
        },
        ...buildInfo,
      ] : [
        {
          key: 'signin',
          name: right?.signin ?? '登录',
          type: 'signin',
          icon: <Icon icon="LoginOutlined" />,
          handle: item => {
            logout(true);
          },
        },
        ...buildInfo,
      ],
    },
    {
      key: 'notify',
      title: right?.notify ?? '消息',
      Custom: props => <Notify {...props} />,
    },
    {
      key: 'themeModel',
      smShow: true,
      Custom: props => <ThemeModel {...props} />,
    },
    {
      key: 'language',
      name: right?.[language] ?? '语言',
      Custom: props => (
        <span className="link" title={right?.[language] ?? '语言'}>
          <div className="icon">
            <img width="1" height="1" src={langList.find(({key}) => key === language)?.icon} alt={language} />
          </div>
        </span>
      ),
      children: langList.map(({key, name, icon}) => ({
        key,
        name: right?.[key] ?? name,
        type: 'language',
        icon: <img src={icon} alt={key} />,
        handle: changeLang,
      })),
    },
    {
      key: 'apps',
      title: 'apps',
      icon: <Icon icon="AppstoreAddOutlined" />,
      arrowDir: 'rt',
      ChildRender: props => <AppTools />,
    },
    {
      key: 'search',
      title: right?.search ?? '搜索',
      Custom: props => <Search {...props} />,
    },
  ];
};
