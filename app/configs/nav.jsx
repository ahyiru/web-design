import {message} from 'antd';
import html2canvas from 'html2canvas';
import {dlfile} from '@huxy/utils';

import Settings from '@app/components/settings';
// import getThemeList from './theme';
import getLang from '@app/utils/getLang';
import {logout} from '@app/utils/utils';

import defUser from '@app/assets/images/user/2.png';
import wx from '@app/assets/images/wx.jpg/';

import zh_icon from '@app/assets/icons/zh.png';
import en_icon from '@app/assets/icons/en.png';
import jp_icon from '@app/assets/icons/jp.png';

import FullPage from '@app/components/fullScreen';
import CustomCollapse from '@app/components/customCollapse';
import Notify from '@app/components/notify';
import Search from '@app/components/search';

const langIcons = {zh_icon, en_icon, jp_icon};

export const leftNav = ({store, useStore}) => {
  const i18ns = store.getState('i18ns');
  const {left} = i18ns?.nav ?? {};
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
          key: 'zbxtable',
          name: 'zbxtable',
          icon: 'ApiOutlined',
          type: 'link',
          link: 'https://zbx.cactifans.com/',
        },
        {
          key: 'PhoenixUI',
          name: 'PhoenixUI',
          icon: 'ApiOutlined',
          type: 'link',
          link: 'http://ihuxy.com:8088/',
        },
        {
          key: 'API文档',
          name: left?.apis ?? 'API文档',
          icon: 'ApiOutlined',
          type: 'link',
          link: 'http://ihuxy.com:8010',
        },
      ],
    },
    {
      key: 'wechat',
      icon: 'WechatOutlined',
      arrowDir: 'lt',
      ChildRender: (item) => (
        <div className="follow-me">
          <img src={wx} alt="wechat" />
          <p>{left?.followMe ?? 'followMe'}：yiru_js</p>
        </div>
      ),
    },
    {
      key: 'configs',
      icon: 'ToolOutlined',
      type: 'configs',
      Custom: () => <Settings store={store} useStore={useStore} />,
    },
  ];
};
export const rightNav = ({store, useStore}) => {
  const language = getLang();
  const i18ns = store.getState('i18ns');
  const user = store.getState('profile');
  // const themeKey=store.getState('huxy-theme')?.key;
  const {right} = i18ns?.nav ?? {};
  return [
    {
      key: 'username',
      name: user?.name ?? right?.user,
      img: user?.avatar ?? defUser,
      children: [
        {
          key: 'profile',
          name: right?.profile ?? '个人中心',
          type: 'profile',
          icon: 'UserOutlined',
          path: '/profile',
        },
        {
          key: 'settings',
          name: right?.settings ?? '设置',
          type: 'setting',
          icon: 'SettingOutlined',
          path: '/profile',
        },
        {
          divider: true,
          key: 'logout',
          name: right?.logout ?? '退出',
          type: 'logout',
          icon: 'PoweroffOutlined',
          handle: (item) => {
            logout();
          },
        },
      ],
    },
    {
      key: 'language',
      name: right?.[language] ?? '语言',
      Custom: () => (
        <a>
          <div className="icon">
            <img src={`${langIcons[language + '_icon']}`} alt={language} />
          </div>
        </a>
      ),
      children: [
        {
          key: 'zh',
          name: right?.zh ?? '汉语',
          type: 'language',
          active: language === 'zh',
          icon: (
            <div key="zh" className="img">
              <img src={`${langIcons['zh_icon']}`} alt="zh" />
            </div>
          ),
        },
        {
          key: 'en',
          name: right?.en ?? '英语',
          type: 'language',
          active: language === 'en',
          icon: (
            <div key="en" className="img">
              <img src={`${langIcons['en_icon']}`} alt="en" />
            </div>
          ),
        },
        {
          key: 'jp',
          name: right?.jp ?? '日语',
          type: 'language',
          active: language === 'jp',
          icon: (
            <div key="jp" className="img">
              <img src={`${langIcons['jp_icon']}`} alt="jp" />
            </div>
          ),
        },
      ],
    },
    /* {
      key:'themeList',
      title:right?.themeList??'主题设置',
      icon:'SettingOutlined',
      type:'themeList',
      // arrowDir:'lt',
      children:getThemeList(theme).map(v=>{
        v.key===themeKey&&(v.active=true);
        return v;
      }),
    }, */
    {
      key: 'github',
      title: right?.github ?? 'Github',
      icon: 'GithubOutlined',
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
      Custom: () => <FullPage />,
    },
    {
      title: right?.screenshot ?? '截屏',
      key: 'screencapture',
      icon: 'CameraOutlined',
      handle: (item) => {
        // const ele=document. getElementsByClassName('page-content')[0];
        html2canvas(document.getElementById('app'), {
          useCORS: true,
          foreignObjectRendering: true,
          allowTaint: true,
          logging: false,
        })
          .then((canvas) => {
            dlfile(canvas.toDataURL());
            message.success(right?.screencapture_msg ?? '下载成功！');
          })
          .catch((error) => {
            message.error(error);
          });
      },
    },
    // {
    //   name:right['clean_cookie'],
    //   icon:<RestOutlined />,
    //   type:'button',
    //   handle:item=>{
    //     storage.clear();
    //     location.href='/';
    //   },
    // },
    {
      key: 'search',
      title: right?.search ?? '搜索',
      Custom: () => <Search />,
    },
  ];
};
