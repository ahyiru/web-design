import html2canvas from 'html2canvas';
import {dlfile, formatTime} from '@huxy/utils';

import {notAdmin} from '@app/utils/isAdmin';

import {langStore, userInfoStore} from '@app/store/stores';
import {getIntls} from '@app/components/intl';

import Settings from '@app/components/settings';
import FullPage from '@app/components/fullScreen';
import CustomCollapse from '@app/components/customCollapse';
import Notify from '@app/components/notify';
import Search from '@app/components/search';
import ThemeModel from '@app/components/themeModel';
import Icon from '@app/components/icon';

import {message} from '@app/utils/staticFunction';
import {logout} from '@app/utils/utils';
import getWeb3 from '@app/web3/getWeb3';

import GithubIcon from '@app/components/icons/github';

import defUser from '@app/assets/images/user/2.png';
import wx from '@app/assets/images/wx.jpg';
import metamask from '@app/assets/images/metamask.svg';
import langList from './langList';
import ProjectList from './project';

import {buildTime} from '.';

import pkg from '../../package.json';

const changeLang = ({key}) => langStore.setState(key);

const buildInfo = buildTime
  ? [
    {
      // divider: true,
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
  const isAdmin = !notAdmin();
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
      ChildRender: props => <ProjectList {...props} isAdmin={isAdmin} />,
    },
    {
      key: 'wechat',
      title: 'wechat',
      icon: <Icon icon="WechatOutlined" />,
      arrowDir: 'lt',
      ChildRender: item => (
        <div className="follow-me">
          <img src={wx} alt="wechat" />
          <p>{left?.followMe ?? 'followMe'}：yiru_js</p>
        </div>
      ),
    },
    {
      key: 'configs',
      icon: <Icon icon="ToolOutlined" />,
      type: 'configs',
      smShow: true,
      Custom: props => <Settings {...props} />,
    },
    {
      key: 'search',
      title: left?.search ?? '搜索',
      Custom: props => <Search {...props} />,
    },
  ];
};
export const rightNav = language => {
  const user = userInfoStore.getState();
  const right = getIntls('nav.right', {});
  return [
    {
      key: 'username',
      name: user?.name || right?.user,
      smShow: true,
      img: user?.avatar || defUser,
      children: [
        {
          key: 'profile',
          name: right?.profile ?? '个人中心',
          type: 'profile',
          icon: <Icon icon="UserOutlined" />,
          path: '/profile',
        },
        {
          key: 'order',
          name: '我的订单',
          type: 'order',
          icon: <Icon icon="ShoppingCartOutlined" />,
          path: '/order',
        },
        {
          key: 'settings',
          name: right?.settings ?? '设置',
          type: 'setting',
          icon: <Icon icon="SettingOutlined" />,
          path: '/profile',
        },
        {
          divider: true,
          key: 'logout',
          name: right?.logout ?? '退出',
          type: 'logout',
          icon: <Icon icon="PoweroffOutlined" />,
          handle: item => {
            logout();
          },
        },
        ...buildInfo,
      ],
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
        icon: (
          <div key={key} className="img">
            <img src={icon} alt={key} />
          </div>
        ),
        handle: changeLang,
      })),
    },
    {
      key: 'MetaMask',
      Custom: props => {
        const hanlder = async () => {
          try {
            const result = await getWeb3();
            const addr = result.accounts?.[0];
            if (addr) {
              message.success(`已连接${addr}`);
            }
          } catch (error) {
            message.error(error.code ? error.message : '未检测到MetaMask插件！');
          }
        };
        return (
          <span className="link" onClick={e => hanlder()} title={right?.metamask ?? 'MetaMask'}>
            <div className="icon">
              <img src={metamask} alt="metamask" />
            </div>
          </span>
        );
      },
    },
    {
      key: 'github',
      title: right?.github ?? 'Github',
      icon: <GithubIcon />,
      type: 'link',
      link: 'https://github.com/ahyiru/web-design',
    },
    {
      key: 'notify',
      title: right?.notify ?? '消息',
      Custom: props => <Notify {...props} />,
    },
    {
      key: 'fullscreen',
      Custom: props => (
        <span className="link" title="fullscreen">
          <span className="node-icon">
            <FullPage />
          </span>
        </span>
      ),
    },
    {
      key: 'themeModel',
      smShow: true,
      Custom: props => <ThemeModel {...props} />,
    },
    {
      title: right?.screenshot ?? '截屏',
      key: 'screencapture',
      icon: <Icon icon="CameraOutlined" />,
      handle: item => {
        // const ele=document. getElementsByClassName('page-content')[0];
        html2canvas(document.getElementById('app'), {
          useCORS: true,
          foreignObjectRendering: true,
          allowTaint: true,
          logging: false,
        })
          .then(canvas => {
            dlfile(canvas.toDataURL());
            message.success(right?.screencapture_msg ?? '下载成功！');
          })
          .catch(error => {
            message.error(error);
          });
      },
    },
  ];
};
