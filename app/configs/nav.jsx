import {message} from 'antd';
import getThemeList from './theme';
import getLang from '@app/utils/getLang';
import {logout} from '@app/utils/utils';

import defUser from '@app/assets/images/user/2.png';
import wx from '@app/assets/images/wx.jpg/';

import html2canvas from 'html2canvas';

import {components,utils} from '@common';
const {Anico}=components;
const {dlfile}=utils;

export const leftNav=({store})=>{
  const i18ns=store.getState('i18ns');
  const {nav:{left}}=i18ns;
  return [
    {
      name:left['collapse'],
      type:'collapse',
      Custom:({collapsed})=><Anico type={(collapsed?.value??collapsed)?'right':''} />,
    },
    {
      name:left['projectList'],
      type:'projectList',
      arrowDir:'lt',
      Ricon:true,
      children:[
        {
          name:'zbxtable',
          icon:'ApiOutlined',
          type:'link',
          link:'https://zbx.cactifans.com/',
        },
        {
          name:'PhoenixUI',
          icon:'ApiOutlined',
          type:'link',
          link:'http://ihuxy.com:8088/',
        },
        {
          name:'API文档',
          icon:'ApiOutlined',
          type:'link',
          link:'http://ihuxy.com:8010',
        },
      ],
    },
    {
      icon:'WechatOutlined',
      arrowDir:'lt',
      ChildRender:status=><div className="follow-me"><img src={wx} /><p>{left['followMe']}：yiru_js</p></div>,
    },
  ];
};
export const rightNav=({store})=>{
  const language=getLang();
  const i18ns=store.getState('i18ns');
  const user=store.getState('profile');
  const themeKey=store.getState('huxy-theme')?.key;
  const {nav:{right},theme}=i18ns;
  return [
    {
      name:user?.name??right['user'],
      img:user?.avatar??defUser,
      children:[
        {
          name:right['profile'],
          type:'profile',
          icon:'UserOutlined',
          path:'/profile',
        },
        {
          name:right['logout'],
          type:'logout',
          icon:'PoweroffOutlined',
          handle:item=>{
            logout();
          },
        },
      ],
    },
    {
      name:right[language],
      Custom:()=><div className="icon"><img src={`${right[language+'_icon']}`} /></div>,
      // type:'language',
      children:[
        {
          key:'zh',
          name:right['zh'],
          type:'language',
          active:language==='zh',
          icon:<div key="zh" className="img"><img src={`${right['zh_icon']}`} /></div>,
        },
        {
          key:'en',
          name:right['en'],
          type:'language',
          active:language==='en',
          icon:<div key="en" className="img"><img src={`${right['en_icon']}`} /></div>,
        },
        {
          key:'jp',
          name:right['jp'],
          type:'language',
          active:language==='jp',
          icon:<div key="jp" className="img"><img src={`${right['jp_icon']}`} /></div>,
        },
      ],
    },
    {
      icon:'SettingOutlined',
      type:'themeList',
      // arrowDir:'lt',
      children:getThemeList(theme).map(v=>{
        v.key===themeKey&&(v.active=true);
        return v;
      }),
    },
    {
      icon:'GithubOutlined',
      type:'link',
      link:'https://github.com/ahyiru/web-design',
    },
    // {
    //   key:'fullscreen',
    //   Custom:()=><FullPage />,
    // },
    {
      key:'screencapture',
      icon:'CameraOutlined',
      handle:item=>{
        html2canvas(document.body).then(canvas=>{
          dlfile(canvas.toDataURL());
          message.success(right['screencapture_msg']);
        }).catch(error=>{
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
  ];
};

