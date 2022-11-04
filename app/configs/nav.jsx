import {message} from 'antd';
import html2canvas from 'html2canvas';
import {dlfile, formatTime} from '@huxy/utils';

import {langStore, userInfoStore} from '@app/store/stores';
import {getIntls} from '@app/components/intl';

import Settings from '@app/components/settings';
import FullPage from '@app/components/fullScreen';
import CustomCollapse from '@app/components/customCollapse';
import Notify from '@app/components/notify';
import Search from '@app/components/search';
import Icon from '@app/components/icon';

import getLang from '@app/utils/getLang';
import {logout} from '@app/utils/utils';
import getWeb3 from '@app/web3/getWeb3';

import GithubIcon from '@app/components/githubIcon';

import defUser from '@app/assets/images/user/2.png';
import wx from '@app/assets/images/wx.jpg';
import metamask from '@app/assets/images/metamask.svg';
import langList from './langList';

import {buildTime} from '.';

const {version} = require('../../package.json');

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
        message.info(`version：${version}，构建时间：${formatTime(buildTime)}`);
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
      Custom: () => <CustomCollapse />,
    },
    {
      key: 'projectList',
      name: left?.projectList ?? 'projectList',
      type: 'projectList',
      arrowDir: 'lt',
      Ricon: true,
      children: [
        {
          key: 'scenedesign',
          name: 'scenes',
          icon: <Icon icon="ApiOutlined" />,
          type: 'link',
          link: 'http://ihuxy.com:7000',
        },
        {
          key: 'filesystem',
          name: 'filesystem',
          icon: <Icon icon="ApiOutlined" />,
          type: 'link',
          link: 'http://ihuxy.com:8020',
        },
        {
          key: 'PhoenixUI',
          name: 'PhoenixUI',
          icon: <Icon icon="ApiOutlined" />,
          type: 'link',
          link: 'http://ihuxy.com:8088/',
        },
        {
          key: 'API文档',
          name: left?.apis ?? 'API文档',
          icon: <Icon icon="ApiOutlined" />,
          type: 'link',
          link: 'http://ihuxy.com:8010',
        },
      ],
    },
    {
      key: 'wechat',
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
      Custom: () => <Settings />,
    },
  ];
};
export const rightNav = () => {
  const language = getLang();
  const user = userInfoStore.getState();
  const right = getIntls('nav.right', {});
  return [
    {
      key: 'username',
      name: user?.name || right?.user,
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
      Custom: () => (
        <a>
          <div className="icon">
            <img src={langList.find(({key}) => key === language)?.icon} alt={language} />
          </div>
        </a>
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
      title: right?.metamask ?? 'MetaMask',
      Custom: () => {
        const hanlder = async () => {
          try {
            const result = await getWeb3();
            const addr = result.accounts?.[0];
            if (addr) {
              message.success(`已连接${addr}`);
            }
          } catch (error) {
            message.error('未检测到MetaMask插件！');
          }
        };
        return (
          <a onClick={e => hanlder()}>
            <div className="icon">
              <img src={metamask} alt="metamask" />
            </div>
          </a>
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
      Custom: () => <Notify />,
    },
    {
      key: 'fullscreen',
      Custom: () => (
        <a>
          <FullPage />
        </a>
      ),
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
    {
      key: 'search',
      title: right?.search ?? '搜索',
      Custom: () => <Search />,
    },
  ];
};
